import styled from "styled-components";

export const Flag = styled.img`
  max-width: 4rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-200);

  @media (max-width: 600px) {
    max-width: 3rem;
  }
`;
