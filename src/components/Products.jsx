import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Products() {

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';



  return (
    <div className="col-sm">
        products
        <button className='btn btn-primary'>asdsada</button>
      <div data-theme="light">
      This div will always use light theme
      <span data-theme="retro">This span will always use retro theme!</span>
      </div>
    </div>
  );
}
