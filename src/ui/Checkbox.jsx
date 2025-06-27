import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  @media (max-width: 600px) {
    gap: 0.8rem;
    & label {
      gap: 0.4rem;
      font-size: 1.2rem;
    }
  }
`;
const CheckboxLabel = styled.label`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <CheckboxLabel htmlFor={!disabled ? id : ""}>{children}</CheckboxLabel>
    </StyledCheckbox>
  );
}

export default Checkbox;
