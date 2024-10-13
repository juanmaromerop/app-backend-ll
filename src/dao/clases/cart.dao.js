import userModel from "../../models/user.js";
import cartUserModel from "../../models/cartUser.js";
import productsModel from "../../models/products.js";
export default class Cart {

    addToCart = async (userId, productId, quantity) => {
        try {
            const user = await userModel.findById(userId);
            if (!user) throw new Error("Usuario no encontrado");
    
            const cart = await cartUserModel.findById(user.cartId);
            if (!cart) throw new Error("Carrito no encontrado");
    
            const product = await productsModel.findById(productId);
            if (!product) throw new Error("Producto no encontrado");
    
            const existingProduct = cart.products.find(item => item.productId.toString() === productId);
    
            const newQuantity = parseInt(quantity);
    
            const totalQuantity = existingProduct ? existingProduct.quantity + newQuantity : newQuantity;
    
            if (totalQuantity > product.stock) {
                throw new Error(`No puedes agregar más de ${product.stock} unidades de este producto.`);
            }
    
            if (existingProduct) {
                existingProduct.quantity += newQuantity; 
            } else {
                cart.products.push({ productId, quantity: newQuantity });
            }
    
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    getCart = async (userId) => {
        try {
            const user = await userModel.findById(userId);
            if (!user) throw new Error("Usuario no encontrado");

            const cart = await cartUserModel.findById(user.cartId).populate('products.productId'); // Populamos el productId para obtener los datos del producto
            if (!cart) throw new Error("Carrito no encontrado");
            console.log(cart); 
            let total = 0;

            cart.products.forEach(item => {
                total += item.quantity * item.productId.price;
            });

            return { cart, total }; 
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    removeFromCart = async (userId, productId) => {
        try {
            const user = await userModel.findById(userId);
            if (!user) throw new Error("Usuario no encontrado");

            const cart = await cartUserModel.findById(user.cartId);
            if (!cart) throw new Error("Carrito no encontrado");

            cart.products = cart.products.filter(item => item.productId.toString() !== productId);

            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    clearCart = async (userId) => {
        try {
            const user = await userModel.findById(userId);
            if (!user) throw new Error("Usuario no encontrado");

            const cart = await cartUserModel.findById(user.cartId);
            if (!cart) throw new Error("Carrito no encontrado");

            cart.products = [];

            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}