import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";
import ErrorFallback from "../../ui/ErrorFallback";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  const { data: { bookings, total, totalPages } = {}, isPending: isFetching, error: errorFetching } = useBookings();

  if (isFetching) {
    return <Spinner />;
  }

  if (errorFetching) {
    return <ErrorFallback error={errorFetching} />;
  }

  return (
    <Menus>
      <Table columns="1fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={total} totalPages={totalPages} />
        </Table.Footer>

      </Table>
    </Menus>
  );
}

export default BookingTable;
