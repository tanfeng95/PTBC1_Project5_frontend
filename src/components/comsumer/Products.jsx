import React, { useState , useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../global';

export default function Products() {

    const [products, setProducts] = useState([]);
    useEffect(()=>{
      axios
      .get(`${BACKEND_URL}/products`)
      .then((result)=>{
        setProducts(result.data.Product)
      })
    },[])
  return (
    <div className="col-sm">
      <div className='product-div'>
        {products.map((p,index)=>{
          return(
            <div className='product' key={p.id}>
              <p>{p.id}{p.name}</p>
            </div>
          )

        })}
      </div>
    </div>
  );
}
