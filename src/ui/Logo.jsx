import styled from "styled-components";
import useDarkMode from "../context/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
  @media (max-width: 600px) {
    img {
      height: 4rem;
    }
  }
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  object-fit: cover;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  
  const logoSrc = isDarkMode ?
    "/logo-dark.png" :
    "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={logoSrc} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
