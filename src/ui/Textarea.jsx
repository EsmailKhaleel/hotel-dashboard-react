import styled from "styled-components";

const Textarea = styled.textarea`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm, 4px);
  background-color: var(--color-grey-0);
  box-shadow: none;
  transform: none;
  resize: vertical;
  min-height: 8rem;
  max-height: 12rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

export default Textarea;
