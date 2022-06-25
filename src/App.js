import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import {
  BrowserRouter, Routes,
  Route,
  Link, useNavigate,
} from 'react-router-dom';
import React, { useState , useEffect, useContext } from 'react';
import Products from './components/comsumer/Products';
import Product from './components/comsumer/product';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Products/>}></Route> 
          <Route path='/product/:id' element={<Product/>}></Route> 
        </Routes>
      </div>

  );
}

export default App;
