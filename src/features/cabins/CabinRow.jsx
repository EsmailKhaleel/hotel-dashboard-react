import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { useCabinMutation } from "./useCabinMutation";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Menus } from "../../ui/Menus";
import { HiPencil, HiPencilSquare, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useState } from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SpinnerMini from "../../ui/SpinnerMini";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "cabin cabin"
      "capacity capacity"
      "price price"
      "discount discount"
      "img menu";
    gap: 0;
    padding: 2rem 1.6rem;
    border-bottom: 1px solid var(--color-grey-200);
    background: var(--color-grey-0);
    border-radius: 8px;
    margin-bottom: 1.2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const CabinSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 768px) {
    grid-area: cabin;
    gap: 1.2rem;
    margin-bottom: 1.6rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);

  @media (max-width: 768px) {
    grid-area: img;
    width: 8rem;
    height: 5.5rem;
    transform: none;
    border-radius: 6px;
    flex-shrink: 0;
  }
`;

const Cabin = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-grey-800);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  line-height: 1.4;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    flex: 1;
    gap: 0.6rem;
  }
`;

const CabinName = styled.div`
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-grey-900);

  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

const CabinDescription = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 500;
  color: var(--color-grey-600);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  font-size: 1.4rem;
  max-width: 100%;

  @media (max-width: 768px) {
    -webkit-line-clamp: 3;
    font-size: 1.3rem;
    color: var(--color-grey-500);
  }
`;

const CapacitySection = styled.div`
  @media (max-width: 768px) {
    grid-area: capacity;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    
    &::before {
      content: 'CAPACITY';
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.4rem;
      display: block;
    }

    & > div {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--color-grey-700);
    }
  }
`;

const PriceSection = styled.div`
  @media (max-width: 768px) {
    grid-area: price;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    
    &::before {
      content: 'PRICE';
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.4rem;
      display: block;
    }
  }
`;

const DiscountSection = styled.div`
  @media (max-width: 768px) {
    grid-area: discount;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
    
    &::before {
      content: 'DISCOUNT';
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-grey-400);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.4rem;
      display: block;
    }
  }
`;

const MenuSection = styled.div`
  @media (max-width: 768px) {
    grid-area: menu;
    justify-self: end;
    align-self: center;
  }
`;

const EditField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  input {
    font-size: 1.5rem;
    padding: 0.2rem 0.5rem;
    width: 7rem;
    height: 3rem;
    border-radius: 4px;
    border: 1px solid var(--color-grey-300);

    @media (max-width: 768px) {
      font-size: 1.4rem;
      width: 8rem;
    }
  }

  .actions {
    display: flex;
    gap: 0.3rem;

    svg {
      width: 2.2rem;
      height: 2.2rem;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-grey-800);
  }
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-green-700);

  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const CabinRow = ({ cabin }) => {

  const { _id: cabinId, image, name, description, maxCapacity, regularPrice, discount } = cabin;

  const { isPending, mutate: onDeletingCabin } = useDeleteCabin();

  const { isPending: isDuplicatePending, mutate: onDuplicateCabin } = useCabinMutation(false);

  const { isPending: isEditingPending, mutate: onEditCabin } = useCabinMutation(true, cabinId);

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingDiscount, setIsEditingDiscount] = useState(false);
  const [tempPrice, setTempPrice] = useState(regularPrice);
  const [tempDiscount, setTempDiscount] = useState(discount);

  const savePrice = () => {
    if (tempPrice === regularPrice) {
      setIsEditingPrice(false);
      return;
    };
    onEditCabin({
      data: { regularPrice: tempPrice },
      existingImageUrl: image
    }, {
      onSuccess: () => setIsEditingPrice(false)
    });
  };

  const saveDiscount = () => {
    if (tempDiscount === discount) {
      setIsEditingDiscount(false);
      return;
    };
    onEditCabin({
      data: { discount: tempDiscount },
      existingImageUrl: image
    }, {
      onSuccess: () => setIsEditingDiscount(false)
    });
  };
  
  const handleDuplicateCabin = () => {
    const duplicateData = {
      name: `(Copy) ${name}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image
    };
    onDuplicateCabin({ data: duplicateData, existingImageUrl: image });
  }

  return (
    <>
      <TableRow role="row">
          <Img src={image} alt={name} />
        <CabinSection>
          <Cabin>
            <CabinName>{name}</CabinName>
            <CabinDescription>{description}</CabinDescription>
          </Cabin>
        </CabinSection>

        <CapacitySection>
          <div>Fits up to {maxCapacity} guests</div>
        </CapacitySection>

        <PriceSection>
          <Price>
            {isEditingPrice ? (
              <EditField>
                <input
                  type="number"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(Number(e.target.value))}
                />
                <div className="actions">
                  {isEditingPending ?
                    <SpinnerMini />
                    : <CiBookmarkCheck
                      style={{ color: "var(--color-brand-600)" }}
                      onClick={savePrice}
                    />}
                  <IoIosCloseCircleOutline
                    style={{ color: "var(--color-red-700)" }}
                    onClick={() => setIsEditingPrice(false)}
                  />
                </div>
              </EditField>
            ) : (
              <>
                {formatCurrency(regularPrice)}
                <ButtonIcon onClick={() => setIsEditingPrice(true)}>
                  <HiPencilSquare />
                </ButtonIcon>
              </>
            )}
          </Price>
        </PriceSection>

        <DiscountSection>
          {isEditingDiscount ? (
            <EditField>
              <input
                type="number"
                value={tempDiscount}
                onChange={(e) => setTempDiscount(Number(e.target.value))}
              />
              <div className="actions">
                {isEditingPending ? <SpinnerMini /> : <CiBookmarkCheck
                  style={{ color: "var(--color-brand-600)" }}
                  onClick={saveDiscount}
                />}
                <IoIosCloseCircleOutline
                  style={{ color: "var(--color-red-700)" }}
                  onClick={() => setIsEditingDiscount(false)}
                />
              </div>
            </EditField>
          ) : discount ? (
            <Discount>
              {formatCurrency(discount)}
              <ButtonIcon onClick={() => setIsEditingDiscount(true)}>
                <HiPencilSquare />
              </ButtonIcon>
            </Discount>
          ) : (
            <span>&mdash;</span>
          )}
        </DiscountSection>

        <MenuSection>
          <Actions>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={cabinId} />
                <Menus.List id={cabinId}>
                  <Menus.Button icon={<HiSquare2Stack style={{ color: "var(--color-brand-600)" }}/>} disabled={isDuplicatePending} onClick={handleDuplicateCabin}>
                    {isDuplicatePending ? "Duplicating..." : "Duplicate"}
                  </Menus.Button>

                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil style={{ color: "var(--color-silver-700)" }}/>}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash style={{ color: "var(--color-red-700)" }}/>}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>
              </Menus.Menu>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete resourceName="Cabin" onConfirm={() => onDeletingCabin(cabinId)} disabled={isPending} />
              </Modal.Window>

            </Modal>
          </Actions>
        </MenuSection>
      </TableRow>
    </>
  );
};

export default CabinRow;