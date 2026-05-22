import express from "express"

import { listallSubscription, makeSubscription, getoneSubscription, cancelSubscription } from "../controllers/subscription";
const router = express.Router();

router.post("/subscribe", makeSubscription);
router.get("/list",listallSubscription);
router.get("/:id",getoneSubscription);
router.post("/:id/cancel", cancelSubscription);
router.post("/:id/resume",resumeSubscription);