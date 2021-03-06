import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter, Routes,
  Route,
  Link, useNavigate,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import React, { useState, useEffect, useContext } from 'react';
import Products from './components/comsumer/Products';
import Product from './components/comsumer/product';
import Cart from './components/comsumer/cart';
import Login from './components/comsumer/login';
import Signup from './components/comsumer/signup';
import Checkout from './components/comsumer/checkout';
import UserOrder from './components/comsumer/userOrder';

import ShopProducts from './components/merchant/ShopProducts';
import MerchantDashboard from './components/merchant/MerchantDashboard';
import ProductList from './components/merchant/ProductList';
import AddProduct from './components/merchant/AddProduct';
import EditProduct from './components/merchant/EditProduct';

function App() {
  const [checkState, setCheckState] = useState([]);
  const [quanitylist, setQuantityList] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart checkState={checkState} setCheckState={setCheckState} quanitylist={quanitylist} setQuantityList={setQuantityList} />} />
        <Route path="/login" element={<Login setCookie={setCookie} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout checkState={checkState} quanitylist={quanitylist} />} />
        <Route path="/orders" element={<UserOrder cookies={cookies} />} />

        <Route path="/merchant/dashboard/:id" element={<MerchantDashboard />} />
        <Route path="/merchant/product/:id" element={<ProductList />} />
        <Route path="/merchant/:id" element={<ShopProducts />} />
        <Route path="/merchant/product/add" element={<AddProduct />} />
        <Route path="/merchant/product/edit/:merchantId/:productId" element={<EditProduct />} />
      </Routes>
    </div>

  );
}

export default App;
