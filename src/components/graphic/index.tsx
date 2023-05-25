import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graphic: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Page Impressions',
              data: [10, 20, 30, 40],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Adsense Clicks',
              data: [5, 15, 10, 30],
              type: 'line',
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              beginAtZero: true,
              ticks: {
                stepSize: 10,
              },
            },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartRef} id="chartjs-7" />;
};

export default Graphic;
