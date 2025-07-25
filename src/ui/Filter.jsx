import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  @media screen  and (max-width: 600px) {
    width: 100%;
    padding: 0.2rem;
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  position: relative;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
    width: 100%;
    letter-spacing: 1px;
    text-wrap: nowrap;
    padding: 0.4rem 0.2rem;

  }
`;


const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(filter) {
    searchParams.set(filterField, filter);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={searchParams.get(filterField) === option.value}
          disabled={searchParams.get(filterField) === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  )
}

export default Filter
