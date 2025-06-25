import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import SectionHeader from "../ui/SectionHeader";



function Account() {
  return (
    <>
      <Row $type="vertical" style={{ marginBottom: "3rem" }}>
        <SectionHeader
          title="Update user data"
          description="Edit your personal details and email address"
        />
        <UpdateUserDataForm />
      </Row>

      <Row $type="vertical">
        <SectionHeader
          title="Update password"
          description="Change your password to keep your account secure"
        />
        <UpdatePasswordForm />
      </Row>

    </>
  );
}

export default Account;
