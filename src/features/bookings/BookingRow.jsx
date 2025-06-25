import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquareStack, HiArrowUpOnSquareStack, HiEye, HiOutlineTrash } from "react-icons/hi2";
import useCheckout from "./useCheckout";
import useDelete from "./useDelete";
import SpinnerMini from "../../ui/SpinnerMini";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    _id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guestId: { fullName: guestName, email },
    cabinId: { name: cabinName },
  },
}) {

  const navigate = useNavigate();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckout();
  const { mutate: deleteBooking, isPending: isDeleting } = useDelete();

  const statusToTagName = {
    unconfirmed: "yellow",
    "checked-in": "green",
    "checked-out": "silver",
    "pending": "blue",
  };

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>
        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>
        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        <Amount>{formatCurrency(totalPrice)}</Amount>

        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye style={{ color: "var(--color-blue-700)" }} />}
              onClick={() => {
                navigate(`/bookings/${bookingId}`);
              }}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" || status === "pending" && <Menus.Button
              icon={<HiArrowDownOnSquareStack style={{ color: "var(--color-green-700)" }} />}
              onClick={() => {
                navigate(`/checkin/${bookingId}`);
              }}
            >
              Check in
            </Menus.Button>}

            {status === "checked-in" && <Menus.Button
              hasLoading={true}
              icon={
                isCheckingOut ? (<SpinnerMini />) :
                  (<HiArrowUpOnSquareStack style={{ color: "var(--color-yellow-700)" }} />)
              }
              onClick={() => {
                checkOut(bookingId);
              }}
            >
              Check out
            </Menus.Button>}

            <Modal.Open opens="delete">
              <Menus.Button
                hasLoading={true}
                icon={isDeleting ? (<SpinnerMini />) : <HiOutlineTrash style={{ color: "var(--color-red-800)" }} />}
              >
                Delete booking
              </Menus.Button>
            </Modal.Open>

          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeleting}
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            loading={isDeleting}

          />
        </Modal.Window>
      </Modal >
    </Table.Row >
  );
}

export default BookingRow;
