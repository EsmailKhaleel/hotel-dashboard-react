import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";



const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
  overflow: hidden;
`;

const Header = styled.header`
  background: linear-gradient(135deg, var(--color-brand-500), var(--color-brand-600));
  color: var(--color-grey-100);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.6rem;
    font-weight: 600;
  }

  & span {
    font-family: "Sono", monospace;
    font-size: 1.8rem;
  }

  & > p {
    font-size: 1.4rem;
  }

  @media (min-width: 768px) {
    & > p {
      font-size: 1.6rem;
    }
  }
`;

const DateContent = styled.div`
  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 3.2rem 4rem 1.2rem;
  }

  & > * + * {
    margin-top: 2.4rem;
  }
`;


const Guest = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: start;
  align-items: center;
  gap: 0.8rem 1.6rem;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    margin-bottom: 0;
  }

  & img {
    width: 5rem;
    height: auto;
    align-self: start;
  }

  & p {
    margin: 0;
  }

  & p:first-of-type {
    font-weight: 600;
    color: var(--color-grey-800);
  }
`;

const GuestFlagName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${({ $ispaid = false }) =>
    $ispaid ? "hsl(150, 100%, 95%)" : "hsl(48, 100%, 90%)"};
  color: ${({ $ispaid }) =>
    $ispaid ? "hsl(150, 80%, 30%)" : "hsl(48, 80%, 30%)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 1.6rem;
    & p:last-child {
      font-size: 1.2rem;
      align-self: flex-end;
    }
  }
`;

const TotalPrice = styled.div`
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;
const Prices = styled.div`
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 2.4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: center;

  @media (min-width: 768px) {
    text-align: right;
    padding: 1.6rem 4rem;
  }
`;



// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guestId: { fullName: guestName, email, country, countryFlag, nationalID },
    cabinId: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <DateContent>
          {format(new Date(startDate), "EEE, MMM dd yyyy")}
          ({isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </DateContent>
      </Header>

      <Section>
        <Guest>
          <GuestFlagName>
            {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
            <p>
              {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
            </p>
          </GuestFlagName>
          <p>{email}</p>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $ispaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            <TotalPrice>
              {formatCurrency(totalPrice)}
            </TotalPrice>
            <Prices>
              {hasBreakfast &&
                ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                  extrasPrice
                )} breakfast)`}
            </Prices>
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
