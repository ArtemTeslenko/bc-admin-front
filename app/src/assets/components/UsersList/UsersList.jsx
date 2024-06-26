import { useEffect, useState } from "react";
// import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import {
  UsersTable,
  TableRow,
  TableHead,
  TableData,
} from "@/assets/components/UsersList";
import {
  CommonNavButton,
  CommonButtonDanger,
  // FiltersContainer,
  // FieldForm,
  // FieldLabel,
  // FieldInput,
  // FieldButton,
} from "@/assets/styles";
import { Pagination } from "@/assets/components/Pagination";
import { usersRolesOptions, USERS_FILTERS } from "@/assets/constants";

export const UsersList = ({
  users,
  handleDeleteUser,
  page,
  handleChangePage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [nameFilter, setNameFilter] = useState("");
  // const [emailFilter, setEmailFilter] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);
  const usersList = users.data;

  function sortRoles(roles) {
    return [...roles]
      .sort((a, b) => a.localeCompare(b))
      .map((role) => role + " ");
  }

  function setRoleToSearchParams() {
    searchParams.delete(USERS_FILTERS.role);

    if (filteredRoles.length) {
      filteredRoles.forEach((role) =>
        searchParams.append(USERS_FILTERS.role, role.value)
      );
    }

    setSearchParams(searchParams);
  }

  return (
    <>
      {/* <FiltersContainer>
        <FieldForm>
          <FieldLabel>Name</FieldLabel>
          <FieldInput
            type="text"
            placeholder="Name..."
            value={nameFilter}
            onChange={(event) => {
              setNameFilter(event.target.value);
            }}
          />
          <FieldButton
            type="button"
            onClick={() => {
              searchParams.set(USERS_FILTERS.name, nameFilter);
              setSearchParams(searchParams);
            }}
          >
            Filter
          </FieldButton>

          <FieldButton
            type="button"
            onClick={() => {
              setNameFilter("");
              searchParams.delete(USERS_FILTERS.name);
              setSearchParams(searchParams);
            }}
          >
            Reset
          </FieldButton>
        </FieldForm>

        <FieldForm>
          <FieldLabel>Email</FieldLabel>
          <FieldInput
            type="text"
            placeholder="Email..."
            value={emailFilter}
            onChange={(event) => {
              setEmailFilter(event.target.value);
            }}
          />
          <FieldButton
            type="button"
            onClick={() => {
              searchParams.set(USERS_FILTERS.email, emailFilter);
              setSearchParams(searchParams);
            }}
          >
            Filter
          </FieldButton>

          <FieldButton
            type="button"
            onClick={() => {
              setEmailFilter("");
              searchParams.delete(USERS_FILTERS.email);
              setSearchParams(searchParams);
            }}
          >
            Reset
          </FieldButton>
        </FieldForm>

        <FieldForm>
          <FieldLabel>Role</FieldLabel>
          <Select
            value={filteredRoles}
            onChange={(selectedRole) => {
              if (!selectedRole.length) {
                setFilteredRoles([]);
                searchParams.delete(USERS_FILTERS.role);
                setSearchParams(searchParams);
              }

              setFilteredRoles(selectedRole);
            }}
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
          <FieldButton type="button" onClick={setRoleToSearchParams}>
            Filter
          </FieldButton>
        </FieldForm>
      </FiltersContainer> */}

      <UsersTable>
        <tbody>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {usersList &&
            usersList.map((user) => {
              return (
                <TableRow key={user._id}>
                  <TableData>{user.name}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{sortRoles(user.role)}</TableData>
                  <TableData className="action">
                    <CommonNavButton to={user._id}>Update</CommonNavButton>
                    <CommonButtonDanger
                      type="button"
                      onClick={() => handleDeleteUser(user._id, user.name)}
                    >
                      Delete
                    </CommonButtonDanger>
                  </TableData>
                </TableRow>
              );
            })}
        </tbody>
      </UsersTable>

      <Pagination
        list={users}
        page={page}
        handleChangePage={handleChangePage}
      />
    </>
  );
};
