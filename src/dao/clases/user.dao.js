import userModel from "../../models/user.js"
import { createHash } from "../../utils.js"
import UserDTO from "../DTOs/user.dto.js";
import cartUserModel from "../../models/cartUser.js";
import productsModel from "../../models/products.js";



export default class User {

    register = async (first_name, last_name, email, age, password, role) => {
        try {
            // Primero creamos al usuario
            let user = new UserDTO({
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role
            });

            let newUser = await userModel(user);
            await newUser.save(); // Guardamos el usuario primero

            // Después creamos el carrito asociado al userId del usuario recién creado
            let newCart = await cartUserModel.create({ userId: newUser._id, products: [] });
            console.log("Carrito creado con ID: ", newCart._id);

            // Actualizamos el cartId en el modelo de usuario
            newUser.cartId = newCart._id.toString();
            await newUser.save(); // Guardamos nuevamente el usuario con el cartId asignado

            return newUser;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    login = async (email) => {
        let user = await userModel.findOne({ email: email })
        return user
    }
    
}
