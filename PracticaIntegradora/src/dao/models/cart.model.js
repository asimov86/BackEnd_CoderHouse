import mongoose from 'mongoose';

const cartCollection = 'carts';
const cartSchema= new mongoose.Schema({
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "producto",
        },
        quantity: {
          type: Number
        },
      }
    ],
  }
)

export const cartModel =mongoose.model(cartCollection,cartSchema);