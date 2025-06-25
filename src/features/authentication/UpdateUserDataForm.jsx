import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import { useUpdateUserData, useUploadAvatar } from "./useUserMutation";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  const {
    data: {
      user: { email, name: currentFullName, image: currentAvatar } = {},
    } = {},
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar || "");
  const { mutate: updateUserData, isPending: isUpdating } = useUpdateUserData();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useUploadAvatar();

  const isLoading = isUpdating || isUploadingAvatar;

  function handleSubmit(event) {
    event.preventDefault();

    if (fullName && fullName !== currentFullName) {
      updateUserData({ name: fullName });
    }

    if (avatarFile) {
      const formData = new FormData();
      formData.append("image", avatarFile);
      uploadAvatar(formData);
    }
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Avatar">
        <AvatarContainer>
          {avatarPreview && (
            <BigAvatarImage
              src={avatarPreview}
              alt="Avatar preview"
            />
          )}
          <StyledFileInput
            type="file"
            id="avatar"
            accept="image/*"
            disabled={isLoading}
            onChange={handleAvatarChange}
          />
        </AvatarContainer>
      </FormRow>

      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          id="fullName"
          disabled={isLoading}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>


      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          onClick={() => {
            setFullName(currentFullName || "");
            setAvatarFile(null);
            setAvatarPreview(currentAvatar || "");
          }}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const BigAvatarImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid var(--color-grey-300);
`;

const StyledFileInput = styled.input`
  font-size: 1.4rem;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  cursor: pointer;

  &::file-selector-button {
    padding: 0.3rem 1rem;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: var(--border-radius-tiny);
    border: none;
    background-color: var(--color-brand-500);
    color: var(--color-grey-50);
    cursor: pointer;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;
