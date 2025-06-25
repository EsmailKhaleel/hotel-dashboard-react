import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useMemo } from "react";

const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = useMemo(() => {
    return subDays(new Date(), numDays).toISOString();
  }, [numDays]);

  const {
    data: { stays } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", `stays-last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  return { confirmedStays: stays, isLoading, error, numDays };
};

export default useRecentStays;
