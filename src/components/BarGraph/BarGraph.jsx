import React, { PureComponent } from "react";
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from "recharts";
import styles from './BarGraph.module.css'

const RoundedBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={10} 
        ry={10} 
        style={{
          clipPath: 'inset(0 0 0 10px)', 
        }}
      />
    );
  };


export default function barGraph({ data }) {


  return (
    <div className={styles.barMain} >
      <h2>Top Expenses</h2>
      <div className={styles.graphwrapper} >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data}>
          <XAxis type="number" axisLine={false} display="none"  tick={false}/>
            <YAxis
              type="category"
              width={125}
              dataKey="name"
              axisLine={false}
            //   tick={false}
            />
            <Bar dataKey="value" fill="#8884d8" barSize={25} shape={<RoundedBar/>}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
