import styled from "styled-components";
import { BiError } from "react-icons/bi";
import Heading from "./Heading";
import Logo from "./Logo";

const StyledErrorFallback = styled.main`
  background-color: var(--color-grey-50);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem 4.8rem;
  flex: 0 1 48rem;
  text-align: center;

  & h1 {
    color: var(--color-red-600);
    margin-bottom: 1rem;
  }

  & p {
    font-family: "Sono";
    font-size: 1rem;
    color: var(--color-grey-500);
    margin-bottom: 2.4rem;
  }
`;
const ErrorButton = styled.button`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-red-700);
  background-color: var(--color-red-700);
  color: var(--color-grey-0);
  cursor: pointer;

  &:hover {
    background-color: var(--color-red-800);
    border-color: var(--color-red-800);
  }

  &:active {
    background-color: var(--color-red-800);
    border-color: var(--color-red-800);
  }

  &:focus {
    outline: 2px solid var(--color-red-800);
    outline-offset: 2px;
  }
`;
const ErrorMessage = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-700);
  margin-bottom: 2.4rem;
  line-height: 1.6;
  font-weight: 500;
  font-family: "Sono";
  
`;


function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <StyledErrorFallback>
      <Box>
        <Logo />
        <Heading as="h1">Something went wrong</Heading>
        <BiError size={48} color="var(--color-red-700)" />
        <ErrorMessage>{error?.message || "An unexpected error occurred."}</ErrorMessage>
        <ErrorButton $variation="primary" $size="large" onClick={resetErrorBoundary}>
          Try Again
        </ErrorButton>
      </Box>
    </StyledErrorFallback>
  );
}

export default ErrorFallback;
