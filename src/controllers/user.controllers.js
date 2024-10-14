import User from '../repositories/User.repository.js'
import { generateToken } from '../utils.js';
import { validPassword } from '../utils.js';
import jwt from 'jsonwebtoken'
const PRIVAE_KEY = "appSecret"

const userService = new User()

export const registerControllers = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;
        let newUser = await userService.register(first_name, last_name, email, age, password, role)
       
        if (!newUser) {
            return res.status(400).redirect('/api/sessions/register?error=invalidRole');
        }

        const access_token = generateToken(newUser)
        res.cookie('jwt', access_token, { httpOnly: true })
            .status(201)
            .redirect('/api/sessions/login')
    } catch (error) {
        res.status(500).send('Error al registrarse');
    }
}

export const loginControllers = async (req, res) => {
    const { email, password } = req.body
    let user = await userService.login(email)
    if (!user) return res.status(200).send({ error: "Usuario no registrado" });

    const isValidPassword = validPassword(user, password);
    if (!isValidPassword) return res.status(400).send({ error: "Email o Contraseña incorrecta" });

    const access_token = generateToken(user);
    res.cookie('jwt', access_token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).redirect('/api/sessions/current');

}


