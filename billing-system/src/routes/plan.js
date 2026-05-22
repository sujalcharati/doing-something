import express from "express";
import { removePlan,updatePlan,getonePlan,listallPlans,createPlan } from "../controllers/plan";

const router = express.Router();


router.post("/create",createPlan);
router.get("/list", listallPlans);
router.get("/getOne",getonePlan);
router.patch("/updateplan",updatePlan);
router.delete("/removeplan",removePlan);