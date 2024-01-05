
import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  subcategoryname: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

export default Subcategory;
