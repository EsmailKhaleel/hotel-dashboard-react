import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import Heading from "../../ui/Heading";
import useDarkMode from "../../context/useDarkMode";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { GrMoney } from "react-icons/gr";
import { BsDatabaseFillAdd } from "react-icons/bs";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }    
  `;
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-grey-200);
`;

const DateLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-grey-500);
`;


const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 20px;
  margin-bottom: 24px;
`;

const MetricCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: var( --color-grey-0);
  border: 1px solid var(--color-grey-200);
  backdrop-filter: blur(10px);
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ModernIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color}15;
  border: 1px solid ${props => props.color}30;
  flex-shrink: 0;

  & svg {
    width: 24px;
    height: 24px;
    color: ${props => props.color};
  }
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.color};
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: var(--color-grey-700);;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const chartData = allDates.map(date => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings.reduce((total, booking) => {
        if (!booking.created_at) return total;
        const bookingDate = new Date(booking.created_at);
        if (isNaN(bookingDate)) return total;
        if (isSameDay(bookingDate, date)) {
          return total + (booking.totalPrice || 0);
        }
        return total;
      }, 0),
      extrasSales: bookings.reduce((total, booking) => {
        if (!booking.created_at) return total;
        const bookingDate = new Date(booking.created_at);
        if (isNaN(bookingDate)) return total;
        if (isSameDay(bookingDate, date)) {
          return total + (booking.extrasPrice || 0);
        }
        return total;
      }, 0),
    }
  });
  const totalRevenue = chartData.reduce((sum, day) => sum + day.totalSales, 0);
  const totalExtras = chartData.reduce((sum, day) => sum + day.extrasSales, 0);

  return (
    <StyledSalesChart>

      <ChartHeader>
        <Heading as="h2" style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>
          Sales Overview
        </Heading>
        <DateLabel>
          {format(allDates[0], "MMM dd")} - {format(allDates[allDates.length - 1], "MMM dd, yyyy")}
        </DateLabel>
      </ChartHeader>

      <MetricsGrid>
        <MetricCard>
          <ModernIcon color={colors.totalSales.stroke}>
            <GrMoney />
          </ModernIcon>
          <MetricContent>
            <MetricValue color={colors.totalSales.stroke}>
              ${totalRevenue.toLocaleString()}
            </MetricValue>
            <MetricLabel>Total Revenue</MetricLabel>
          </MetricContent>
        </MetricCard>
        <MetricCard>
          <ModernIcon color={colors.extrasSales.stroke}>
            <BsDatabaseFillAdd />
          </ModernIcon>
          <MetricContent>
            <MetricValue color={colors.extrasSales.stroke}>
              ${totalExtras.toLocaleString()}
            </MetricValue>
            <MetricLabel>Extras Revenue</MetricLabel>
          </MetricContent>
        </MetricCard>
      </MetricsGrid>

      <ResponsiveContainer height={300} minWidth={600}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background, color: colors.text }}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            name="Total Sales"
            strokeWidth={2}
            unit={"$"}
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name="Extras Sales"
            strokeWidth={2}
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>

    </StyledSalesChart>
  )
}

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 20 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 100 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 150 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 50 },
//   { label: "Jan 13", totalSales: 700, extrasSales: 150 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 150 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 200 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 200 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 100 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 200 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 50 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 250 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 100 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 200 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 300 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 200 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 100 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 300 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 200 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

