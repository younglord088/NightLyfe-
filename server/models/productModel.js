import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: { type: Number, required: true },
    photo: {
      data: Buffer,
      contentType: String,
    },
    
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
