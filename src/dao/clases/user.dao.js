import userModel from "../../models/user.js"
import { createHash } from "../../utils.js"
import UserDTO from "../DTOs/user.dto.js";
import cartUserModel from "../../models/cartUser.js";


export default class User {

    register = async (first_name, last_name, email, age, password, role) => {
        try {
            let cartId = null

            if (role === 'user') {
                let newCart = await cartUserModel.create({ products: [] })
                console.log("Carrito creado con ID: ", newCart._id);
                cartId = newCart._id.toString();
            }

            let user = new UserDTO({
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role,
                cartId
            })

            let newUser = await userModel(user);
            await newUser.save()
            return newUser

        } catch (error) {
            console.log(error);
            return null
        }
    }

    login = async (email) => {
        let user = await userModel.findOne({ email: email })
        return user
    }
}
