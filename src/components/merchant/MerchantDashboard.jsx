import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import { BACKEND_URL } from '../../global';
import MerchantNavBar from './MerchantNavBar';

export default function MerchantDashboard() {
  const params = useParams();
  const [shopProducts, setShopProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/merchant/dashboard/${params.id}`)
      .then((result) => {
        setShopProducts(result.data);
      });
  }, []);
  return (
    <div className="col-sm">
      <MerchantNavBar />
      <div>
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">Merchant Dashboard</h1>
      </div>

      <div>
        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {shopProducts.map((p, index) => (
            <li className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <img src={`/images/${p.image}`} alt={p.image} className="w-40 rounded-xl" />
              {' '}
              {p.name}
              <Link to={`/merchant/product/edit/${params.id}/${p.id}`}>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
              </Link>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => {
                  axios
                    .put(`${BACKEND_URL}/merchant/product/delete/${params.id}/${p.id}`)
                    .then(
                      alert('Product deleted.'),
                      // navigate(`/merchant/dashboard/${params.id}`),
                      window.location.reload(),
                    );
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
