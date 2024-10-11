import mongoose from "mongoose";

const userCartCollection = 'userCart';

const userCartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, default: 1 }
    }]
});

const cartUserModel = mongoose.model(userCartCollection, userCartSchema)

export default cartUserModel