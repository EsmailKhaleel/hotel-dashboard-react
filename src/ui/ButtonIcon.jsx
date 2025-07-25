import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export default ButtonIcon;
