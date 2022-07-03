import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jsSHA from 'jssha';
import Navbar from './navbar';
import { BACKEND_URL } from '../../global';

export default function Login({ setCookie }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const SALT = 'SALT';

  const getHash = (input) => {
  // create new SHA object
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    // create an unhashed cookie string based on user ID and salt
    const unhashedString = `${input}-${SALT}`;
    // generate a hashed cookie string using SHA object
    shaObj.update(unhashedString);
    return shaObj.getHash('HEX');
  };
  /**
 * handle login button
 */
  const handleLogin = () => {
    // console.log(email);
    // console.log(password);
    const input = { email: email, password };
    axios.post(`${BACKEND_URL}/login`, input)
      .then((result) => {
        console.log(result);
        const { data } = result;

        if (data.noUser === true) {
          setError(data.error);
          return;
        }
        console.log(data[0].id);
        setCookie('userId', data[0].id, { path: '/' });

        const loggedInCookie = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
        const unHashCookie = `${data[0].id}-${SALT}`;
        loggedInCookie.update(unHashCookie);
        const hashCookieString = loggedInCookie.getHash('HEX');

        setCookie('sessionId', hashCookieString, { path: '/' });
        setError('');
        // setCookie('sessionId', data, { path: '/' });
        // setCookie('sessionId', uniqid(), { path: '/' });
        if (data[0].role === 'merchant') {
          navigate(`/merchant/${data[0].id}`);
        } else {
          navigate('/');
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white border-t-4 border-purple-600 rounded-md shadow-md border-top lg:max-w-md">
          <h1 className="text-3xl font-semibold text-center text-purple-700">User Login</h1>
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
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {' '}
            Don't have an account?
            {' '}
            <Link to="/signup">
              {' '}
              <a href="#" className="font-medium text-purple-600 hover:underline">
                Sign up
              </a>
            </Link>

          </p>
          <div>
            <h3 className="error-div">{error}</h3>
          </div>
        </div>
      </div>

    </div>

  );
}
