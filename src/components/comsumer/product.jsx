import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import Zoom from 'react-img-zoom';
import { BACKEND_URL } from '../../global';
import Navbar from './navbar';

export default function Product({ cartItem, setCartItem }) {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [value, setvalue] = useState(1);
  const [refreshNavbar, setRefreshNavbar] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useLocalStorage(`product id${product?.id}`, 'Bob');
  useEffect(() => {
    axios.get(`${BACKEND_URL}/product/${params.id}`)
      .then((result) => {
        const { data } = result;
        setProduct(data);
      });
  }, []);
  /**
   *  handle add to cart button
   * @returns
   */
  const handleAddToCartBtn = () => {
    // if (Cookies.get('sessionId') === undefined) {
    //   navigate('/login');
    //   return;
    // }
    setRefreshNavbar(true);

    product.quanity = value;
    setName(product);
    setShowModal(true);
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
    setRefreshNavbar(true);
    setRefreshNavbar(false);
    product.quanity = value;
    setName(product);
  };

  // src={`/images/${product.image}`}
  return (
    <div>
      {product && (
      <div className="">
        <Navbar refreshNavbar={refreshNavbar} />
        <div className="flex book-main m-6 ">
          <Zoom
            img={`${BACKEND_URL}/public/images/${product.image}`}
            zoomScale={3}
            width={400}
            height={300}
          />
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p className="card-title">
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
        <div class="container mx-auto border-opacity-50 p-10">
          <div class="grid h-20 card bg-emerald-300 rounded-box place-items-center">
          <h5 className="underline underline-offset-1">
            Product details of
            {' '}
            {product.name}
          </h5>
          <p>{product.description}</p>
          </div>
          <div class="divider"></div>
          <div class="grid h-30 card bg-emerald-300 rounded-box place-items-center">
            <h5 className="underline underline-offset-1">
              Specification of
              {' '}
              {product.name}
            </h5>
            <span>Material : {product.material}</span>
            <span>Description : {product.description}</span>
            <span>department : {product.department}</span>
            </div>
        </div>
      </div>
      )}
        {showModal ? (
        <>
          <div
            className=" flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Item Added To Cart
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}

                {/* footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </div>
  );

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
