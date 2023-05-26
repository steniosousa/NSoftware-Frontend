import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface GraphicProps {
  panelType: string;
}

const Graphic: React.FC<GraphicProps> = ({ panelType }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Chart data and options configuration
      const chartData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 30],
            backgroundColor: 'rgba(0, 155, 255, 0.8)',
          },
        ],
      };
      const chartOptions = {
        // Chart options
      };

      let chartInstance: Chart<'bar' | 'line' | 'pie', unknown, unknown> | null = null;

      switch (panelType) {
        case 'bar':
          chartInstance = new Chart(ctx as any, {
            type: 'bar',
            data: chartData,
            options: chartOptions as any,
          });
          break;
        case 'line':
          chartInstance = new Chart(ctx as any, {
            type: 'line',
            data: chartData,
            options: chartOptions as any,
          });
          break;
        case 'pie':
          chartInstance = new Chart(ctx as any, {
            type: 'pie',
            data: chartData,
            options: chartOptions as any,
          });
          break;
        default:
          break;
      }

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [panelType]);

  return <canvas ref={chartRef} />;
};

export default Graphic;