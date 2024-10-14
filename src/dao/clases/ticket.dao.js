import ticketModel from '../../models/ticket.js';
import nodemailer from 'nodemailer';
import userModel from '../../models/user.js';
import cartUserModel from '../../models/cartUser.js';
import dotenv from 'dotenv'
dotenv.config()

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'juanmaromeroperalta@gmail.com',
        pass: process.env.CODEGMAIL || "rsdc przr qloz pgug",
    },
});

const generateTicketCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) { 
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

export default class Ticket {

    generarTicket = async (cart, userEmail, userId) => {

      if (cart.length === 0) {
        throw new Error("El carrito está vacío, no se puede finalizar la compra.");
    }

        const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const ticketCode = generateTicketCode()

        const ticket = await ticketModel.create({
            amount: totalAmount,
            purchaser: userEmail,
            code: ticketCode
        });

        await transport.sendMail({
            from: 'juanmaromeroperalta@gmail.com',
            to: userEmail,
            subject: 'Confirmación de compra',
            html: `
          <div>
            <h1>Gracias por tu compra</h1>
            <p>Este es tu ticket con el código: ${ticketCode}</p>
            <p>Total pagado: $${totalAmount}</p>
            <p>Fecha de compra: ${ticket.purchase_datetime}</p>
          </div>
        `,
        });

        const user = await userModel.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        const clearCart = await cartUserModel.findById(user.cartId);
        if (!cart) throw new Error("Carrito no encontrado");

        clearCart.products = [];

        await clearCart.save();

        return {ticket, clearCart};
    };
}


