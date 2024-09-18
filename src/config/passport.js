import passport from "passport";
import jwt from 'passport-jwt'
import userModel from "../models/user.js";

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor= (req) =>{
    let token = null
    console.log(req.cookies);
    if (req && req.cookies) {
        token = req.cookies['jwt']

    }
    return token
}

const initiaizePassport = () =>{
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'appSecret'
    }, async(jwt_payload, done) =>{
        try {
             // Aquí buscamos el usuario por el ID dentro del payload JWT
             const user = await userModel.findById(jwt_payload.user._id);
             if (!user) {
                 return done(null, false); // Si no encontramos el usuario, devolvemos false
             }
             return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) =>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) =>{
        let user = await userModel.findById(id)
        done(null, user)
    })

}

export default initiaizePassport