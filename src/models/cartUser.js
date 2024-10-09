import mongoose from "mongoose";

const userCartCollection = 'userCart';

const userCartSchema = new mongoose.Schema({
    // userId: {  // Asegúrate de tener esta propiedad
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", // Asumiendo que tienes un modelo de usuario
    //     required: true,
    // },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",  // Asume que existe un modelo "Products"
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
});

const cartUserModel = mongoose.model(userCartCollection, userCartSchema)

export default cartUserModel