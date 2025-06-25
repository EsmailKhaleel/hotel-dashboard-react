import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid var(--color-grey-200);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const P = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
    color: var(--color-grey-800);
  }

  & div {
    font-size: 1.3rem;
    color: var(--color-grey-500);
  }
`;

const PageInfo = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  & span {
    font-weight: 600;
    color: var(--color-grey-800);
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? "var(--color-brand-50)" : "var(--color-grey-700)")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  
  if (count === 0) return null;

  const totalPages = Math.ceil(count / 10);

  function nextPage() {
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        Showing{" "}
        <span>
          {count >= 10
            ? count > currentPage * 10
              ? `${1 + (currentPage - 1) * 10}-${currentPage * 10}`
              : `${1 + (currentPage - 1) * 10}-${count}`
            : `1-${count}`}
        </span>{" "}
        of <span>{count}</span> results.
      </P>
      <PageInfo>
        Page <span>{currentPage}</span> of <span>{totalPages}</span>
      </PageInfo>

      <Buttons>
        <PaginationButton disabled={currentPage === 1} onClick={prevPage}>
          <HiArrowLeftCircle />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton disabled={currentPage === totalPages} onClick={nextPage}>
          <span>Next</span>
          <HiArrowRightCircle />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
