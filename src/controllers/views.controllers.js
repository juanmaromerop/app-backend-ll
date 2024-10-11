import ProductsAndUser from "../dao/clases/views.dao.js"

const ProductsAndUserService = new ProductsAndUser()

export const viewRegister = (req, res) => {
    res.render('register')
}

export const viewLogin = (req, res) => {
    res.render('login')
}

export const viewCurrent = async (req, res) => {
    try {
        // Obtener usuario y productos desde el servicio
        const { user, products } = await ProductsAndUserService.getUserAndProducts(req.user);

        // Renderizar la vista 'current' con los datos del usuario y los productos
        res.render('current', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            products // Productos ya extraídos del servicio
        });

    } catch (error) {
        console.log('Error al obtener el usuario o los productos:', error.message);
        res.status(400).send(error.message);
    }
};
