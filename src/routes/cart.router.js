import { Router } from "express";
import { addToCartController } from "../controllers/cart.controllers.js";

const router = Router()

router.post('/cart/add',  addToCartController); 

export default router