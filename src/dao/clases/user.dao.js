import userModel from "../../models/user.js"
import { createHash } from "../../utils.js"


export default class User {



    register = async (first_name, last_name, email, age, password, role) => {
        try {
            let newUser = await userModel({
                first_name, 
                last_name, 
                email, 
                age, 
                password: createHash(password),
                role
            });
            await newUser.save()
            return newUser

        } catch (error) {
            console.log(error);
            return null
        }
    }

    login = async (email) => {
        let user = await userModel.findOne({email: email})
        return user
    }
}
