import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import { useForm } from "react-hook-form";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiOutlineLogin } from "react-icons/hi";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  border-radius: var(--border-radius-md);
`;

function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "esmailkhaleel27@gmail.com",
      password: "11111111"
    }
  });

  function handleLogin(values) {
    console.log(values);
    login(values, {
      onSuccess: () => {
        reset();
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit(handleLogin)} noValidate>
      <FormContainer>

        <FormRowVertical error={errors.email?.message}>
          <Input
            type="email"
            id="email"
            autoComplete="username"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            })}
          />
        </FormRowVertical>
        <FormRowVertical error={errors.password?.message}>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long"
              }
            })}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button $size="large" disabled={isPending} type="submit">
            <HiOutlineLogin style={{ marginRight: "8px" }} />
            {isPending ? <SpinnerMini /> : "Login"}
          </Button>
        </FormRowVertical>
      </FormContainer>
    </Form>
  );
}

export default LoginForm;
