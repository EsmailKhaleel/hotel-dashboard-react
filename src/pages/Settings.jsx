import styled from "styled-components";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const SettingsHeader = styled(Heading)`
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
  `;
  
function Settings() {
  return <Row $type="vertical">
    <SettingsHeader as="h1">Update hotel settings</SettingsHeader>
    <UpdateSettingsForm />
  </Row>
    ;
}

export default Settings;
