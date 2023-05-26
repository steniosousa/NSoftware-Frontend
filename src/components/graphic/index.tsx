import React, { useEffect, useRef } from 'react';
import {Chart, ChartTypeRegistry } from 'chart.js/auto';

interface GraphicProps {
  panelType: string;
}

const Graphic: React.FC<GraphicProps> = ({ panelType }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Configuração dos dados e opções do gráfico
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
        // Opções do gráfico
      };

      switch (panelType) {
        case 'bar':
          new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
          } as ChartTypeRegistry['chart']);
          break;
        case 'line':
          new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions,
          } as ChartTypeRegistry['chart']);
          break;
        case 'pie':
          new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: chartOptions,
          } as ChartTypeRegistry['chart']);
          break;
        default:
          break;
      }
    }
  }, [panelType]);

  return <canvas ref={chartRef} />;
};

export default Graphic;
