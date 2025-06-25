import styled, { css } from "styled-components";

const Row = styled.div`
  ${({ $type = "horizontal", $justify }) => {
    if ($type === "horizontal") {
      return css`
        display: flex;
        flex-direction: row;
        justify-content: ${$justify || "space-between"};
        align-items: center;
      `;
    }
    if ($type === "vertical") {
      return css`
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
      `;
    }
  }}
`;

export default Row;
