import userModel from "../models/user.js"
import { createHash } from "../utils.js"
import UserDTO from "../dao/DTOs/user.dto.js";
import cartUserModel from "../models/cartUser.js";

export default class User {

    register = async (first_name, last_name, email, age, password, role) => {
        try {
            const allowedRoles = ['user', 'admin'];
            if (!allowedRoles.includes(role.toLowerCase())) {
               return null
            }

            let user = new UserDTO({
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                role: role.toLowerCase()
            });

            let newUser = await userModel(user);
            await newUser.save();

            let newCart = await cartUserModel.create({ userId: newUser._id, products: [] });
        
            newUser.cartId = newCart._id.toString();
            await newUser.save();

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
