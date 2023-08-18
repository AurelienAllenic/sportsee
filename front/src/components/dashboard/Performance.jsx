import React, { useEffect, useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import ApiService from './apiService';

const Performance = ({ userId }) => {
  const [data, setData] = useState([]);
  const [kind, setKind] = useState({});

  useEffect(() => {
    ApiService.getUserPerformance(userId)
      .then((res) => {
        setData(res.data.data);
        setKind(res.data.kind);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log('DATA', data);
  console.log('KIND', kind);

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

  return (
    <>
   <RadarChart
  outerRadius={90}
  width={350}
  height={350}
  data={reversedRadarData}
  style={{ background: 'black', borderRadius: '15px' }}
>
  <PolarGrid gridType="polygon" radialLines={false} margin={{ top: 20, right: 0, bottom: 20, left: 0 }} />
  <PolarAngleAxis
    dataKey="subject"
    tick={{ fill: 'white' }}
    domain={['dataMax', 'dataMin']}
  />
  <Radar
    data={reversedRadarData}
    dataKey="value"
    fill="red"
    fillOpacity={0.6}
  />
</RadarChart>
    </>
  );
};

export default Performance;
