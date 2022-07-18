/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../global';
import MerchantNavBar from './MerchantNavBar';

export default function EditProduct() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const params = useParams();
  const inputForm = new FormData();
  const [shopProducts, setShopProducts] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShopProducts(
      { ...shopProducts, [name]: value },
    );
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/merchant/product/edit/${params.merchantId}/${params.productId}`)
      .then((result) => {
        setShopProducts(result.data);
      });
  }, []);

  return (
    <div className="col-sm">
      <MerchantNavBar />
      <div>
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">Edit Product</h1>
      </div>

      <div className="ml-4 p-8">
        <form
          method="put"
          encType="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
            inputForm.append('name', shopProducts.name);
            inputForm.append('price', shopProducts.price);
            inputForm.append('department', shopProducts.department);
            inputForm.append('adjective', shopProducts.adjective);
            inputForm.append('description', shopProducts.description);
            inputForm.append('material', shopProducts.material);
            inputForm.append('merchant_id', cookies.userId);
            inputForm.append('image', shopProducts.image);
            inputForm.append('image', event.target.image.files[0]);

            axios
              .put(`${BACKEND_URL}/merchant/product/edit/${params.merchantId}/${params.productId}`, inputForm)
              .then(() => {
                alert(`${event.target.name.value} is updated successfully`);
                navigate(`/merchant/product/${cookies.userId}`);
              });
          }}
        >
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="name" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
            <input type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={shopProducts.name} onChange={(event) => handleChange(event)} />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="description" className="flex block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Product Description</label>
            <textarea name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={shopProducts.description} onChange={(event) => handleChange(event)} required />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="department" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
            <input type="text" name="department" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={shopProducts.department} onChange={(event) => handleChange(event)} required />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="adjective" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adjective</label>
            <input type="text" name="adjective" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={shopProducts.adjective} onChange={(event) => handleChange(event)} required />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="material" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Material</label>
            <input type="text" name="material" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={shopProducts.material} onChange={(event) => handleChange(event)} required />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="price" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
            <input type="text" name="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={shopProducts.price} onChange={(event) => handleChange(event)} required />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="image">Product Image</label>
            <div className="avatar">
              <div className="mask mask-squircle w-32 h-24">
                <img src={`${BACKEND_URL}/public/images/${shopProducts.image}`} alt={shopProducts.image} />
              </div>
            </div>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" name="image" type="file" onChange={(event) => handleChange(event)} />
          </div>

          <button
            type="submit"
            className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Submit

          </button>
        </form>
      </div>

    </div>
  );
}
