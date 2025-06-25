import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

export const AddCabin = () => {

    return (
        <Modal>
            <Modal.Open opens="create-cabin">
                <Button
                    $variation="primary"
                    $size="medium"
                >
                    Add new cabin
                </Button>
            </Modal.Open>
            <Modal.Window name="create-cabin">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    )
}

// export const AddCabin = () => {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <div>
//             <Button
//                 $variation="primary"
//                 $size="medium"
//                 onClick={() => setIsOpenModal(prevState => !prevState)}>
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//                 </Modal>
//             )}
//         </div>
//     )
// }
