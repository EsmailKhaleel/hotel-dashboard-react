import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export const Menus = ({ children }) => {
  const [isOpen, setIsOpen] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setIsOpen('');
  const open = setIsOpen;

  useEffect(() => {
    if (!isOpen) return;

    const scrollable = document.getElementById("main-wrapper");
    if (!scrollable) return;

    const handleScroll = () => {
      setIsOpen('');
    };
    scrollable.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, setIsOpen]);



  return (
    <MenusContext.Provider value={{ isOpen, close, open, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  )
}

const Menu = ({ children }) => {
  return (
    <StyledMenu>
      {children}
    </StyledMenu>
  );
}

const Toggle = ({ id }) => {
  const { isOpen, open, close, setPosition } = useContext(MenusContext);

  function handleToggle(e) {
    e.stopPropagation();
    const nearstButton = e.target.closest('button');
    const { left: x, top: y, width, height } = nearstButton.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - x - width,
      y: y + height + 5
    });
    (isOpen === "" || isOpen !== id) ? open(id) : close();
  }

  return (
    <StyledMenu>
      <StyledToggle onClick={(e) => handleToggle(e)}>
        <HiDotsVertical />
      </StyledToggle>
    </StyledMenu>
  );
}

const List = ({ children, id }) => {
  const { isOpen, position, close } = useContext(MenusContext);
  const overlayRef = useOutsideClick(close,false);

  if (isOpen !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={overlayRef} >
      {children}
    </StyledList>,
    document.body
  );
}

const Button = ({ children, icon, onClick, hasLoading = false }) => {
  const { close } = useContext(MenusContext);

  return (
    <li>
      <StyledButton onClick={() => {
        onClick?.();
        if (hasLoading) return;
        else close();
      }}>
        {icon}<span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
