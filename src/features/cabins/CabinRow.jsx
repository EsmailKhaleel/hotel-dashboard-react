import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { useCabinMutation } from "./useCabinMutation";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Menus } from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
// prepare cabin for name and description
const Cabin = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-grey-800);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  line-height: 1.4;
  font-size: 1.4rem;
`;

// canin name and description
const CabinName = styled.div`
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-grey-900);
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
`;


const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
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

        <Cabin>
          <CabinName>{name}</CabinName>
          <CabinDescription>{description}</CabinDescription>
        </Cabin>

        <div>Fits up to {maxCapacity} guests</div>

        <Price>{formatCurrency(regularPrice)}</Price>

        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

        <Actions>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button icon={<HiSquare2Stack />} disabled={isDuplicatePending} onClick={handleDuplicateCabin}>
                  {isDuplicatePending ? "Duplicating..." : "Duplicate"}
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>


                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
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
      </TableRow>
    </>
  );
};

export default CabinRow;