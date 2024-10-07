import { Router } from "express";
import { passportCall, authorization, roleAuthorization } from "../utils.js";
import { viewCurrent, viewLogin, viewRegister } from "../controllers/views.controllers.js";

const router = Router()

router.get('/register', viewRegister)

router.get('/login', viewLogin)

router.get('/current', passportCall('jwt'), roleAuthorization(['user', 'admin']), viewCurrent);

router.get('/products', async (req, res) =>{
res.render('products')
})

export default router