import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    border: none;
    background-color: transparent;
    border-radius: 0;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

@media (max-width: 768px) {
    display: grid;
    grid-template-areas: 
      "cabin cabin status"
      "guest dates dates"
      "checkin checkout checkout"
      "amount . menu";
    grid-template-columns: 1fr 1fr auto;
    grid-template-rows: auto auto auto auto;
    gap: 1.6rem;
    padding: 1.8rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-150);
    border-radius: 12px;
    margin-bottom: 1.4rem;
    position: relative;

    /* Modern card design with subtle accent */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--color-brand-600), var(--color-brand-400));
      border-radius: 12px 12px 0 0;
    }

    /* Subtle hover effect for better interactivity */
    &:hover {
      border-color: var(--color-grey-200);
      transform: translateY(-1px);
      transition: all 0.2s ease;
    }
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  @media (max-width: 768px) {
    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
  @media (max-width: 768px) {
    background-color: transparent;
    margin-top: 1.6rem;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  
  @media (max-width: 768px) {
    margin: 4rem 2rem;
  }
`;

const TableContext = createContext({
  columns: null,
});
export const Table = ({ children, columns }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  )
}

const Header = ({ children }) => {
  const { columns } = useContext(TableContext);

  return <StyledHeader as="header" $columns={columns}>
    {children}
  </StyledHeader>;
}

const Body = ({ data, render }) => {

  if (!data.length) return <Empty>No data to diplay at this time</Empty>;

  return <StyledBody role="tbody">
    {data.map(render)}
  </StyledBody>;
}
const Row = ({ children }) => {
  const { columns } = useContext(TableContext);
  return <StyledRow role="row" $columns={columns}>
    {children}
  </StyledRow>;
}


Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;

