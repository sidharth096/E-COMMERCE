
import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  ram: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  images: {
    type: [String], 
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
