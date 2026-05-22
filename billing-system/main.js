import express from "express";

const PORT = 5000;
const app = express();

app.use(express.json());

app.use("/api/customers", customerRouter);
app.user("/api/plans", planRouter)

app.listen(PORT,()=> console.log(`app is running at port ${PORT}`));