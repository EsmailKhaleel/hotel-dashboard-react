import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import {FormRow} from "../../ui/FormRow";
import Input from "../../ui/Input";
import useRegister from "./useRegister";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { mutate: registerUser, isPending: isRegistering } = useRegister();

  function handleRegister(data) {
    registerUser({
      name: data.fullName,
      email: data.email,
      password: data.password
    }, {
      onSuccess: () => {
        reset();
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input type="text" id="fullName" 
        {...register("fullName", { required: "Full name is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input type="email" id="email" 
        {...register("email", { required: "Email is required",
         pattern: {
           value: /\S+@\S+\.\S+/,
           message: "Please enter a valid email address"
         }
         })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password?.message}>
        <Input type="password" id="password" 
        {...register("password", { 
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
          }
        })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" 
        {...register("passwordConfirm", { 
          required: "Please confirm your password",
          validate: (value, formValues) => 
            value === formValues.password || "Passwords do not match"
        })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">{isRegistering ? <SpinnerMini /> : "Create new user"}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
