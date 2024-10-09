import { Router } from "express";
import { cartControllers } from "../controllers/cart.controllers.js";
const router = Router()

router.post('/api/sessions/cart/:productId', cartControllers )

export default router