import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  padding: 3rem 0 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    flex-direction: row;
    justify-content: flex-end;
    gap: 1.2rem;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--color-grey-700);
`;

const Error = styled.span`
  font-size: 1.3rem;
  color: var(--color-red-700);
`;

export default function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
