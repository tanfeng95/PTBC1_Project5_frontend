import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import { useCookies } from 'react-cookie';
import { BACKEND_URL } from '../../global';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  /**
 * handle sign up button
 */
  const handleSignup = () => {
    console.log(email);
    console.log(password);
    const input = { email: email, password };
    axios.post(`${BACKEND_URL}/signup`, input)
      .then((result) => {
        const { data } = result;
        console.log(data);
        if (data.noUser === true) {
          console.log(data);
          setError(data.error);
          return;
        }
        console.log(result);
        setError('');
        navigate('/login');
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white border-t-4 border-purple-600 rounded-md shadow-md border-top lg:max-w-md">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Sign Up</h1>
          <form className="mt-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-800">Email</label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mt-4">
              <div>
                <label htmlFor="password" className="block text-sm text-gray-800">Password</label>
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {/* <a href="#" className="text-xs text-gray-600 hover:underline">Forget Password?</a> */}
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <div>
            <h3 className="error-div">{error}</h3>
          </div>
        </div>

      </div>
    </div>
  );
}
