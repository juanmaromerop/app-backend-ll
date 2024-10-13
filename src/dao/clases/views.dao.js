import Products from "./products.dao.js";

const productsService = new Products();

export default class ProductsAndUser {

    getUserAndProducts = async (user) => {

        if (!user || !user.first_name) {
            throw new Error('Usuario no encontrado');
        }

        const productsData = await productsService.getProducts();

        return {
            user,
            products: productsData 
        };
    };

    


}