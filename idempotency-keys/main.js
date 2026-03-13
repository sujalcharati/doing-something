import express from "express";

const app = express();

const port = 3000;


app.use(express.json());

const payments = {

};

const idempotencyKeys = {};

const generateUniqueID = ()=>{

    const val = Math.floor(Math.random()*1000000);

    return `pay_${val}`;
}


app.post("/payments", (req, res)=>{

    const key = req.headers["idempotency-key"];

    if(!key){
        return res.status(400).json({ error: " idempotency key is not found!"});
    }

    const { userId, amount} = req.body;

    if( typeof amount != "number" || amount <=0 || !amount){
        return res.status(400).json({ errror: " amount is not found or invalid !"});
    }

    if( !userId){
       return res.status(400).json({ 
            error:" userId is not found!"
        });
    }


    if( key in idempotencyKeys){

        const currenthash = JSON.stringify({ userId, amount});

         if( idempotencyKeys[key].requestHash != currenthash){

            return res.status(409).json({ error: " conflict in orders keys.."});
         }
        
        return res.status(200).json( idempotencyKeys[key].response);
    }


    const paymentId = generateUniqueID();

    const payment = {

        paymentId,
        userId,
        amount,
        status: "pending"
    }

    payments[paymentId] = payment;

    payment.status = "success";

    const resultdata = { amount, paymentId, status: payment.status};

    idempotencyKeys[key] = {
        requestHash : JSON.stringify({ userId, amount}),
        response : resultdata
    };

    return res.status(200).json(resultdata);

})


app.get("/payments/:id", (req, res)=>{

    const {id} = req.params;

    if( payments[id]){
        return res.status(200).json( payments[id]);
    }

    return res.status(404).json({ message: " Payment id is not found !"});



})

app.get("/health",( req, res)=>{

    res.status(200).json({
        message: " backend is up !"
})

})


app.listen(port, ()=>{
    console.log(` the server is up ${port}`);
})