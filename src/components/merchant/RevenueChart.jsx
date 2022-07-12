import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useParams,
} from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BACKEND_URL } from '../../global';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export default function RevenueChart() {
  const params = useParams();
  const [shopProducts, setShopProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/merchant/dashboard/${params.id}`)
      .then((result) => {
        setShopProducts(result.data.merchantOrder);
      });
  }, []);

  const graphDate = [];
  const graphRevenue = [];
  let productQuantity = 0;

  shopProducts.forEach((product) => {
    productQuantity = 0;
    product.orders.forEach((order) => {
      productQuantity += order.quantity;
      const purchaseDate = new Date(order.created_at);
      graphDate.push(purchaseDate.toDateString());
    });
    graphRevenue.push(productQuantity * product.price);
  });

  const chartData = {
    labels: graphDate,
    datasets: [
      {
        data: graphRevenue,
        fill: true,
        label: 'Revenue',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (

    <div className="h-96 mb-12">
      <h1 className="text-3xl mt-2">Revenue over Time</h1>
      <Line
        data={chartData}
        options={{ maintainAspectRatio: false }}
      />
    </div>

  );
}
