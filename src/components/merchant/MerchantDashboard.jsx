import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  useParams, Link, Outlet, useNavigate,
} from 'react-router-dom';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { BACKEND_URL } from '../../global';
import MerchantNavBar from './MerchantNavBar';
import SalesVolumeChart from './SalesVolumeChart';
import RevenueChart from './RevenueChart';
import MetricSummary from './MetricSummary';

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
      <MerchantNavBar />
      <div>
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-4 text-blue-600">Merchant Dashboard</h1>
      </div>

      <MetricSummary />

      <div className="grid grid-cols-2 gap-2 px-8">
        <RevenueChart />
        <SalesVolumeChart />
      </div>
      {shopProducts.map((p, index) => (
        <div>
          {p.id}
          {p.name}
          {p.orders.map((o, index2) => (
            o.quantity
          ))}
        </div>
      ))}
    </div>
  );
}
