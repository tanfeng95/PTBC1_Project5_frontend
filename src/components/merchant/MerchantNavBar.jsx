import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function MerchantNavBar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  /**
 * handle logout
 */
  const handleLogout = () => {
    setShowModal(true);
    removeCookie('userId', { path: '/' });
    removeCookie('sessionId', { path: '/' });
  };
 return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={`/merchant/dashboard/${cookies.userId}`} className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl ">
          <span className="lowercase">TailWind</span>
          <span className="text-base-content uppercase">Trading</span>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to={`/merchant/dashboard/${cookies.userId}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={`/merchant/${cookies.userId}`}>
                Shop Preview
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    You are logged out.
                  </h3>
                </div>
                {/* body */}

                {/* footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      navigate('/')
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </div>
  );

}