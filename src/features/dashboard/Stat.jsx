import styled from "styled-components";
import Icon from "../../ui/Icon";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
  place-content: center ;
  /* enabele responsive layout */
  @media (max-width: 600px) {
    grid-template-columns: 3.5rem 1fr;
    padding: 1rem;
    column-gap: 1rem;
  }
`;


const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  /* letter-spacing: 0.4px; */
  font-weight: 600;
  color: var(--color-grey-500);
  @media (max-width: 600px) {
    font-size: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;

  }
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
