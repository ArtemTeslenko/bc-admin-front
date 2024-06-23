import { useState, useEffect } from "react";
import Select from "react-select";
import {
  ListItemFormTitle,
  ListItemForm,
  ListItemFieldWrapper,
  ListItemFormLabel,
  ListItemFormInput,
  CommonButtonPrimary,
} from "@/assets/styles";
import { usersRolesOptions } from "@/assets/constants";
import { controlStyles, multiValueStyles } from "@/assets/utils";

export const UserForm = ({ user, submitRoleChange }) => {
  const { _id, name, email, role } = user;
  const [userRole, setUserRole] = useState([]);

  useEffect(() => prepareRoleOptions(role), [role]);

  function prepareRoleOptions(role) {
    const options = usersRolesOptions.map(
      (option) => role.includes(option.value) && option
    );
    setUserRole(options);
  }

  return (
    <>
      <ListItemFormTitle>User: {name}</ListItemFormTitle>
      {user && (
        <ListItemForm>
          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="id">Id</ListItemFormLabel>
            <ListItemFormInput id="id" value={_id} disabled />
          </ListItemFieldWrapper>
          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="name">Name</ListItemFormLabel>
            <ListItemFormInput id="name" value={name} disabled />
          </ListItemFieldWrapper>
          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="email">Email</ListItemFormLabel>
            <ListItemFormInput id="email" value={email} disabled />
          </ListItemFieldWrapper>
          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="role">Role</ListItemFormLabel>
            <Select
              value={userRole}
              onChange={(selectedRole) => setUserRole(selectedRole)}
              options={usersRolesOptions}
              isMulti
              styles={{
                control: controlStyles,
                multiValue: multiValueStyles,
              }}
            />
          </ListItemFieldWrapper>
          <CommonButtonPrimary
            type="submit"
            className="right"
            onClick={(e) => {
              e.preventDefault();
              submitRoleChange(userRole);
            }}
          >
            Update user
          </CommonButtonPrimary>
        </ListItemForm>
      )}
    </>
  );
};
