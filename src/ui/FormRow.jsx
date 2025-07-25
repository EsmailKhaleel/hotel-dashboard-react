import styled from "styled-components";


const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 1.2rem 0 0 0;
  }
`;

const Label = styled.label`
  font-weight: 500;
    @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
    @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
export const FormRow = ({ label, error, children }) => {

    return (
        <StyledFormRow>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <Error>{error}</Error>}
        </StyledFormRow>
    )
}
