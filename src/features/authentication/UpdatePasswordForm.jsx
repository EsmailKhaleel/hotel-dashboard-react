import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUserPassword } from "./useUserMutation";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const {
    mutate: updateUserPassword,
    isPending: isUpdatingPassword,
  } = useUpdateUserPassword();

  const onSubmit = ({ currentPassword, newPassword }) => {
    updateUserPassword({ currentPassword, newPassword }, { onSuccess: reset });
  };
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormRow label="Current Password" error={errors.currentPassword?.message}>
        <Input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          disabled={isUpdatingPassword}
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
      </FormRow>

      <FormRow label="New Password (min 8 characters)" error={errors.newPassword?.message}>
        <Input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          disabled={isUpdatingPassword}
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm New Password" error={errors.passwordConfirm?.message}>
        <Input
          id="passwordConfirm"
          type="password"
          autoComplete="new-password"
          disabled={isUpdatingPassword}
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              getValues().newPassword === value || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => reset()}
          type="reset"
          $variation="secondary"
          disabled={isUpdatingPassword}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingPassword}>
          {isUpdatingPassword ? <SpinnerMini /> : "Update Password"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
