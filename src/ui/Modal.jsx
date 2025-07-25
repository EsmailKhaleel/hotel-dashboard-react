import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  @media screen and (max-width: 600px) {
    padding: 2rem;
    width: 90vw;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  overflow: auto;
  @media screen and (max-width: 600px) {
    padding: 2rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
  @media screen and (max-width: 600px) {
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const ModalContext = createContext();
const Modal = ({ children }) => {

  const [modelNameIsOpened, setModelNameIsOpened] = useState('');

  const close = () => setModelNameIsOpened('');
  const open = setModelNameIsOpened;

  return (
    <ModalContext.Provider value={{ close, open, modelNameIsOpened }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }) => {
  const { open, modelNameIsOpened } = useContext(ModalContext);

  if (modelNameIsOpened === opens) return null;

  return cloneElement(children, {
    onClick: () => open(opens)
  });
}


const Window = ({ children, name }) => {

  const { modelNameIsOpened, close } = useContext(ModalContext);

  const overlayRef = useOutsideClick(close);

  if (modelNameIsOpened !== name) return null;

  return createPortal(
    <>
      <Overlay>
        <StyledModal ref={overlayRef}>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          {cloneElement(children, { onCloseModal: close })}
        </StyledModal>
      </Overlay>
    </>,
    document.getElementById("modal")
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
