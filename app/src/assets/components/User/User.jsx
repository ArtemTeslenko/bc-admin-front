import { useState, useEffect } from "react";
import Select from "react-select";
import {
  UserFormTitle,
  UserForm,
  FieldWrapper,
  UserFormLabel,
  UserFormInput,
} from "@/assets/components/User/";
import { usersRolesOptions } from "@/assets/constants";

export const User = ({ user, submitRoleChange }) => {
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
      <UserFormTitle>User: {name}</UserFormTitle>
      {user && (
        <UserForm>
          <FieldWrapper>
            <UserFormLabel htmlFor="id">Id</UserFormLabel>
            <UserFormInput id="id" value={_id} disabled />
          </FieldWrapper>
          <FieldWrapper>
            <UserFormLabel htmlFor="name">Name</UserFormLabel>
            <UserFormInput id="name" value={name} disabled />
          </FieldWrapper>
          <FieldWrapper>
            <UserFormLabel htmlFor="email">Email</UserFormLabel>
            <UserFormInput id="email" value={email} disabled />
          </FieldWrapper>
          <FieldWrapper>
            <UserFormLabel htmlFor="role">Role</UserFormLabel>
            <Select
              value={userRole}
              onChange={(selectedRole) => setUserRole(selectedRole)}
              options={usersRolesOptions}
              isMulti
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: "16px",
                  boxShadow: "inset 0px 0px 10px 1px rgba(0, 0, 0, 0.1)",
                  borderRadius: "6px",
                  border: "none",
                }),
                multiValue: (styles, state) => ({
                  ...styles,
                  backgroundColor: "#e9f9f2",
                  borderRadius: "4px",
                }),
              }}
            />
          </FieldWrapper>
          <button
            style={{
              fontSize: "16px",
              color: "#ffffff",
              backgroundColor: "#3e4649",
              padding: "10px",
              borderRadius: "6px",
            }}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitRoleChange(userRole);
            }}
          >
            Update user
          </button>
        </UserForm>
      )}
    </>
  );
};
