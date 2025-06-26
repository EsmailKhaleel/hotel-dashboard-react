import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-100);
  /* background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat; */
  padding: 2rem;

  .login-box {
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 3.2rem;
    max-width: 48rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    backdrop-filter: blur(1rem);
    h1 {
      font-size: 2.4rem;
      font-weight: 600;
      color: var(--color-grey-800);
      text-align: center;
    }
    h3 {
      font-size: 1.6rem;
      font-weight: 500;
      color: var(--color-grey-800);
      text-align: center;
    }
  }
`;

function Login() {
  return (
    <LoginLayout>
      <div className="login-box">
        <Logo />
        <Heading>Login to your account</Heading>
        <Heading style={{ color: "var(--color-red-700)" }} as="h3">Only Admins and Employees are allowed</Heading>
        <LoginForm />
      </div>
    </LoginLayout>
  );
}

export default Login;
