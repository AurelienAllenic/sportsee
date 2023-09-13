import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiService from './apiService';
import {formattedActivity} from './formatData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const weight = payload[0].value;
    const kcal = payload[1].value;
    return (
      <div className="custom-tooltip">
        <span>{weight}kg</span>
        <span>{kcal}kCal</span>
      </div>
    );
  }
  return null;
};



const Activity = ({ userId }) => {
  const [infos, setInfos] = useState([]);
  const [weightState, setWeight] = useState({});
  const [burnedCaloriesState, setBurnedCalories] = useState({});
  const [width, setWidth] = useState(window.innerWidth <= 1600 ? 1000 : 1100);
  const [height, setHeight] = useState(window.innerWidth <= 1600 ? 350 : 350);
  const minWeight = Math.min(...infos.map(data => data.weight));
  const maxWeight = Math.max(...infos.map(data => data.weight));
  const uniqueValues = Array.from({ length: maxWeight - minWeight + 1 }, (_, index) => minWeight + index);
  
  useEffect(() => {
    ApiService.getUserActivity(userId)
      .then((res) => {
        const { weight, burnedCalories, days } = formattedActivity(res);
        const data = days.map((day, index) => ({
          name: `${index + 1}`,
          weight: weight[index],
          burnedCalories: burnedCalories[index],
          day: day
        }));
        setInfos(data);
        setWeight(weight);
        setBurnedCalories(burnedCalories);
      })
      .catch((error) => {
        console.error(error);
      });
  
    const handleResize = () => {
      // Handle resize logic
    };
  
    window.addEventListener('resize', handleResize);
  
    // Nettoyer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userId]);

  const handleResize = () => {
    setWidth(window.innerWidth <= 1600 ? 1000 : 1100);
    setHeight(window.innerWidth <= 1600 ? 300 : 300);
  };

  const renderCustomAxisTick = ({ x, y, payload }) => {
    const index = payload.index;
    const day = infos[index].day;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={5} dy={26} style={{ fontWeight: 500, fontSize: 17, opacity: 0.5}}>
          {day}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer className='responsiveContainer_activity' aspect={6 / 1}>
  <div className="chart-container">
    {infos && infos.length > 0 ? (
    <>
    <h2 className='chart-title'>Activité quotidienne</h2>

    
      <div className='background-chart'>
<Legend
    verticalAlign="top"
    align="right"
    layout="horizontal"

    payload={[
      { value: 'Poids (kg)', type: 'circle', color: '#000000'},
      { value: '', type: 'circle', color: 'transparent', height: 10 },
      { value: 'Calories brûlées (kCal)', type: 'circle', color: '#FF0000'},
    ]}
    margin={{ top: 20, right: 50, left: 50, bottom: 50 }}
    style={{position: 'absolute', zIndex: 11}}
  />
  <div className='container_barchart' style={{ width: width, height: height }}>
      <BarChart
        height={height}
        width={width}
        data={infos}
        barSize={20}
        margin={{ top: 75, right: 20, left: 20, bottom: 10 }}
        domain={[weightState - 1, maxWeight + 1]}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
        <XAxis
          dataKey="day"
          tick={renderCustomAxisTick}
          tickLine={false}
          domain={[infos[0].day, infos[infos.length - 1].day]}
          barCategoryGap={0}
          padding={{ left: -80, right: -80 }}
        />
        <YAxis
          yAxisId="kg"
          orientation="right"
          domain={[minWeight - 1, maxWeight]}
          tickCount={uniqueValues.length + 1}
          interval={0}
          tickLine={false}
          axisLine={false}
          dx={40}
          tickFormatter={(value) => `${value}`} // Utiliser tickFormatter pour afficher les chiffres
        />
        <YAxis yAxisId="weight" domain={[0, 'dataMax + 10']} hide={true}/>
        <Bar yAxisId="kg" radius={[20, 20, 0, 0]} fill="#000000" dataKey="weight" barSize={10} fillOpacity={1} />
        <Bar yAxisId="weight" radius={[20, 20, 0, 0]} fill="#FF0000" dataKey="burnedCalories" barSize={10} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} fillOpacity={1} />
        <Tooltip
          cursor={{ fill: 'rgba(206, 202, 202, 0.417)' }}
          wrapperStyle={{ pointerEvents: 'none' }}
          offset={0}
          content={<CustomTooltip />}
          position={{ x: 'right', y: 'top' }}
          isAnimationActive={false}
        />
      </BarChart>
      </div>
        </div>
        </>
      ) : (
      <p>Erreur lors du chargement du graphique activités, vérfiez votre connexion internet</p>
    )}
  </div>
  </ResponsiveContainer>
);
};

export default Activity;

