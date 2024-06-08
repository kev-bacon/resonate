import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Disgust'],
  datasets: [
    {
      label: 'Emotions',
      data: [65, 59, 90, 81, 56, 55],
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    r: { beginAtZero: true },
  },
};

const SpiderGraph: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
};

export default SpiderGraph;
