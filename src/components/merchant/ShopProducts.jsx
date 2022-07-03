import React, { useState , useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import { BACKEND_URL } from '../../global';
import Navbar from '../comsumer/navbar';

export default function ShopProducts() {

    const params = useParams();
    const [shopProducts, setShopProducts] = useState([]);
    useEffect(()=>{
      axios
      .get(`${BACKEND_URL}/merchant/${params.id}`)
      .then((result)=>{
        setShopProducts(result.data)
      })
    },[])
  return (
    <div className="col-sm">
      {/* <Navbar/> */}
      <div className='product-div flex flex-wrap'>
        {shopProducts.map((p,index)=>{
          return(
            <div class="card w-96 bg-base-100 shadow-xl">
              <figure class="px-10 pt-10">
                <img src={`/images/${p.image}`} alt={p.image} class="rounded-xl" />
              </figure>
              <div class="card-body items-center text-center">
                <h2 class="card-title">{p.name}</h2>
                <p>{p.adjective}</p>
                <div class="card-actions">
                  <Link to ={`/product/${p.id}`}>
                    <button class="btn btn-primary">Buy Now</button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
