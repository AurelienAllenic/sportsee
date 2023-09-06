import React, { useEffect, useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Radar,
} from 'recharts';
import ApiService from './apiService';
import { Text } from 'recharts'; // Ajout de l'import pour Text

const Performance = ({ userId }) => {
  const [data, setData] = useState([]);
  const [kind, setKind] = useState({});
  const [fontSize, setFontSize] = useState(window.innerWidth <= 1024 ? 12 : 25); // Initialize font size

  useEffect(() => {
    ApiService.getUserPerformance(userId)
      .then((res) => {
        setData(res.data.data);
        setKind(res.data.kind);
      })
      .catch((error) => {
        console.error(error);
      });

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userId]); // Include userId in the dependency array

  const names = [
    'Cardio',
    'Energie',
    'Endurance',
    'Force',
    'Vitesse',
    'Intensité',
  ];
  
  const radarData = data.map((item, index) => ({
    subject: index < names.length ? names[index] : '',
    value: item.value,
  }));
  
  const reversedRadarData = radarData.slice().reverse();

  const handleResize = () => {
    setFontSize(window.innerWidth <= 1200 ? 14 : 17);
  };

  function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
    return (
      <Text
        {...rest}
        verticalAnchor="middle"
        y={y + (y - cy) / 5.5}
        x={x + (x - cx) / 5.5}
        fontSize='20px'
        fill="white"
        textAnchor="middle"
      >
        {payload.value}
      </Text>
    );
  }

  return (
    <>
      <ResponsiveContainer className='responsiveContainer_performance' width='100%' height='100%' aspect={1/1}>
        <RadarChart
          outerRadius={120}
          data={reversedRadarData}
          style={{ background: 'black', borderRadius: '15px' }}
        >
          <PolarGrid gridType="polygon" radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            domain={['dataMax', 'dataMin']}
            tick={renderPolarAngleAxis}
          />
          <Radar
            data={reversedRadarData}
            dataKey="value"
            fill="red"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Performance;
