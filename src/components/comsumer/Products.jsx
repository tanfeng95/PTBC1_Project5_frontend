import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../global';
import Navbar from './navbar';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/products`)
      .then((result) => {
        setProducts(result.data.Product);
      });
  }, []);

  const [search, setSearch] = useState('');
  const handleSearch = (event) => {
    // console.log(search);

    axios.get(`${BACKEND_URL}/products`, {
      params: {
        search,
      },
    })
      .then((result) => {
        setProducts(result.data.Product);
      });
  };

  return (
    <div className="col-sm">
      <Navbar />

      <div className="search-div flex justify-center">
        <input type="text" placeholder="Search…" className="input input-bordered search" onChange={(event) => setSearch(event.target.value)} />
        <button className="btn btn-square btn btn-primary" type="button" onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
      <div className="catergories-div ">
        <div className="text-lg leading-7 font-medium underline underline-offset-1">Catergories</div>
        <div className="p-4 ">
          <Link to="/" class="link link-hover text-lg leading-7 font-medium p-4">Kitchen</Link>
          <Link to="/" class="link link-hover text-lg leading-7 font-medium p-4">Furniture</Link>
          <Link to="/" class="link link-hover text-lg leading-7 font-medium p-4">Clothes</Link>
        </div>
      </div>
      <div className="product-div flex flex-wrap px-10 ml-16">
        {products.map((p, index) => (
          <div className="card w-64 bg-base-120 shadow-xl bg-slate-50">
            <figure className="px-20 pt-10">
              <img src={`${BACKEND_URL}/public/images/${p.image}`} alt={p.image} className="rounded-xl" />
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
