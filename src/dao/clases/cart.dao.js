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
    
            // Obtener el producto de la base de datos para verificar el stock
            const product = await productsModel.findById(productId);
            if (!product) throw new Error("Producto no encontrado");
    
            const existingProduct = cart.products.find(item => item.productId.toString() === productId);
    
            // Asegurarse de que `quantity` sea un número
            const newQuantity = parseInt(quantity);
    
            // Cantidad total después de la actualización (si ya existe en el carrito)
            const totalQuantity = existingProduct ? existingProduct.quantity + newQuantity : newQuantity;
    
            // Verificar si la cantidad total excede el stock disponible
            if (totalQuantity > product.stock) {
                throw new Error(`No puedes agregar más de ${product.stock} unidades de este producto.`);
            }
    
            if (existingProduct) {
                existingProduct.quantity += newQuantity; // Actualizar cantidad como número
            } else {
                cart.products.push({ productId, quantity: newQuantity }); // Agregar nuevo producto
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

            let total = 0;

            // Calcular el precio total del carrito
            cart.products.forEach(item => {
                total += item.quantity * item.productId.price; // Multiplicamos cantidad por precio del producto
            });

            return { cart, total }; // Devolvemos el carrito y el total
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}