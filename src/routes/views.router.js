import { Router } from "express";
import { passportCall, authorization } from "../utils.js";

const router = Router()

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/current', passportCall('jwt'), authorization('user'), async (req, res) => {
    if (!req.user || !req.user.first_name) {
        return res.status(400).send('Error: No se encontró el usuario.');
    }

    res.render('current', {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    });
});


export default router