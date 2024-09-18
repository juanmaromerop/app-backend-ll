import express from 'express'
import handlebars from'express-handlebars'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import userRouter from './routes/user.router.js'
import viewsRouter from './routes/views.router.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initiaizePassport from './config/passport.js'



const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + 'public'));


app.use(cookieParser())
initiaizePassport()
app.use(passport.initialize())


const environment = async () => {
    await mongoose.connect("mongodb+srv://juanmaromeroperalta9:juanmaromerop@cluster0.sbp6rso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("Conectado a la base de datos");
        }).catch(() => {
            console.error("No se pudo conecta a la base de datos", error);
        })

}
environment()

app.use("/api/sessions", viewsRouter)
app.use("/", userRouter)

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})
