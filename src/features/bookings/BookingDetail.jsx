import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useNavigate } from "react-router-dom";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useGetBooking from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";
import { HiArrowDownOnSquare, HiArrowUpOnSquareStack } from "react-icons/hi2";
import useCheckout from "./useCheckout";
import SpinnerMini from "../../ui/SpinnerMini";
import useDelete from "./useDelete";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const Id = styled.div`
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 500;
`;

function BookingDetail() {
  const { bookingId: id } = useParams();
  const navigate = useNavigate();

  const { data: booking, isPending: isFetchingBookig, error } = useGetBooking({ id });
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckout();
  const { mutate: deleteBooking, isPending: isDeleting } = useDelete();

  const status = booking?.status;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "yellow",
    "checked-in": "green",
    "checked-out": "silver"
  };

  if (isFetchingBookig) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;
  if (error) return <ErrorFallback error={error} />;
  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking</Heading>
            <Id>#{id}</Id>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === "unconfirmed" && <Button
            $variation="primary"
            onClick={() => {
              navigate(`/checkin/${id}`);
            }}><HiArrowDownOnSquare />&nbsp;Check in
          </Button>}
          {status === "checked-in" && <Button
            $variation="primary"
            onClick={() => {
              checkOut(id, {
                onSuccess: () => navigate(-1),
              });
            }}>
            {isCheckingOut ? (<SpinnerMini />) :
              (<HiArrowUpOnSquareStack />)
            }
            &nbsp;Check out
          </Button>}
          <Modal.Open opens="delete">
            <Button
              $variation="danger"
            >
              {isDeleting ? (<SpinnerMini />) : "Delete"}
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="booking"
              onConfirm={() => deleteBooking(id, { onSuccess: () => navigate(-1) })}
              loading={isDeleting}
            />
          </Modal.Window>

          <Button $variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
