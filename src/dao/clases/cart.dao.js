import cartUserModel from "../../models/cartUser.js"

export default class Cart {

    addProductToCart = async (userId, productId, quantity, price) => {
        
        
        let cart = await cartUserModel.findOne({userId})
        if (!cart) {
            cart = new cartUserModel({ userId, products: [] })
        }

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += parseInt(quantity)
    
        } else {
            cart.products.push({ product: productId, quantity: parseInt(quantity), price: parseFloat(price) })
    
        }
        await cart.save()
        return cart
    }

    getCartByUserId = async (userId) => {
        return await cartUserModel.findOne({ userId })
    }
}