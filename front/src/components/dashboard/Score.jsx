import React, { useEffect, useState } from 'react';
import ApiService from './apiService';
import { RadialBarChart, RadialBar, Cell, ResponsiveContainer } from 'recharts';

const Score = ({ userId }) => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    ApiService.getScore(userId)
      .then((res) => {
        setScore(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const calculatePercentage = (value) => {
    return Math.floor(value * 100);
  };

  const data = [
    { name: 'Score', value: calculatePercentage(score) * 4},
    { name: 'Remaining', value: 100 - calculatePercentage(score) },
  ];
  const COLORS = ['red', '#FBFBFB'];

  const labelContent = () => {
    return (
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
        {`${calculatePercentage(score)}%`}
        <tspan x="50%" dy="1em">
          de votre objectif
        </tspan>
      </text>
    );
  };

  return (
    <ResponsiveContainer className='responsiveContainer_score' width='100%' height='100%' aspect={1/1}>
    <div style={{  background: '#FBFBFB'}} className='chart-container borderRadius'>
      <RadialBarChart width={350} height={300} cx="50%" cy="50%" innerRadius="80%" outerRadius="100%" data={data} startAngle={90}>
        <text x="10" y="30" fontSize={20} fill="black" textAnchor="start" fontWeight={500}>
          Score
        </text>
        <RadialBar
          dataKey="value"
          fill="red"
          background={{ fill: 'none' }}
          cornerRadius={10}
          label={{ content: labelContent, style: { backgroundColor: 'white' } }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="transparent"
              style={index === 1 ? { display: "none" } : null}
            />
          ))}
        </RadialBar>
      </RadialBarChart>
      <div className='container-score'>
        <span className='container-percentages'>
        {`${calculatePercentage(score)}%`}<br />
        </span>    
        <div className='second-container-score'>
        <span className='container-objectives'>
        de votre</span>
        <span className='end-objectives'>objectif</span>
      </div>
      </div>
    </div>
  </ResponsiveContainer>
  );
};

export default Score;
