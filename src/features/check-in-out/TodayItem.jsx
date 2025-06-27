import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 7.5rem 4rem 10rem repeat(2, 7rem) 10rem;
  align-items: center;
  gap: 1.2rem;

  padding: 1rem 0rem;
  font-size: 1.4rem;

  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-50);
  }

  @media (max-width: 768px) {
    grid-template-columns: 6rem repeat(3, 1fr) 8rem;
    gap: 0.8rem;
    font-size: 1.3rem;
    
    & .booking-id {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 4rem 1fr 8.5rem;
    gap: 0.6rem;
    padding: 0.8rem 0.5rem;
    font-size: 1.2rem;
    
    & > :first-child {
      display: none;
    }
    & .booking-id {
      display: none;
    }
    & .nights {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.3rem;
    font-size: 1.1rem;
  }
`;

const StyledTag = styled(Tag)`
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.5rem 0.9rem;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
  }
`;

const MobileInfo = styled.div`
  display: none;
  
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
`;

const Guest = styled.div`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-width: 10rem;

  @media (max-width: 768px) {
    max-width: 8rem;
    font-size: 1.3rem;
  }

  @media (max-width: 600px) {
    max-width: none;
    font-size: 1.2rem;
    font-weight: 600;
  }

`;

const BookingId = styled.span`
  font-size: 1.3rem;
  font-family: monospace;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Nights = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MobileNights = styled.span`
  font-size: 1rem;
  color: var(--color-grey-600);
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const MobileBookingId = styled.span`
  font-size: 1rem;
  font-family: monospace;
  color: var(--color-grey-500);
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 0.5rem 0.8rem;
  }

`;


export default function TodayItem({ activity }) {
  const { _id, status, guestId, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <StyledTag type="green">Arriving</StyledTag>}
      {status === "checked-in" && <StyledTag type="blue">Departing</StyledTag>}

      <Flag src={guestId.countryFlag} alt={`Flag of ${guestId.country}`} />
      
      <div>
        <Guest>{guestId.fullName}</Guest>
        <MobileInfo>
          <MobileNights>{numNights} night{numNights !== 1 ? 's' : ''}</MobileNights>
          <MobileBookingId>#{_id.substring(0, 6)}</MobileBookingId>
        </MobileInfo>
      </div>
      
      <BookingId className="booking-id">{_id.substring(0, 6)}</BookingId>
      <Nights className="nights">{numNights} night(s)</Nights>

        {status === "unconfirmed" && (
          <StyledButton $variation="primary" $size="small" as={Link} to={`/checkin/${_id}`}>
            Check in
          </StyledButton>
        )}
        {status === "checked-in" && (
          <CheckoutButton bookingId={_id}>Check out</CheckoutButton>
        )}
    </StyledTodayItem>
  );
}