import Products from "./products.dao.js";

const productsService = new Products();

export default class ProductsAndUser {

    getUserAndProducts = async (user) => {

        if (!user || !user.first_name) {
            throw new Error('Usuario no encontrado');
        }

        const productsData = await productsService.getProducts();

        // Verificar si hay productos
        const products = productsData && productsData.length > 0 ? productsData : [];

        // Devolver el usuario y los productos
        return {
            user,
            products: productsData // Devolver directamente los productos
        };
    };

    


}