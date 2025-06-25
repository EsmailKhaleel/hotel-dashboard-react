import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    // 1. Filter
    const filterValue = searchParams.get("status");
    const filter = {
        field: "status",
        value: !filterValue || filterValue === "all" ? null : filterValue
    };
    // 2. Sort
    const sortBy = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortBy.split("-");
    const sortQuery = {
        field: field,
        direction: direction
    }
    // 3. Pagination
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    //  Query
    const qureyResponse = useQuery({
        queryKey: ["bookings", filter, sortQuery, page],
        queryFn: () => getBookings({ filter, sortQuery, page }),
        staleTime: 0,
    });

    const { data: { total } = {} } = qureyResponse;

    const pageCount = Math.ceil(total / 10);

    // Prefetch NEXT page
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortQuery, page + 1],
            queryFn: () => getBookings({ filter, sortQuery, page: page + 1 }),
        });
    }

    // Prefetch PREVIOUS page
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortQuery, page - 1],
            queryFn: () => getBookings({ filter, sortQuery, page: page - 1 }),
        });
    }


    return qureyResponse;
}
