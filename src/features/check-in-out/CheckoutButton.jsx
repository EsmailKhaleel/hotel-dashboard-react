import Button from "../../ui/Button";
import useCheckout from "../bookings/useCheckout";

function CheckoutButton({ bookingId }) {
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckout();
  return (
    <Button
      $variation="danger"
      $size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
