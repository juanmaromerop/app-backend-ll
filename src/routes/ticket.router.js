import { Router } from "express";
import { completePurchase } from "../controllers/ticket.controllers.js";

const router = Router()

router.post("/ticket", completePurchase)

export default router