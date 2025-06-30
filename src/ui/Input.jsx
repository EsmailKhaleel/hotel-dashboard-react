import styled from "styled-components";

const Input = styled.input`
appearance: none;
-webkit-appearance: none;
    font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm, 4px);
  background-color: var(--color-grey-0);
  box-shadow: none;
  transform: none;
  
  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }

  &[aria-invalid="true"] {
    border-color: var(--color-red-700);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    
  }
`;
export default Input;