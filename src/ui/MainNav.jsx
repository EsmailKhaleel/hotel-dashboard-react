import { HiOutlineCalendarDays, HiOutlineHome, HiOutlineHomeModern, HiOutlineUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { TbPencilPlus } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";


const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.8rem;
    
`;

const StyledLink = styled(NavLink)`

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;

  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  @media (max-width: 600px) {
      & span {
      display: none;
    }
    & svg {
      width: 2rem;
      height: 2rem;
    }
    &:link,
    &:visited {
      padding: 1.2rem 1.6rem;
    }
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/bookings">
          <HiOutlineCalendarDays />
             <span>Bookings</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/cabins">
            <HiOutlineHomeModern />
             <span>Cabins</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/users">
            <HiOutlineUsers/>
             <span>Users</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/settings">
            <IoSettingsOutline/>
             <span>Settings</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/createBooking">
            <TbPencilPlus/>
             <span>New Booking</span>
          </StyledLink>
        </li>

        
      </NavList>
    </nav>
  );
}
