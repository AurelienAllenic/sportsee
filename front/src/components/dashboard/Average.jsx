import React, { useEffect, useState, useRef} from 'react';
import ApiService from './apiService';
import { LineChart, XAxis, YAxis, Tooltip, Line, Rectangle, ResponsiveContainer } from 'recharts';
import { formattedAverage } from './formatData';

function customMouseMove(e){
  let sessionWrap = document.querySelector('.container_average_sessions');
  if (e.isTooltipActive) {
    let windowWidth = sessionWrap.offsetWidth;
    let mouseXpercent = Math.floor(
      (e.activeCoordinate.x / windowWidth) * 100
    );
    sessionWrap.style.background = `linear-gradient(90deg, rgba(255,0,0, 1) ${mouseXpercent}%, rgba(0,0,0,0.1) ${mouseXpercent}%, rgba(0,0,0,0.1) 100%)`;
    sessionWrap.style.borderRadius = '10px';
  }
  else{
      sessionWrap.style.background ='transparent'
  }
}

function customOnMouseOut(){
  let sessionWrap = document.querySelector('.container_average_sessions');
  sessionWrap.style.background ='transparent'
}

const Average = ({ userId }) => {
  const [infosAverage, setInfosAverage] = useState([]);
  const [infosAverageSessionLength, setInfosAverageSessionLength] = useState([]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 10]);

  useEffect(() => {
    ApiService.getUserAverageSession(userId)
      .then((res) => {
        console.log(res)
        const average = formattedAverage(res);
        console.log(average)
        const firstData = { day: '', sessionLength: average[0].sessionLength - 1 };
        console.log(firstData)
        const lastData = { day: '', sessionLength: average[average.length - 1].sessionLength + 1 };
        const updatedData = [firstData, ...average, lastData];
        setInfosAverage(updatedData);
  
        const infosAverageMap = updatedData.map((item) => item.sessionLength);
        setInfosAverageSessionLength(infosAverageMap);

        const maxSessionLength = Math.max(...infosAverageMap);
        setYAxisDomain([0, maxSessionLength + maxSessionLength]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);
  
  
  const CustomCursor = ({points}) => {
    const X = points[0].x
    const Y = points[0].y
  
    return (
      <Rectangle
        width={1000}
        height={1000}
        x={X}
        y={Y}
        style={{background: 'red', opacity: 0.1}}
      />
    )
  }
  
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
    const daysOfWeek = [' L ', ' M ', ' M ', ' J ', ' V ', ' S ', ' D '];
    if (dayNumber === '') {
      return '';
    }
    return daysOfWeek[dayNumber - 1];
  };
  

  return (
    <>
    <div className='container_average_sessions'>
      <ResponsiveContainer className='responsiveContainer_average ' width='100%' height='100%' aspect={1 / 1}>
            <LineChart
              data={infosAverage}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              style={{ background: 'red', borderRadius: '10px' }}
              id='linechart'
              onMouseMove={(e) => customMouseMove(e)}
              onMouseOut={() => customOnMouseOut()}
            >
              <text x={10} y={10} dx={10} dy={50} style={{ fontSize: '20px', fill: 'white', opacity: 0.8 }}>
                Durée moyenne des <tspan x={10} y={65} dx={10} dy={25}>sessions</tspan>
              </text>
              <XAxis
                dataKey="day"
                tickFormatter={formatDayTick}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'white', opacity: 0.8, margin: 50 }}
                padding={{ left: -40, right: -40 }}
                textAnchor="middle"
              />
              <YAxis dataKey="sessionLength" hide={true} data={infosAverage} domain={yAxisDomain} scale={'linear'}/>
              <Tooltip
                wrapperStyle={{
                background: '#FFF',
                color: '#000',
                width: '75px',
                height: '45px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                outline: 'none',
                }}
                labelStyle={{display: 'none', border: 'none'}}
                content={<CustomTooltipAverage />}
                cursor={<CustomCursor />}
              />
              <Line
                type="monotone"
                dataKey="sessionLength"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth={2.7}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 4, stroke: "white", fill: "white" }}
              />
              {/* Using defs to create a linear gradient */}
              <defs>
                <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="lightgray" />
                  <stop offset="100%" stopColor="black" />
                </linearGradient>
              </defs>
            </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );  
};

export default Average;
