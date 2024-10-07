import mongoose from "mongoose";

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    product: String,
    description: String,
    price: Number,
    stock: Number,
    category: String
})

const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel