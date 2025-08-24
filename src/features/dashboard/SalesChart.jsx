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
  @media (max-width: 600px) {
    padding: 12px;
  }
  `;
const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-grey-200);
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;
const ChartTitle = styled(Heading)`
  margin: 0;
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;
const DateLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-grey-500);

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;


const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
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
    @media (max-width: 600px) {
    padding: 8px;
    gap: 12px;
  }
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  
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

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.color};
  margin-bottom: 4px;
    @media (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 0;
  }
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: var(--color-grey-700);;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
    @media (max-width: 600px) {
    font-size: 12px;
  }
`;
export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const isMobile = window.innerWidth <= 600;
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
        if (!booking.createdAt) return total;
        const bookingDate = new Date(booking.createdAt);
        if (isNaN(bookingDate)) return total;
        if (isSameDay(bookingDate, date)) {
          return total + (booking.totalPrice || 0);
        }
        return total;
      }, 0) + bookings.reduce((total, booking) => {
        if (!booking.created_at) return total;
        const bookingDate = new Date(booking.created_at);
        if (isNaN(bookingDate)) return total;
        if (isSameDay(bookingDate, date)) {
          return total + (booking.totalPrice || 0);
        }
        return total;
      }, 0),
      extrasSales: bookings.reduce((total, booking) => {
        if (!booking.createdAt) return total;
        const bookingDate = new Date(booking.createdAt);
        if (isNaN(bookingDate)) return total;
        if (isSameDay(bookingDate, date)) {
          return total + (booking.extrasPrice || 0);
        }
        return total;
      }, 0) +  bookings.reduce((total, booking) => {
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
        <ChartTitle as="h2">Sales Overview</ChartTitle>
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

      <ResponsiveContainer
        width="100%"
        height={isMobile ? 250 : 400}
      >
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{
              fill: colors.text,
              fontSize: isMobile ? 10 : 12,
            }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{
              fill: colors.text,
              fontSize: isMobile ? 10 : 12,
            }}
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
