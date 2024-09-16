const mongoose = require('mongoose'); // Import mongoose
const Product = require('../Models/ProductSchema'); // Adjust path if necessary

// Utility functions for sending responses
const sendSuccessResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(message, error);
  res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.message : undefined
  });
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    sendSuccessResponse(res, 201, 'Product added successfully', product);
  } catch (error) {
    sendErrorResponse(res, 400, 'Error adding product', error);
  }
};

// Get all products
const getProduct = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find({});

    if (products.length === 0) {
      return sendErrorResponse(res, 404, 'No products found', 
        new Error('No products available in the database.'));
    }

    sendSuccessResponse(res, 200, 'Products retrieved successfully', products);
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error', error);
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    // Find and update the product by ID
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Check if the product was not found
    if (!product) {
      return sendErrorResponse(res, 404, 'Product not found', 
        new Error('No product found with the provided ID.'));
    }

    // Send success response with the updated product
    sendSuccessResponse(res, 200, 'Product updated successfully', product);
  } catch (error) {
    // Handle errors during the update process
    sendErrorResponse(res, 400, 'Error updating product', error);
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Ensure the ID is in the correct format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendErrorResponse(res, 400, 'Invalid product ID', new Error('The provided ID is not valid.'));
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return sendErrorResponse(res, 404, 'Product not found', new Error('No product found with the provided ID.'));
    }

    sendSuccessResponse(res, 200, 'Product deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, 'Error deleting product', error);
  }
};

module.exports = { addProduct, getProduct, updateProduct, deleteProduct };
