import mongoose from 'mongoose';

const cartCollection = 'carts';
const cartSchema= new mongoose.Schema({
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number
        },
      }
    ],
  }
)

export const cartModel =mongoose.model(cartCollection,cartSchema);