import { Router } from "express";
import { saveProductsControllers, updateProduct, deleteProduct } from "../controllers/products.controllers.js";
import { passportCall } from "../utils.js";
import { roleAuthorization } from "../utils.js";

const router = Router()

router.post('/products', passportCall('jwt'), roleAuthorization(['admin']), saveProductsControllers)

router.post('/products/update/:id', passportCall('jwt'), updateProduct);

router.post('/products/delete/:id',passportCall('jwt'), deleteProduct);

export default router

