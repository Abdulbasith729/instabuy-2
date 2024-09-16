const express = require('express');
const router = express.Router();
const { addProduct, getProduct, updateProduct, deleteProduct } = require('../controllers.js/product'); // Adjust path if necessary
const {registerUser, loginUser,} =require('../controllers.js/auth')
// User API routes
// Route to register a new user
router.post('/register', registerUser);

//Route to log in a user
router.post('/login', loginUser);

// Route to get users, protected by JWT authentication


 

// Product API routes
router.get('/get-products', getProduct); // Specific product by ID
router.post('/add-products', addProduct); // Add new product
router.put('/update-products/:id', updateProduct); // Update product by ID
router.delete('/delete-products/:id', deleteProduct); // Delete product by ID

module.exports = router;
