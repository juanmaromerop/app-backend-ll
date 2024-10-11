import express from 'express'
import cors from 'cors'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import userRouter from './routes/user.router.js'
import viewsRouter from './routes/views.router.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initiaizePassport from './config/passport.js'
import dotenv from 'dotenv'
import productsRouter from './routes/products.router.js'
import Handlebars from 'handlebars';
import cartRouter from './routes/cart.router.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });
app.use(express.static(__dirname + 'public'));

Handlebars.registerHelper('multiply', function(a, b) {
    return a * b;
});

// // Helper para calcular el total del carrito
// Handlebars.registerHelper('calculateTotal', function(products) {
//     return products.reduce((total, product) => total + (product.price * product.quantity), 0);
// });


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


app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})
