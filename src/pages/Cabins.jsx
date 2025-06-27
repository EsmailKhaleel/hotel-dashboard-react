import styled from "styled-components";
import { AddCabin } from "../features/cabins/AddCabin";
import { CabinTable } from "../features/cabins/CabinTable";
import { CabinTableOperations } from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const CabinHeaderContainer = styled(Row)`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
  
const CabinHeader = styled(Heading)`
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;
function Cabins() {

  return (
    <>
      <CabinHeaderContainer $type="horizontal">
        <CabinHeader as="h1">All cabins</CabinHeader>
        <CabinTableOperations />
      </CabinHeaderContainer>
      <Row>
        <CabinTable />
      </Row>
      <Row $type="horizontal" $justify="end">
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
