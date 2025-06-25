import styled from "styled-components";
import { useMemo } from "react";
import Heading from "../../ui/Heading";
import { 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import useDarkMode from "../../context/useDarkMode";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;
  
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      #ef4444,
      #f97316,
      #eab308,
      #84cc16,
      #22c55e,
      #14b8a6,
      #3b82f6,
      #a855f7
    );
    border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  }

  & > *:first-child {
    margin-bottom: 1.6rem;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ChartStats = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

const StatItem = styled.div`
  text-align: center;
  
  & .value {
    font-weight: 600;
    font-size: 1.6rem;
    color: var(--color-grey-800);
    display: block;
    margin-bottom: 0.2rem;
  }
  
  & .label {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
`;


const startDataLight = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#b91c1c" },
  { duration: "2 nights", value: 0, color: "#c2410c" },
  { duration: "3 nights", value: 0, color: "#a16207" },
  { duration: "4-5 nights", value: 0, color: "#4d7c0f" },
  { duration: "6-7 nights", value: 0, color: "#15803d" },
  { duration: "8-14 nights", value: 0, color: "#0f766e" },
  { duration: "15-21 nights", value: 0, color: "#1d4ed8" },
  { duration: "21+ nights", value: 0, color: "#7e22ce" },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div style={{
        background: 'var(--color-grey-0)',
        border: '1px solid var(--color-grey-200)',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '13px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ 
          margin: 0, 
          fontWeight: '600',
          color: data.color,
          marginBottom: '2px'
        }}>
          {data.duration}
        </p>
        <p style={{ margin: 0, color: 'var(--color-grey-600)' }}>
          {data.value} stays
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend
const CustomLegend = ({ payload }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontSize: '12px',
      paddingLeft: '12px'
    }}>
      {payload.map((entry, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-grey-700)'
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: entry.color
            }}
          />
          <span style={{ fontSize: '11px' }}>{entry.value}</span>
          <span style={{ 
            marginLeft: 'auto', 
            fontWeight: '600',
            color: 'var(--color-grey-800)'
          }}>
            {entry.payload.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);
  
  // Calculate statistics
  const stats = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const avgStay = data.reduce((sum, item) => {
      const nights = item.duration === "1 night" ? 1 :
                   item.duration === "2 nights" ? 2 :
                   item.duration === "3 nights" ? 3 :
                   item.duration === "4-5 nights" ? 4.5 :
                   item.duration === "6-7 nights" ? 6.5 :
                   item.duration === "8-14 nights" ? 11 :
                   item.duration === "15-21 nights" ? 18 : 25;
      return sum + (nights * item.value);
    }, 0) / total;

    return { total, avgStay: avgStay.toFixed(1) };
  }, [data]);

  return (
    <ChartBox>
      <ChartHeader>
        <Heading as="h2">Stay duration summary</Heading>
        <ChartStats>
          <StatItem>
            <span className="value">{stats.total}</span>
            <span className="label">stays</span>
          </StatItem>
          <StatItem>
            <span className="value">{stats.avgStay}</span>
            <span className="label">avg nights</span>
          </StatItem>
        </ChartStats>
      </ChartHeader>
      
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            cx="35%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="var(--color-grey-0)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            verticalAlign="middle"
            align="right"
            layout="vertical"
            wrapperStyle={{
              paddingLeft: '16px',
              fontSize: '12px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}