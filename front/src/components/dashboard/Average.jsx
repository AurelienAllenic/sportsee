import React, { useEffect, useState, useRef} from 'react';
import ApiService from './apiService';
import { LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

const Average = ({ userId }) => {
  const [infosAverage, setInfosAverage] = useState([]);
  const [infosAverageSessionLength, setInfosAverageSessionLength] = useState([]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 10]);
  const chartRef = useRef(null);

  
  useEffect(() => {
    ApiService.getUserAverageSession(userId)
      .then((res) => {
        setInfosAverage(res);
        console.log(infosAverage);
        const infosAverageMap = res.map((item) => item.sessionLength);
        setInfosAverageSessionLength(infosAverageMap);
        const maxSessionLength = Math.max(...infosAverageMap);
        setYAxisDomain([0, maxSessionLength + maxSessionLength]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const CustomTooltipAverage = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const sessionLength = payload[0].value;

      return (
        <div className="custom-tooltip-average">
          <span>{sessionLength} min</span>
        </div>
      );
    }

    return null;
  };

  const formatDayTick = (dayNumber) => {
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return daysOfWeek[dayNumber - 1];
  };

  return (
    <>
      <div style={{ backgroundColor: 'red', borderRadius: '10px' }}>
        <LineChart width={300} height={310} data={infosAverage} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <text x={10} y={10} dx={10} dy={50} style={{ fontSize: '20px', fill: 'white', opacity: 0.8 }}>
    Durée moyenne des <tspan x={10} y={65} dx={10} dy={25}>sessions</tspan>
  </text>
          <XAxis dataKey="day" tickFormatter={formatDayTick} axisLine={false} tickLine={false} tick={{ fill: 'white', opacity: 0.8  }} />
          <YAxis dataKey="sessionLength" hide={true} data={infosAverage} domain={yAxisDomain} />

          <Tooltip
  label=""
  content={<CustomTooltipAverage />}
  wrapperStyle={{ background: 'black' }}
  itemStyle={{ color: 'black' }}
  offset={10}
  cursor={{
    stroke: "rgba(0, 0, 0, 0.1)",
    strokeWidth: 50,
  }}
/>

          <Line type="monotone" dataKey="sessionLength" stroke="url(#linear-gradient)" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
          <defs>
            <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="lightgray" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
          </defs>
        </LineChart>
      </div>
    </>
  );
};

export default Average;
