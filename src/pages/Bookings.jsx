import styled from "styled-components";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const BookingsHeaderContainer = styled(Row)`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
  
const BookingsHeader = styled(Heading)`
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;
function Bookings() {
  return (
    <>
    <BookingsHeaderContainer $type="horizontal">
      <BookingsHeader as="h1">All bookings</BookingsHeader>
      <BookingTableOperations />
    </BookingsHeaderContainer>
      <BookingTable />
    </>
  );
}

export default Bookings;
