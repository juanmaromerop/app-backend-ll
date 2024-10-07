import productsModel from '../../models/products.js'


export default class Products {

    getProducts = async () => {
        try {
            let products = await productsModel.find().lean();
            return products;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    saveProduct = async (product, description, price, stock, category) => {
        try {
            let newProduct = await productsModel({
                product,
                description,
                price,
                stock,
                category
            });
            await newProduct.save();
            return newProduct;

        } catch (error) {
            console.log(error);
            return null;
            
        }
    }

    updateProduct = async (id, updatedData) => {
        try {
            let updatedProduct = await productsModel.findByIdAndUpdate(id, updatedData, { new: true });
            return updatedProduct;
        } catch (error) {
            console.log('Error al actualizar producto:', error);
            return null;
        }
    }

      deleteProduct = async (id) => {
        try {
            await productsModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.log('Error al eliminar producto:', error);
            return false;
        }
    }
}