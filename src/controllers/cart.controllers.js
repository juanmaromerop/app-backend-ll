import Cart from '../dao/clases/cart.dao.js'
import productsModel from '../models/products.js'

const cartService = new Cart()

export const cartControllers = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId
    const { quantity } = req.body
    const product = await productsModel.findById(productId);
    const price = product.price;

    try {
        await cartService.addProductToCart(userId, productId, quantity, price)
        res.redirect('/api/session/cart')
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agregar producto al carrito');
    }
}