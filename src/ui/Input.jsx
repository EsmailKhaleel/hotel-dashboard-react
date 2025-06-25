import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    font-size: 16px;
    color: var(--color-grey-800);
    background-color: var(--color-white);
    
    &:focus {
        border-color: var(--color-brand-500);
        outline: none;
        box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.6);
    }

    &::placeholder {
        color: var(--color-grey-900);
    }
`;
export default Input;