import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

const UsersHeader = styled(Heading)`
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

function NewUsers() {
  return <>
  <UsersHeader as="h1">Create a new employee account</UsersHeader>
  <SignupForm />
  </>;
}

export default NewUsers;
