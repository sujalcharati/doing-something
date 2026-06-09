# Idempotency Keys — Why Your Payment API Needs Them

Have you ever clicked the "Pay Now" button and the page froze? Your first instinct — click it again. And again. Now imagine each click actually charged your card. That's exactly the problem **idempotency keys** solve.

---

## What is Idempotency?

In simple terms: **doing something once or doing it 10 times should give the same result.**

Think of it like a light switch. You flip it ON — the light turns on. You flip it ON again — nothing changes. It's already on. That's idempotent behavior.

In APIs, a **GET** request is naturally idempotent — fetching data doesn't change anything. But **POST** requests? They create things. A second POST to `/payments` could mean a second charge. That's a real problem.

---

## The Real-World Problem

Let's say a user is paying Rs. 500 on your app:

1. User clicks "Pay"
2. Request goes to the server
3. Network is slow — user sees no response
4. User clicks "Pay" again
5. **Both requests hit the server**
6. User gets charged Rs. 1000 instead of Rs. 500

This isn't a rare edge case. It happens due to:
- Network retries
- User impatience (double clicks)
- Mobile app background refresh
- Webhook retries from payment gateways

Companies like **Stripe, Razorpay, and PayPal** all handle this — and the solution is idempotency keys.

---

## The Solution: Idempotency Keys

The idea is simple:

1. The **client generates a unique key** for each intended action
2. This key is sent in the request header
3. The **server checks**: "Have I processed this key before?"
   - **Yes** → Return the cached response (no duplicate processing)
   - **No** → Process the request and store the result against this key

Let's build this from scratch.

---

## Let's Build It — Step by Step

### Setting Up the Server

```javascript
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
```

Nothing fancy — a basic Express server.

### In-Memory Storage

```javascript
const payments = {};
const idempotencyKeys = {};
```

We're using two objects:
- `payments` — stores all processed payments
- `idempotencyKeys` — maps each idempotency key to its request hash and response

> In production, you'd use Redis or a database. In-memory works fine for understanding the concept.

### Generating a Unique Payment ID

```javascript
const generateUniqueID = () => {
    const val = Math.floor(Math.random() * 1000000);
    return `pay_${val}`;
};
```

Each payment gets a unique ID like `pay_482910`. In production, you'd use UUIDs.

---

### The Payment Endpoint — Where the Magic Happens

```javascript
app.post("/payments", (req, res) => {
```

#### Step 1: Extract the Idempotency Key

```javascript
    const key = req.headers["idempotency-key"];

    if (!key) {
        return res.status(400).json({ error: "idempotency key is not found!" });
    }
```

The client **must** send an `idempotency-key` header. No key? Reject the request.

#### Step 2: Validate the Request Body

```javascript
    const { userId, amount } = req.body;

    if (typeof amount != "number" || amount <= 0 || !amount) {
        return res.status(400).json({ error: "amount is not found or invalid!" });
    }

    if (!userId) {
        return res.status(400).json({ error: "userId is not found!" });
    }
```

Basic validation — we need a valid `userId` and a positive `amount`.

#### Step 3: Check if the Key Already Exists (The Core Logic)

```javascript
    if (key in idempotencyKeys) {

        const currentHash = JSON.stringify({ userId, amount });

        if (idempotencyKeys[key].requestHash != currentHash) {
            return res.status(409).json({ error: "conflict in orders keys.." });
        }

        return res.status(200).json(idempotencyKeys[key].response);
    }
```

This is the heart of idempotency. Two things happen here:

**Case A — Same key, same data:** The user (or network) retried the exact same request. We return the **cached response**. No duplicate payment.

**Case B — Same key, different data:** Someone is reusing a key for a different request. That's a **conflict** — we return `409`. This prevents misuse of keys.

The trick is the **request hash** — we stringify `{ userId, amount }` and compare it. If the hash matches, it's a retry. If it doesn't, it's a conflict.

#### Step 4: Process the Payment (First Time Only)

```javascript
    const paymentId = generateUniqueID();

    const payment = {
        paymentId,
        userId,
        amount,
        status: "pending"
    };

    payments[paymentId] = payment;
    payment.status = "success";

    const resultdata = { amount, paymentId, status: payment.status };
```

#### Step 5: Cache the Response Against the Key

```javascript
    idempotencyKeys[key] = {
        requestHash: JSON.stringify({ userId, amount }),
        response: resultdata
    };

    return res.status(200).json(resultdata);
});
```

We store:
- `requestHash` — to verify future requests with the same key
- `response` — to return instantly on retries

---

### Bonus: Fetching a Payment

```javascript
app.get("/payments/:id", (req, res) => {
    const { id } = req.params;

    if (payments[id]) {
        return res.status(200).json(payments[id]);
    }

    return res.status(404).json({ message: "Payment id is not found!" });
});
```

A simple GET endpoint to verify a payment exists. Since GET is naturally idempotent, no special handling needed.

---

## Testing It Out

### First Request
```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -H "idempotency-key: abc-123" \
  -d '{"userId": "user1", "amount": 500}'
```
**Response:** `{ "amount": 500, "paymentId": "pay_482910", "status": "success" }`

### Retry (Same Key, Same Data)
```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -H "idempotency-key: abc-123" \
  -d '{"userId": "user1", "amount": 500}'
```
**Response:** Same as above. **No duplicate payment created.**

### Conflict (Same Key, Different Data)
```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -H "idempotency-key: abc-123" \
  -d '{"userId": "user1", "amount": 1000}'
```
**Response:** `409 — conflict in orders keys..`

---

## How the Big Companies Do It

| Company | Header | Behavior |
|---------|--------|----------|
| **Stripe** | `Idempotency-Key` | Caches response for 24 hours |
| **Razorpay** | Built into order creation | Order ID acts as idempotency key |
| **PayPal** | `PayPal-Request-Id` | Prevents duplicate captures |

The concept is the same everywhere — only the implementation details differ.

---

## Key Takeaways

1. **Always use idempotency keys for POST endpoints with side effects** — payments, orders, bookings
2. **Hash the request body** — to detect retries vs. conflicts
3. **Return cached responses** — don't reprocess, just replay
4. **Add expiry in production** — keys shouldn't live forever (Stripe uses 24 hours)
5. **Use a persistent store** — Redis or database, not in-memory

---

## What's Next?

This implementation is a great starting point. To make it production-ready, you'd want to:
- Use **Redis** for storing idempotency keys (with TTL/expiry)
- Use **UUIDs** instead of random numbers for payment IDs
- Add **database transactions** so payment creation is atomic
- Handle **race conditions** with distributed locks

---

*If you found this helpful, follow me for more backend engineering deep-dives. Drop a comment if you've dealt with duplicate payment bugs before — I'd love to hear your war stories.*
