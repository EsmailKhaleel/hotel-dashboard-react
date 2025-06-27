import styled from "styled-components";
import CreateBookingForm from "../features/bookings/CreateBookingForm";

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-grey-800);
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

export default function CreateBooking() {
    return (
        <>
            <Heading>Create New Booking</Heading>
            <CreateBookingForm />
        </>
    );
}