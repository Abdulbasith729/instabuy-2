import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import ShopperLogin from './components/ShopperLogin';
import ShopperSignUp from './components/ShoppersSignup'; // Fixed the typo here
import SellerLogin from './components/SellerLogin';
import SellerSignup from './components/SellerSignup';
import Home from './components/Home';
import Product from './components/Product';
import AddProduct from './components/AddProduct'; // Fixed the casing here
import EditProduct from './components/EditProduct';
import SellerProduct from './components/SellerProduct';

import './App.css';
import Cart from './components/Cart';
import Purchase from './components/Purchase';

const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/shopper-login" element={<ShopperLogin />} />
          <Route path="/shopper-signup" element={<ShopperSignUp />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Purchase" element={<Purchase />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/seller-product" element={<SellerProduct />} />
          {/* Add a catch-all route for undefined paths */}
          <Route path="*" element={<FirstPage />} />
        </Routes>
      </div>
 
  );
}

export default App;
