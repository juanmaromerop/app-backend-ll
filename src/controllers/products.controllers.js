import Products from "../dao/clases/products.dao.js";

const productsService = new Products()

export const saveProductsControllers = async (req, res) => {
    try {
        const { product, description, price, stock, category } = req.body;
        let newProduct = await productsService.saveProduct(product, description, price, stock, category);
        if (newProduct) {
            res.status(201).redirect('/api/sessions/current')
        } else {
            res.status(400).send("Error al agregar el producto");
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product, description, price, stock, category } = req.body;
    try {
        const updatedProduct = await productsService.updateProduct(id, { product, description, price, stock, category });
        if (updatedProduct) {
            res.redirect('/api/sessions/current');
        } else {
            res.status(500).send('Error al actualizar el producto');
        }
    } catch (error) {
        console.log('Error en la actualización del producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productsService.deleteProduct(id);
        if (result) {
            res.redirect('/api/sessions/current');
        } else {
            res.status(500).send('Error al eliminar el producto');
        }
    } catch (error) {
        console.log('Error en la eliminación del producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};