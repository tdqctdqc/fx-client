import React from 'react';
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './CurrencyChart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = [
  'rgb(255, 0, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 0, 255)',
  'rgb(100, 0, 0)',
  'rgb(0, 100, 0)',
  'rgb(0, 0, 100)',
];


function CurrencyChart( { baseCurrency, dates, 
  comparisonCurrencies, arrRates, loading } ) {
  
  useEffect(() => {
    console.log('chart rendering');
  })
  const data = {
    labels: dates,
    datasets: comparisonCurrencies.map((compCurr, index) => {
      const compCurrData = {
        label: compCurr.toUpperCase(),
        data: arrRates[index],
        borderColor: colors[index % colors.length],
      };
      return compCurrData;
    })
  };
  const blankData = {
    labels: dates,
    datasets: comparisonCurrencies.map((compCurr, index) => {
      return { label: '', data: [] };
    })
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `${baseCurrency.toUpperCase()} Exchange Rate`,
      },
    },
  };
  const blankOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `Loading...`,
      },
    },
  };
  if(loading === false) {
    return (
        <div className='chart'> 
          <Line options={options} data={data} /> 
        </div>
    );
  }
  return(
    <div> 
            <Line options={blankOptions} data={blankData} className="greyed" /> 
    </div>
  );
  
}

export default CurrencyChart;