import styled from "styled-components";

const StyledFormRow = styled.div`

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
display: flex;
flex-direction: column;
gap: 0.8rem;
grid-column: ${props => props.$fullWidth ? '1 / -1' : 'auto'};

`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media (max-width: 600px) {
    font-size: 1rem;
    & svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
`;
const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export default function FormRowVertical({ label, error, children, icon: Icon, fullWidth }) {
  return (
    <StyledFormRow $fullWidth={fullWidth}>
      {label && <Label>
        {Icon && <Icon size={16} />}
        {label}
      </Label>
      }
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
