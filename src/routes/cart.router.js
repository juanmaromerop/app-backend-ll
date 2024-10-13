import { Router } from "express";
import { addToCartController, removeFromCartController, clearCartController } from "../controllers/cart.controllers.js";

const router = Router()

router.post('/cart/add',  addToCartController); 

router.delete('/cart/remove', removeFromCartController);

router.delete('/cart/clear', clearCartController);


export default router