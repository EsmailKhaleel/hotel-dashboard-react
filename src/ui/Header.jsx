import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2.4rem;
    @media screen and (max-width: 768px) {
        padding: 1.2rem 2.4rem;
        justify-content: space-between;
    }
`;
export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  )
}
