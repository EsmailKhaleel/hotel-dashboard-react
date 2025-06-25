import styled from "styled-components";

const EmptyWrapper = styled.div`
  padding: 2rem;
  text-align: center;
  font-size: 1.8rem;
  color: var(--color-grey-500);
  font-style: italic;

  & p {
    margin: 0;
  }
`;

function Empty({ resource }) {
  return (
    <EmptyWrapper>
      <p>No {resource} could be found.</p>
    </EmptyWrapper>
  );
}

export default Empty;
