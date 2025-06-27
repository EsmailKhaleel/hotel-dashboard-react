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

const CabinSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  @media (max-width: 768px) {
    grid-area: cabin;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;

  }
`;

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

  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-700);
    margin: 0;
  }
`;

const CabinImg = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 5.6rem;
    height: 4rem;
    border-radius: 6px;
  }
`;

const GuestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > span:first-child {
    font-weight: 500;
  }

  & > span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    grid-area: guest;
    border-bottom: 1px solid var(--color-grey-300);
    padding-bottom: 1.2rem;
    margin-bottom: 1.6rem;
    border-top: 1px solid var(--color-grey-300);
    padding-top: 1.2rem;
    
    &::before {
      content: 'GUEST';
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.4rem;
      display: block;
    }

    & > span:first-child {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-grey-800);
    }

    & > span:last-child {
      font-size: 1rem;
      color: var(--color-grey-500);
      margin-top: 0.2rem;
    }
    & span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
  }
`;

const DateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > span:first-child {
    font-weight: 500;
  }

  & > span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    grid-area: dates;
    border-bottom: 1px solid var(--color-grey-300);
    padding-bottom: 1.2rem;
    margin-bottom: 1.6rem;
    border-top: 1px solid var(--color-grey-300);
    padding-top: 1.2rem;

    
    &::before {
      content: 'STAY DURATION';
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.4rem;
      display: block;
    }

    & > span:first-child {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-grey-800);
      
    }

    & > span:last-child {
      font-size: 1rem;
      color: var(--color-grey-500);
      margin-top: 0.2rem;
    }
    & span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
  }
`;

const CheckInSection = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-area: checkin;
    
    &::before {
      content: 'CHECK-IN';
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.4rem;
      display: block;
    }

    & > span {
      font-size: 1.4rem;
      color: var(--color-grey-700);
      font-weight: 500;
    }
  }
`;

const CheckOutSection = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-area: checkout;
    
    &::before {
      content: 'CHECK-OUT';
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.4rem;
      display: block;
    }

    & > span {
      font-size: 1.4rem;
      color: var(--color-grey-700);
      font-weight: 500;
    }
  }
`;

const StatusSection = styled.div`
  @media (max-width: 768px) {
    grid-area: status;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    justify-self: end;
  }
`;

const AmountSection = styled.div`
  font-family: "Sono";
  font-weight: 500;

  @media (max-width: 768px) {
    grid-area: amount;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-grey-800);
    align-self: center;
  }
`;

const MenuSection = styled.div`
  @media (max-width: 768px) {
    grid-area: menu;
    justify-self: end;
    align-self: center;
  }
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
    cabinId: { name: cabinName, image },
  },
}) {

  const navigate = useNavigate();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckout();
  const { mutate: deleteBooking, isPending: isDeleting } = useDelete();

  const statusToTagName = {
    unconfirmed: "yellow",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Modal>
        <CabinSection>
          <CabinImg src={image} alt={`${cabinName} cabin`} />
          <Cabin>{cabinName}</Cabin>
        </CabinSection>

        <GuestSection>
          <span>{guestName}</span>
          <span>{email}</span>
        </GuestSection>

        <DateSection>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night{numNights !== 1 ? 's' : ''}
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </DateSection>

        <CheckInSection>
          <span>{format(new Date(startDate), "MMM dd, yyyy")}</span>
        </CheckInSection>

        <CheckOutSection>
          <span>{format(new Date(endDate), "MMM dd, yyyy")}</span>
        </CheckOutSection>

        <StatusSection>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </StatusSection>

        <AmountSection>
          {formatCurrency(totalPrice)}
        </AmountSection>

        <MenuSection>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiEye style={{ color: "var(--color-blue-700)" }} />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See details
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquareStack style={{ color: "var(--color-green-700)" }} />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  hasLoading={true}
                  icon={
                    isCheckingOut ? (
                      <SpinnerMini />
                    ) : (
                      <HiArrowUpOnSquareStack style={{ color: "var(--color-yellow-700)" }} />
                    )
                  }
                  onClick={() => checkOut(bookingId)}
                >
                  Check out
                </Menus.Button>
              )}
              <Modal.Open opens="delete">
                <Menus.Button
                  hasLoading={true}
                  icon={
                    isDeleting ? (
                      <SpinnerMini />
                    ) : (
                      <HiOutlineTrash style={{ color: "var(--color-red-800)" }} />
                    )
                  }
                >
                  Delete booking
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </MenuSection>

        <Modal.Window name="delete">
          <ConfirmDelete
            disabled={isDeleting}
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            loading={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;