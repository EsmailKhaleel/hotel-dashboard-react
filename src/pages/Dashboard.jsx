import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import styled from "styled-components";

const DashboardHeaderContainer = styled(Row)`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
  
const DashboardHeader = styled(Heading)`
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

function Dashboard() {
  return (
    <>
      <DashboardHeaderContainer $type="horizontal">
        <DashboardHeader as="h1">Dashboard</DashboardHeader>
        <DashboardFilter/>
      </DashboardHeaderContainer>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
