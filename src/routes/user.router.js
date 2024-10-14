import { Router } from "express";
import { registerControllers, loginControllers, logout } from "../controllers/user.controllers.js";



const router = Router()

router.post('/register', registerControllers)
router.post('/login', loginControllers)

router.post('/api/sessions/logout', logout )

export default router