import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styles from "./statistics.module.css";

const Statistics = ({ data }) => {
  
    if(data){

      console.log(data)
    }
  
  return (
    <div className={styles.statisticsContainer}>
      <h2 className={styles.title}>Statistics</h2>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%" className={styles.responsiveContainer}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#5B6270", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#5B6270", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="tasks"
              radius={[6, 6, 0, 0]}
              fill="#2563EB"
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.bottomBox} />
    </div>
  );
};

export default Statistics;