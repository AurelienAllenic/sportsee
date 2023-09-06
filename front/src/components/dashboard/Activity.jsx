import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiService from './apiService';


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

const renderCustomAxisTick = ({ x, y, payload }) => {
  let path = '';

  switch (payload.value) {
    case 'Page A':
      path = 'M899.072 99.328q9.216 13.312 17.92 48.128t16.384 81.92 13.824 100.352 11.264 102.912 9.216 90.112 6.144 60.928q4.096 30.72 7.168 70.656t5.632 79.872 4.096 75.264 2.56 56.832q-13.312 16.384-30.208 25.6t-34.304 11.264-34.304-2.56-30.208-16.896q-1.024-10.24-3.584-33.28t-6.144-53.76-8.192-66.56-8.704-71.68q-11.264-83.968-23.552-184.32-7.168 37.888-11.264 74.752-4.096 31.744-6.656 66.56t-0.512 62.464q1.024 18.432 3.072 29.184t4.608 19.968 5.12 21.504 5.12 34.304 5.12 56.832 4.608 90.112q-11.264 24.576-50.688 42.496t-88.576 29.696-97.28 16.896-74.752 5.12q-18.432 0-46.08-2.56t-60.416-7.168-66.048-12.288-61.952-17.92-49.664-24.064-28.16-30.208q2.048-55.296 5.12-90.112t5.632-56.832 5.12-34.304 5.12-21.504 4.096-19.968 3.584-29.184q2.048-27.648-0.512-62.464t-6.656-66.56q-4.096-36.864-11.264-74.752-13.312 100.352-24.576 184.32-5.12 35.84-9.216 71.68t-8.192 66.56-6.656 53.76-2.56 33.28q-13.312 12.288-30.208 16.896t-34.304 2.56-33.792-11.264-29.696-25.6q0-21.504 2.048-56.832t4.096-75.264 5.632-79.872 6.656-70.656q2.048-20.48 6.144-60.928t9.728-90.112 11.776-102.912 13.824-100.352 16.384-81.92 17.92-48.128q20.48-12.288 56.32-25.6t73.216-26.624 71.168-25.088 50.176-22.016q10.24 13.312 16.896 61.44t13.312 115.712 15.36 146.432 23.04 153.6l38.912-334.848-29.696-25.6 43.008-54.272 15.36 2.048 15.36-2.048 43.008 54.272-29.696 25.6 38.912 334.848q14.336-74.752 23.04-153.6t15.36-146.432 13.312-115.712 16.896-61.44q16.384 10.24 50.176 22.016t71.168 25.088 73.216 26.624 56.32 25.6';
      break;
    case 'Page B':
      path = 'M662.528 451.584q10.24 5.12 30.208 16.384t46.08 31.744 57.856 52.736 65.024 80.896 67.072 115.2 64.512 154.624q-15.36 9.216-31.232 21.504t-31.232 22.016-31.744 15.36-32.768 2.56q-44.032-9.216-78.336-8.192t-62.976 7.68-53.248 16.896-47.616 19.968-46.08 16.384-49.664 6.656q-57.344-1.024-110.592-16.896t-101.376-32.256-89.6-25.088-75.264 4.608q-20.48 8.192-41.984 1.024t-38.912-18.432q-20.48-13.312-39.936-33.792 37.888-116.736 86.016-199.68t92.672-136.704 78.848-81.408 43.52-33.792q9.216-5.12 10.24-25.088t-1.024-40.448q-3.072-24.576-9.216-54.272l-150.528-302.08 180.224-29.696q27.648 52.224 53.76 79.36t50.176 36.864 45.568 5.12 39.936-17.92q43.008-30.72 80.896-103.424l181.248 29.696q-20.48 48.128-45.056 99.328-20.48 44.032-47.616 97.28t-57.856 105.472q-12.288 34.816-13.824 57.344t1.536 36.864q4.096 16.384 12.288 25.6z';
      break;
    default:
      path = '';
  }


  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={20} dy={16} textAnchor="middle" fill="#666">
        {payload.value}
      </text>
    </g>
  );
};

const Activity = ({ userId }) => {
  const [infos, setInfos] = useState([]);
  const [weightState, setWeight] = useState({});
  const [burnedCaloriesState, setBurnedCalories] = useState({});

  const minWeight = Math.min(...infos.map(data => data.weight));
  const maxWeight = Math.max(...infos.map(data => data.weight));
  const uniqueValues = Array.from({ length: maxWeight - minWeight + 1 }, (_, index) => minWeight + index);
  
  useEffect(() => {
    ApiService.getUserActivity(userId)
      .then(({ weight, burnedCalories, days }) => {
        const data = days.map((day, index) => ({
          name: `${index + 1}`,
          weight: weight[index],
          burnedCalories: burnedCalories[index],
          day: day
        }));
        setInfos(data);
        setWeight(data.weight)
        setBurnedCalories(data.burnedCalories)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    <ResponsiveContainer className='responsiveContainer_activity' width='100%' height='100%' aspect={6 / 1}>
  <div className="chart-container">
    <h2 className='chart-title'>Activité quotidienne</h2>

    {infos && infos.length > 0 ? (
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
<BarChart
  width={1110}
  height={300}
  data={infos}
  barSize={20}
  margin={{ top: 70, right: 20, left: 20, bottom: 10 }}
  domain={[weightState - 1, maxWeight + 1]}
  barStyle={{ opacity: 1 }}
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
  tick={(props) => (
    <text {...props} style={{ opacity: 0.6, fontWeight: 500, fontSize: 17 }}>
      {props.payload.value}
    </text>
  )}
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
      ) : (
      <p>Loading...</p>
    )}
  </div>
  </ResponsiveContainer>
);
};

export default Activity;

