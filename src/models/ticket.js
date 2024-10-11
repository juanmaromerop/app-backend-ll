import mongoose from "mongoose";

const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
    code: {
      type: String,
      unique: true,
      required: true,
    },
    purchase_datetime: {
      type: Date,
      default: Date.now, 
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  });
  

  ticketSchema.pre('save', async function (next) {
    const ticket = this;
  

    ticket.code = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
    next();
  });
  
  const ticketModel = mongoose.model(ticketCollection, ticketSchema)

  export default ticketModel