import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import {
  BrowserRouter, Routes,
  Route,
  Link, useNavigate,
} from 'react-router-dom';

import Products from './components/Products';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';



function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/' element={<Products/>}></Route> 
      </Routes>
    </div>
  );
}

export default App;
