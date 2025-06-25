import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings , confirmedStays, numDays, cabinCount }) {

    const numBookings = bookings.length;

    const checkins = confirmedStays.length;

    const sales = bookings.reduce((total, booking) =>
        total + booking.totalPrice, 0);
    // num of check-ins nights / all avialable nights (num of days * num of cabins)
    const occupation = confirmedStays.reduce((total, stay) =>
        total + stay.numNights
        , 0);
    const totalNights = numDays * cabinCount;
    const occupationPercentage = totalNights > 0 ?
        (occupation / totalNights) * 100
        : 0;

    return (
        <>
            <Stat
                title="Bookings"
                color={"blue"}
                value={numBookings}
                icon={<HiOutlineBriefcase />}
            />
            <Stat
                title="Sales"
                color={"green"}
                value={formatCurrency(sales)}
                icon={<HiOutlineBanknotes />}
            />
            <Stat
                title="Check-ins"
                color={"indigo"}
                value={checkins}
                icon={<HiOutlineCalendarDays />}
            />
            <Stat
                title="Occupancy Rate"
                color={"yellow"}
                value={`${occupationPercentage.toFixed(2)}%`}
                icon={<HiOutlineChartBar />}
            />

        </>
    )
}
