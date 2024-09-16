const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Product schema
const productSchema = new Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
