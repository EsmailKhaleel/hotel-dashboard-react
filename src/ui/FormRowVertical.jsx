import styled from "styled-components";

const StyledFormRow = styled.div`

&:has(button) {
  flex-direction: row;
  justify-content: flex-end;
  gap: 1.2rem;
  border-bottom: none;
  padding-bottom: 0;
}
width: 100%;
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
`;
const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: var(--color-brand-600);
  color: var(--color-grey-50);
`;

export default function FormRowVertical({ label, error, children, icon: Icon, fullWidth }) {
  return (
    <StyledFormRow $fullWidth={fullWidth}>
      {label && <Label>
        {Icon && 
        <IconWrapper>
        <Icon size={16} />
        </IconWrapper>
        }
        {label}
      </Label>
      }
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
