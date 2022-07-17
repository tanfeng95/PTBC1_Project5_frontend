import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import { BACKEND_URL } from '../../global';
import MerchantNavBar from './MerchantNavBar';

export default function ShopProducts() {
  const params = useParams();
  const [shopProducts, setShopProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/merchant/${params.id}`)
      .then((result) => {
        setShopProducts(result.data);
      });
  }, []);
  return (
    <div className="col-sm">
      <MerchantNavBar />
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600"> Shop Preview </h1>
      <div className="product-div flex flex-wrap px-10 ml-16">
        {shopProducts.map((p, index) => (
          <div className="card w-64 bg-base-120 shadow-xl bg-slate-50">
            <figure className="px-20 pt-10">
              <img src={`/images/${p.image}`} alt={p.image} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{p.name}</h2>
              <p>{p.adjective}</p>
              <div className="card-actions">
                <Link to={`/product/${p.id}`}>
                  <button className="btn btn-primary">Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
