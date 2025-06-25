import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import BottonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
    const { mutate: logout, isPending } = useLogout();
    
    return (
        <BottonIcon onClick={logout} disabled={isPending}>
            {isPending ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
        </BottonIcon>
    )
}
