import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiOutlineMenu } from "react-icons/hi";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media (max-width: 768px) {
    padding: 2rem 0rem;
    width: 100%;
    align-items: center;
  }

`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  )
}
