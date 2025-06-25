import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr;
  align-items: center;
  gap: 1.2rem;

  padding: 1rem 1.2rem;
  font-size: 1.4rem;

  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const StyledGuestContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 1rem;
`;

const GuestDetails = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Guest = styled.div`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-width: 10rem;
`;

const BookingId = styled.span`
  font-size: 1.3rem;
  font-family: monospace;
  color: var(--color-grey-600);
`;

const Nights = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

export default function TodayItem({ activity }) {
  const { _id, status, guestId, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <StyledGuestContent>
        <GuestDetails>
          <Flag src={guestId.countryFlag} alt={`Flag of ${guestId.country}`} />
          <Guest>{guestId.fullName}</Guest>
          <BookingId>{_id.substring(0, 6)}</BookingId>
          <Nights>{numNights} night(s)</Nights>
        </GuestDetails>

        {status === "unconfirmed" && (
          <Button $variation="primary" $size="small" as={Link} to={`/checkin/${_id}`} >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <CheckoutButton bookingId={_id}>Check out</CheckoutButton>
        )}
      </StyledGuestContent>
    </StyledTodayItem>
  );
}
