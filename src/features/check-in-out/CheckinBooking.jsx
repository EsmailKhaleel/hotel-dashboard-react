import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useGetBooking from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "../bookings/useCheckin";
import ErrorFallback from "../../ui/ErrorFallback";
import useSettings from "../settings/useSettings";
import { HiCheckBadge } from "react-icons/hi2";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.4rem 2rem;
`;

function CheckinBooking() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { bookingId: id } = useParams();
  const moveBack = useMoveBack();
  const { data: booking = {}, isPending: isFetchingBooking, error } = useGetBooking({ id });
  const { mutate: checkin, isPending: isCheckingIn } = useCheckin();
  const { data: settings = {}, isPending: isLoadingSettings } = useSettings();

  useEffect(function () {
    setIsConfirmed(booking.isPaid);
  }, [booking]);


  const {
    _id: bookingId,
    guestId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!isConfirmed) return;
    if (addBreakfast) {
      checkin({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      });
      return;
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isFetchingBooking || isLoadingSettings) return <Spinner />;

  if (error) return <ErrorFallback error={error} />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <CheckBox
          id="breakfast"
          checked={addBreakfast}
          onChange={(e) => setAddBreakfast(e.target.checked)}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </CheckBox>
      </Box>}
      <Box>
        <CheckBox
          id="confirm"
          checked={isConfirmed || isCheckingIn}
          onChange={(e) => setIsConfirmed(e.target.checked)}
          disabled={isConfirmed}
        >
          I confirm that {guestId.fullName} has paid the total amount of &nbsp;
          {formatCurrency(totalPrice + (addBreakfast ? optionalBreakfastPrice : 0))}
          {(addBreakfast && (
            <> &nbsp;({formatCurrency(totalPrice)} + {formatCurrency(optionalBreakfastPrice)})</>
          ))}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!isConfirmed || isCheckingIn}
          $variation="primary"
        >
          <HiCheckBadge />&nbsp;Confirm Check In
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
