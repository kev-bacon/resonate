import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import React from 'react';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const options = {
  scales: {
    r: {
      beginAtZero: true,
    },
  },
};

interface SpiderGraphProps {
  data: number[];
}

const SpiderGraph: React.FC<SpiderGraphProps> = ({ data }) => {
  console.log('SpiderGraph data:', data);  // Log the data received by the component
  const chartData = {
    labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Disgust', 'Neutral'],
    datasets: [
      {
        label: 'Emotions',
        data: data,
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default SpiderGraph;
