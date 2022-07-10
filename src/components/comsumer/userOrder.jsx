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
    // console.log(x);
    const date = new Date();
    return (
      <div className="order-div">
        <div>
          <p>
            Order Id =
            {' '}
            {x.id}
          </p>
          <p>
            Purchase Date =
            {' '}
            {new Date(x.created_at).toLocaleDateString()}
          </p>
          

          <div className="flex justify-center items-center ">
            <p className="d-flex flex-column quanity-style">
              <p>
                Product Name
              </p>
              <p className='product-name'>
                {x.product.name}
              </p>
            </p>
            <div className="image-cart">
              <figure><img src={`/images/${x.product.image}`} width={200} height={200}  alt="Album" /></figure>
            </div>
            {/* <p className="cart-item-title">{x.product.title}</p> */}
            <p className="order-item">
              $
              {x.product.price}
            </p>
            <div className="d-flex flex-column quanity-style">
              <p>
                Quanity
              </p>
              <p>
                {x.quantity}
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  });

  return(
    <div>
      <Navbar />
         <h4 className="order-div">My Orders</h4>
      {orderList.length > 0 && (
        <>
          {newOrder}
        </>
      ) }
    </div>
  )
}