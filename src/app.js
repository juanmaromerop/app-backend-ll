import express from 'express'
import cors from 'cors'
import exphbs from 'express-handlebars';
import __dirname from './utils.js'
import mongoose from 'mongoose'
import userRouter from './routes/user.router.js'
import viewsRouter from './routes/views.router.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initiaizePassport from './config/passport.js'
import dotenv from 'dotenv'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import ticketRouter from './routes/ticket.router.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const hbs = exphbs.create({
    helpers: {
      json: function (context) {
        return JSON.stringify(context); // Helper para convertir un objeto a JSON
      },
      eq: function (a, b) {
        return a === b; // Helper para comparar valores
      },
      multiply: function (a, b) {
        return a * b; // Helper para multiplicar dos valores
      },
    },
  });

app.engine('handlebars',  hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(cookieParser())
initiaizePassport()
app.use(passport.initialize())

app.use(cors())


const environment = async () => {
    await mongoose.connect(process.env.MONGO_URL || "mongodb+srv://juanmaromeroperalta9:juanmaromerop@cluster0.sbp6rso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("Conectado a la base de datos");
        }).catch(() => {
            console.error("No se pudo conecta a la base de datos", error);
        })

}
environment()

app.use("/api/sessions", viewsRouter)
app.use("/", userRouter)
app.use("/", productsRouter)
app.use("/", cartRouter)
app.use("/api/sessions", ticketRouter)


app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})
