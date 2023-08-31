import React, { useEffect, useState, useRef} from 'react';
import ApiService from './apiService';
import { LineChart, XAxis, YAxis, Tooltip, Line, Area, ReferenceLine, ReferenceArea } from 'recharts';

const Average = ({ userId }) => {
  const [infosAverage, setInfosAverage] = useState([]);
  const [infosAverageSessionLength, setInfosAverageSessionLength] = useState([]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 10]);
  const chartRef = useRef(null);
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);
  const [showReferenceLine, setShowReferenceLine] = useState(false);

  const handleMouseEnter = (data, index) => {
    console.log('entre')
    const lineChartElement = document.getElementById('linechart');
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'custom-tooltip-average';
    tooltipElement.style.position = 'absolute';
  
    // Get the coordinates and dimensions of the chart
    const lineChartRect = lineChartElement.getBoundingClientRect();
  
    // Adjust the style of the tooltip element
    tooltipElement.style.top = `${lineChartRect.top}px`;
    tooltipElement.style.left = `${lineChartRect.left}px`;
    tooltipElement.style.width = `${lineChartRect.width}px`;
    tooltipElement.style.height = `${lineChartRect.height}px`;
  
    // Set the tooltip content
    const sessionLength = data.sessionLength;
    tooltipElement.innerHTML = `<span>${sessionLength} min</span>`;
  
    lineChartElement.appendChild(tooltipElement);
    setEndIndex(index);
  setShowReferenceLine(true);
  };
  
  
  
  const handleMouseLeave = () => {
    const lineChartElement = document.getElementById('linechart');
    const tooltipElement = lineChartElement.getElementsByClassName('custom-tooltip-average')[0];
    lineChartElement.removeChild(tooltipElement);
    setEndIndex(null);
  setShowReferenceLine(false);
  };
  

  
  useEffect(() => {
    ApiService.getUserAverageSession(userId)
      .then((res) => {
        const firstData = { day: '', sessionLength: res[0].sessionLength - 1 };
        const lastData = { day: '', sessionLength: res[res.length - 1].sessionLength + 1 };
        const updatedData = [firstData, ...res, lastData];
        setInfosAverage(updatedData);
  
        const infosAverageMap = updatedData.map((item) => item.sessionLength);
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
      <div className="custom-tooltip-average" onMouseEnter={() => handleMouseEnter(payload[0].payload)}>
        <span>{sessionLength} min</span>
      </div>
    );
  }

  return null;
};
  const formatDayTick = (dayNumber) => {
    const daysOfWeek = [' L ', ' M ', ' M ', ' J ', ' V ', ' S ', ' D '];
    if (dayNumber === '') {
      return '';
    }
    return daysOfWeek[dayNumber - 1];
  };
  

  return (
    <>
    <div           onMouseMove={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
      <LineChart
        width={350}
        height={350}
        data={infosAverage}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        style={{ background: 'red', borderRadius: '10px' }}
        id='linechart'
        
      >
        <text x={10} y={10} dx={10} dy={50} style={{ fontSize: '20px', fill: 'white', opacity: 0.8 }}>
          Durée moyenne des <tspan x={10} y={65} dx={10} dy={25}>sessions</tspan>
        </text>
  
        <XAxis
  dataKey="day"
  tickFormatter={formatDayTick}
  axisLine={false}
  tickLine={false}
  tick={{ fill: 'white', opacity: 0.8 }}
  padding={{ left: -30, right: -30 }}
/>

        <YAxis dataKey="sessionLength" hide={true} data={infosAverage} domain={yAxisDomain} scale={'linear'}/>
  
        <Tooltip
  label=""
  content={<CustomTooltipAverage />}
  wrapperStyle={{ background: 'black' }}
  itemStyle={{ color: 'black' }}
  offset={10}
/>
<ReferenceArea
          x1={startIndex}
          x2={endIndex}
          y1={0}
          y2={Math.max(...infosAverageSessionLength)}
          fill="#cccccc"
          fillOpacity={0.5}
        />
  
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth={2.7}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 4, stroke: "white", fill: "white" }}
        />
  
    
  
        <defs>
          <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="lightgray" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
        </defs>
      </LineChart>
      </div>
    </>
  );  
};

export default Average;
