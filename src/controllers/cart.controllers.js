import Cart from '../dao/clases/cart.dao.js'
import jwt from 'jsonwebtoken'
const PRIVAE_KEY = "appSecret"

const cartService = new Cart()

export const addToCartController = async (req, res) => {
    
    try {
        // Obtener el token JWT de las cookies
        const token = req.cookies.jwt;

        // Verificamos si existe el token
        if (!token) {
            return res.status(401).send({ error: "No autorizado. Faltan credenciales." });
        }
        const decoded = jwt.verify(token, PRIVAE_KEY);

        const userId = decoded.user._id;  // Acceder a _id dentro de user

        const { productId, quantity } = req.body;

        // Verificamos que se proporcionen los datos necesarios
        if (!userId || !productId || !quantity) {
            return res.status(400).send({ error: "Faltan datos en la solicitud" });
        }

        // Llamar al servicio de usuarios para agregar el producto al carrito
        const cart = await cartService.addToCart(userId, productId, quantity);

        // Verificar si el carrito fue actualizado correctamente
        if (!cart) {
            return res.status(500).send({ error: "Error al agregar el producto al carrito" });
        }
        
        res.status(200).send({ message: "Producto agregado al carrito correctamente", cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
};

export const getCartController = async (req, res) => {
    try {
        // Obtener el token JWT de las cookies
        const token = req.cookies.jwt;

        // Verificamos si existe el token
        if (!token) {
            return res.status(401).send({ error: "No autorizado. Faltan credenciales." });
        }

        // Decodificar el token JWT
        const decoded = jwt.verify(token, PRIVAE_KEY);
        const userId = decoded.user._id;  // Acceder a _id dentro de user

        // Llamar al servicio para obtener el carrito y calcular el total
        const { cart, total } = await cartService.getCart(userId);

        // Verificar si se obtuvo el carrito
        if (!cart) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }

        // Mapear productos para obtener los datos necesarios
        const cartProducts = cart.products.map(item => ({
            productId: item.productId._id,  // Acceder al _id del producto
            name: item.productId.name,      // Acceder al nombre del producto
            price: item.productId.price,    // Acceder al precio
            quantity: item.quantity,        // Cantidad en el carrito
            total: item.productId.price * item.quantity // Total para este producto
        }));

        // Renderizar la vista del carrito con los productos y el total general
        res.render('cart', { cart: cartProducts, total });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
};

export const removeFromCartController = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).send({ error: "No autorizado. Faltan credenciales." });
        }

        const decoded = jwt.verify(token, PRIVAE_KEY);
        const userId = decoded.user._id;
        const { productId } = req.body;
        console.log("Product", productId);
        console.log("User", userId);
        
        if (!userId || !productId) {
            return res.status(400).send({ error: "Faltan datos en la solicitud" });
        }

        const cart = await cartService.removeFromCart(userId, productId);

        if (!cart) {
            return res.status(500).send({ error: "Error al eliminar el producto del carrito" });
        }

        res.status(200).send({ message: "Producto eliminado del carrito correctamente", cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
};

// Vaciar todo el carrito
export const clearCartController = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).send({ error: "No autorizado. Faltan credenciales." });
        }

        const decoded = jwt.verify(token, PRIVAE_KEY);
        const userId = decoded.user._id;

        const cart = await cartService.clearCart(userId);

        if (!cart) {
            return res.status(500).send({ error: "Error al vaciar el carrito" });
        }

        res.status(200).send({ message: "Carrito vaciado correctamente", cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
};