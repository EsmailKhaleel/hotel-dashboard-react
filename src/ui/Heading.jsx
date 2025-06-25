import styled, { css } from "styled-components";

const headingStyles = {
  h1: css`
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;

    @media (max-width: 1024px) {
      font-size: 2.4rem;
    }

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  `,
  h2: css`
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0;

    @media (max-width: 1024px) {
      font-size: 2rem;
    }

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  `,
  h3: css`
    font-size: 1.75rem;
    font-weight: 500;
    line-height: 1.4;
    margin: 0;

    @media (max-width: 1024px) {
      font-size: 1.5rem;
    }

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  `,
};

const Heading = styled.h1.attrs(props => ({
  as: props.as || "h1", 
}))`
  ${({ as }) => headingStyles[as] || headingStyles.h1}
  color: var(--color-grey-800);
  margin: 0;
  padding: 0;
`;

export default Heading;
