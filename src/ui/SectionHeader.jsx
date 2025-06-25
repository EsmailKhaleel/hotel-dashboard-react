import styled from "styled-components";

function SectionHeader({ title, description }) {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </HeaderWrapper>
  );
}

export default SectionHeader;

const HeaderWrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  margin-bottom: 1.5rem;

  /* Subtle fade-in animation can be added if needed */
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: var(--color-grey-500);
  margin: 0.25rem 0 0;
`;
