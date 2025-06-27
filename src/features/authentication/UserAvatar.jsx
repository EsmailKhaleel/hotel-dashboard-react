import styled from "styled-components";
import useUser from "./useUser";
const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  @media screen and (max-width: 768px) {
    width: 3.2rem;
    height: 3.2rem;
  }
`;
const UserName = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
`;

export default function UserAvatar() {
  const { data: { user } = {} } = useUser();
  const { name, image } = user;

  return (
    <StyledUserAvatar>
      <Avatar src={image || "default-user.jpg"} alt="User Avatar" />
      <UserName>{name || "Guest"}</UserName>
    </StyledUserAvatar>
  );
}
