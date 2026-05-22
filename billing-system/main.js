import express from "express";

const PORT = 5000;
const app = express();

app.use(express.json());

app.use("/api/customers", customerRouter);
app.use("/api/plans", planRouter);
app.use("/api/subscriptions", subscriptionRouter);

app.listen(PORT,()=> console.log(`app is running at port ${PORT}`));