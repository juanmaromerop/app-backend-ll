import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport, { strategies } from 'passport'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

//Handlebars
const __filaname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filaname)

export default __dirname

//Hash de contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Validacion de contraseña
export const validPassword = (user, password) => bcrypt.compareSync(password, user.password)

const PRIVAE_KEY = "appSecret"

const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVAE_KEY, { expiresIn: "24h" })
    return token
}

//Middleware

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send({ error: "No autenticado" })
    const token = authHeader.split(" ")[1]

    jwt.verify(token, PRIVAE_KEY, (error, credential) => {
        if (error) return res.status(410).send({ error: "No estas autorizado" })
        req.user = credential.user
        next()
    })
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.status(401).send({
                    error: info.messages ? info.messages : info.toString()
                })
            }
            req.user = user
            next()
        })

            (req, res, next)
    }
}

export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: "Unauthorized" })
            if (!role.includes(req.user.role)) {
                return res.status(403).send({ error: "No permission" });
            }
        next()
    }
}

export const roleAuthorization = (roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).send({ error: "No autenticado" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: "Acceso denegado. No tienes permiso para realizar esta acción." });
        }
        
        next();
    };
};

export { generateToken, authToken }