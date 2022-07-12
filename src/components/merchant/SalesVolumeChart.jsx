import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useParams,
} from 'react-router-dom';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BACKEND_URL, colourPalette } from '../../global';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SalesVolumeChart() {
  const params = useParams();
  const [shopProducts, setShopProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/merchant/dashboard/${params.id}`)
      .then((result) => {
        setShopProducts(result.data.merchantOrder);
      });
  }, []);

  const graphLabels = [];
  const graphQuantity = [];
  const chartDataColour = [];
  let productQuantity = 0;

  shopProducts.forEach((product, index) => {
    graphLabels.push(product.name.split(' ').slice(0, 4).join(' '));
    productQuantity = 0;
    product.orders.forEach((order) => {
      productQuantity += order.quantity;
    });
    graphQuantity.push(productQuantity);
    chartDataColour.push(colourPalette[index]);
  });

  const chartData = {
    labels: graphLabels,
    datasets: [
      {
        label: 'Number of items',
        data: graphQuantity,
        backgroundColor: chartDataColour,
        borderColor: chartDataColour,
      },
    ],
  };

  return (

    <div className="h-96 mb-12">
      <h1 className="text-3xl mt-2">Sales Volumes by Products</h1>
      <Doughnut
        data={chartData}
        options={{ maintainAspectRatio: false }}
      />
    </div>

  );
}
