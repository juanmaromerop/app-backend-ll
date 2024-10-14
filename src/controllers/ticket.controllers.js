import Ticket from '../dao/clases/ticket.dao.js';
import jwt from 'jsonwebtoken'
const PRIVAE_KEY = "appSecret"

const ticketService = new Ticket()

export const completePurchase = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send({ error: "No autorizado. Faltan credenciales." });
    }

    const decoded = jwt.verify(token, PRIVAE_KEY);
    const userEmail = decoded.user.email; 
    const userId = decoded.user._id 

    const { cart } = req.body; 

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío, no se puede finalizar la compra.' });
    }

    // Generar ticket y enviar correo
    const {ticket} = await ticketService.generarTicket(cart, userEmail, userId);

    return res.status(200).json({ message: 'Compra finalizada con éxito', ticket });
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    return res.status(500).json({ error: 'Error al finalizar la compra' });
  }
};