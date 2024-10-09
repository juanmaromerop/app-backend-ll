export default class UserDTO {
    constructor(user) {
        this.first_name = this.capitalizeFirstLetter(user.first_name);
        this.last_name = this.capitalizeFirstLetter(user.last_name);
        this.email = user.email;
        this.password = user.password;
        this.age = user.age;
        this.role = user.role
        this.cartId = user.cartId;
    }

    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}
