import { Router } from "express";
import { passportCall, authorization, roleAuthorization } from "../utils.js";
import { viewCurrent, viewLogin, viewRegister, getCartController } from "../controllers/views.controllers.js";
const router = Router()

router.get('/register', viewRegister)

router.get('/login', viewLogin)

router.get('/current', passportCall('jwt'), roleAuthorization(['user', 'admin']), viewCurrent);

router.get('/products', async (req, res) =>{
res.render('products')
})

router.get('/cart', passportCall('jwt'), getCartController)

export default router