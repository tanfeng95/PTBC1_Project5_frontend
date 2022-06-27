import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import { BACKEND_URL } from '../../global';
import Zoom from 'react-img-zoom';
import Navbar from './navbar';



export default function Product(){
  const params = useParams();
  const [product , setProduct]= useState(null)
    const [value, setvalue] = useState(1);
  const [name, setName] = useLocalStorage(`book id${product?.id}`, 'Bob');
  useEffect(() =>{
    axios.get(`${BACKEND_URL}/product/${params.id}`)
    .then((result)=>{
      const {data} = result
      setProduct(data);
    })
  },[])
    /**
   *  handle add to cart button
   * @returns
   */
  const handleAddToCartBtn = () => {
    // if (Cookies.get('sessionId') === undefined) {
    //   navigate('/login');
    //   return;
    // }
    product.quanity = value;
    setName(product);
    // setShowModal(true);
  };
  /**
   * handle buy now button
   * @returns
   */
  const handleBuyNowBtn = () => {
    // if (Cookies.get('sessionId') === undefined) {
    //   navigate('/login');
    //   return;
    // }
    product.quanity = value;
    setName(product);
  };

  //src={`/images/${product.image}`}
  return(
    <div>
     {product &&(
       <>
 <div className="book-content">
         <Navbar/>
            <div className="flex book-main m-6">
                <Zoom
                img={`/images/${product.image}`}
                zoomScale={3}
                width={400}
                height={300}
              />
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>

                <p>
                  $
                  {product.price}
                </p>
                <select className="select select-bordered" onChange={(event) => { setvalue(event.target.value); }}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
                <div className="card-actions justify-end">
                  <Link to="/cart">
                    <button className="btn btn-primary" type="button" onClick={handleBuyNowBtn}>buy now</button>
                  </Link>
                  <button className="btn btn-primary" type="button" onClick={handleAddToCartBtn}>add to cart</button>
                </div>
              </div>
            </div>
            <div className="book-details ">
              <h5 className="bg-base-200">
                Product details of
                {' '}
                {product.name}
              </h5>
              <p>{product.description}</p>
              <hr />
              <h5 className="bg-base-200">
                Specification of
                {' '}
                {product.name}
              </h5>
              <span>Brand :</span>
              <span>{product.material}</span>
              <p />
              <span>Publisher :</span>
              <span>{product.description}</span>
              <p />
              <span>Author :</span>
              <span>{product.department}</span>
            </div>

          </div>
       </>
     )}
    </div>
  )




  function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      try {
      // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
      // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
      // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
      // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }


}

