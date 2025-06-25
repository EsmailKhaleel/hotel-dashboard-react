import styled from "styled-components";
import useRecentStays from "./useRecentStays.js";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner.jsx";
import ErrorFallback from "../../ui/ErrorFallback.jsx";
import Stats from "./Stats.jsx";
import useCabins from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


export default function DashboardLayout() {
  const { confirmedStays, isLoading: isLoadingStays, error: errorFetchingStays, numDays } = useRecentStays();
  const { bookings, isLoading: isLoadingBookings, error: errorFetchingBookings } = useRecentBookings();
  const { data: cabins, isLoading: isLoadingCabins, error: errorFetchingCabins } = useCabins();

  if (isLoadingStays || isLoadingBookings || isLoadingCabins) {
    return <Spinner />;
  }
  if (errorFetchingStays || errorFetchingBookings) {
    return <ErrorFallback
      error={errorFetchingStays || errorFetchingBookings || errorFetchingCabins}
    />;
  }
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <DurationChart confirmedStays={confirmedStays} />
      <TodayActivity />
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}
