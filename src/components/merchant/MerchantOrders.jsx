import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import * as emailjs from 'emailjs-com';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import {
  BACKEND_URL, serviceId, customerTemplateId, userId,
} from '../../global';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MerchantDashboard() {
  const params = useParams();
  const [shopProducts, setShopProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/merchant/dashboard/${params.id}`)
      .then((result) => {
        setShopProducts(result.data.merchantOrder);
      });
  }, []);

  return (
    <div className="col-sm">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Buyer Details</th>
              <th>Order Date</th>
              <th>Shipment Completed</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {shopProducts.map((p, index) => (

              p.orders.map((o, index2) => (
                <tr>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={`${BACKEND_URL}/public/images/${p.image}`} alt={p.image} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {p.name.split(' ').slice(0, 4).join(' ')}
                        </div>
                        <div className="text-sm opacity-50">
                          $
                          {p.price}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {o.buyer_id}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Qty:
                      {' '}
                      {o.quantity}
                    </span>
                  </td>
                  <td>{o.created_at}</td>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        onClick={() => {
                          const templateParams = {
                            from_name: 'TailWind Trading',
                            to_name: 'joel.mak32@gmail.com',
                            message: `Your order for ${o.quantity} of ${p.name} have been shipped by the seller.`,
                          };
                          emailjs.send(serviceId, customerTemplateId, templateParams, userId)
                            .then((resp) => {
                              console.log('FIRE EMAIL SUCCESS!', resp.status, resp.text);
                            }, (err) => {
                              console.log('FIRE EMAIL FAILED...', err);
                            });
                        }}
                      />
                    </label>
                  </th>
                </tr>
              ))

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
