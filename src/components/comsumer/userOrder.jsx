import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './navbar';
import { BACKEND_URL } from '../../global';

export default function UserOrder() {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let userId;
    if (Cookies.get('userId') !== undefined) {
      userId = Cookies.get('userId');
    } else if (Cookies.get('sessionId') === undefined) {
      navigate('/login');
      return;
    }
    axios.get(`${BACKEND_URL}/order/${userId}`)
      .then((result) => {
        const { data } = result;
        console.log(data);
        const { userOrder } = data;
        console.log(userOrder);
        setOrderList([...userOrder]);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

const newOrder = orderList.map((x) => {
    const date = new Date();
    return (
      <div className="order-div">
        <div>
          <p className='badge badge-primary text-lg'>
            Order Id =
            {' '}
            {x.id}
          </p>
          <p className='badge badge-info text-lg'>
            Purchase Date =
            {' '}
            {new Date(x.created_at).toLocaleDateString()}
          </p>
          
          <div class="overflow-x-auto w-full">
  <table class="table w-full">

    <thead>
      <tr>
        <th>
        </th>
        <th>Product Name</th>
        <th>Image</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <th>
        </th>
        <td>
          <div class="flex items-center space-x-3">
            {/* <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div> */}
            <div className='product-name'>
              <div >{x.product.name}</div>
    
            </div>
          </div>
        </td>
        <td>
            <div class="avatar">
              <div class="mask mask-squircle w-18 h-20">
                <img src={`/images/${x.product.image}`} width={200} height={200}  alt="Album" />
              </div>
            </div>
            {/* <div className="image-cart">
              <figure><img src={`/images/${x.product.image}`} width={200} height={200}  alt="Album" /></figure>
            </div>  */}
        </td>
        <td>
         {x.product.price}
        </td>
        <th >
          {x.quantity}
        </th>
      </tr>
    </tbody>

    {/* <tfoot>
      <tr>
        <th></th>
        <th>Product Name</th>
        <th>Image</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </tfoot> */}
    
  </table>
</div>

        </div>
      </div>
    );
  });

  return(
    <div>
      <Navbar />
         <h1 className='text-lg font-medium leading-7 text-slate-900'>My Orders</h1>
      {orderList.length > 0 && (
        <>
          {newOrder}
        </>
      ) }
    </div>
  )
}