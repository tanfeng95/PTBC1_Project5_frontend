import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import { BACKEND_URL } from '../../global';
import MerchantNavBar from './MerchantNavBar';

export default function ProductList() {
  const params = useParams();
  const [shopProducts, setShopProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/merchant/product/${params.id}`)
      .then((result) => {
        setShopProducts(result.data);
      });
  }, []);
  return (
    <div className="col-sm">
      <MerchantNavBar />
      <div>
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">Product List</h1>
      </div>
      <div className="flex ml-3 justify-start">
        <Link to="/merchant/product/add">
          <button className="btn btn-primary">Add a new product</button>
        </Link>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>

        <tbody>
          {shopProducts.map((p, index) => (
            <tr>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-18 h-20">
                    <img src={`/images/${p.image}`} alt={p.image} />
                  </div>
                </div>
              </td>
              <td>
                {p.name}
              </td>
              <td>
                <Link to={`/merchant/product/edit/${params.id}/${p.id}`}>
                  <button className="btn btn-info">Edit</button>
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    axios
                      .put(`${BACKEND_URL}/merchant/product/delete/${params.id}/${p.id}`)
                      .then(
                        alert('Product deleted.'),
                        window.location.reload(),
                      );
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
}
