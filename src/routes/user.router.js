import { Router } from "express";
import userModel from "../models/user.js";
import { createHash, validPassword } from "../utils.js";
import { generateToken, authToken } from "../utils.js";


const router = Router()

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const newUser = new userModel({ first_name, last_name, email, age, password: createHash(password) })
        await newUser.save()

        const access_token = generateToken(newUser)
        res.cookie('jwt', access_token, { httpOnly: true }).status(201).redirect('/api/sessions/login');
    } catch (error) {
        res.status(500).send('Error al registrarse')
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    
    if (!user) return res.status(200).send({ error: "Usuario no registrado" });

    const isValidPassword = validPassword(user, password);
    
    if (!isValidPassword) return res.status(400).send({ error: "Email o Contraseña incorrecta" });

    // Genera el token JWT
    const access_token = generateToken(user);

    // Establece la cookie con el token
    res.cookie('jwt', access_token, {
        httpOnly: true,   // La cookie no es accesible desde JavaScript
        secure: false,    // Establece esto en true en producción para HTTPS
        maxAge: 24 * 60 * 60 * 1000, // La cookie expira en 1 día
    });
    res.status(200).redirect('/api/sessions/current');
});



export default router