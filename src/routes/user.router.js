import { Router } from "express";
import { registerControllers, loginControllers } from "../controllers/user.controllers.js";



const router = Router()

router.post('/register', registerControllers)
router.post('/login', loginControllers)

export default router