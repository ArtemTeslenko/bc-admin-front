import { useEffect, useState } from "react";
// import Select from "react-select";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  UsersTable,
  TableRow,
  TableHead,
  TableData,
  FiltersContainer,
  FieldForm,
  FieldLabel,
  FieldInput,
  FieldButton,
} from "@/assets/components/UsersList";
import { Pagination } from "@/assets/components/Pagination";
// import { usersRolesOptions } from "@/assets/constants";

export const UsersList = ({
  users,
  handleDeleteUser,
  page,
  handleChangePage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [filteredRoles, setFilteredRoles] = useState([]);
  const usersList = users.data;

  useEffect(() => {
    console.log(searchParams.get("userName"));
  }, [searchParams]);

  function sortRoles(roles) {
    return [...roles]
      .sort((a, b) => a.localeCompare(b))
      .map((role) => role + " ");
  }

  return (
    <>
      <FiltersContainer>
        <FieldForm>
          <FieldLabel>Name</FieldLabel>
          <FieldInput
            type="text"
            onChange={(event) => {
              searchParams.set("userName", event.target.value);
              setSearchParams(searchParams);
            }}
          />
          <FieldButton>Filter</FieldButton>
        </FieldForm>

        <FieldForm>
          <FieldLabel>Email</FieldLabel>
          <FieldInput
            type="text"
            onChange={(event) => {
              searchParams.set("userEmail", event.target.value);
              setSearchParams(searchParams);
            }}
          />
          <FieldButton>Filter</FieldButton>
        </FieldForm>

        {/* <FieldForm>
          <FieldLabel>Role</FieldLabel>
          <Select
            value={filteredRoles}
            onChange={(selectedRole) => {
              if (!searchParams.get("role")) {
                searchParams.set("role", selectedRole[0].value);
              } else {
                searchParams.append("role", selectedRole[1].value);
              }
              setSearchParams(searchParams);
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
          <FieldButton>Filter</FieldButton>
        </FieldForm> */}
      </FiltersContainer>

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
                    <NavLink
                      style={{
                        fontSize: "16px",
                        color: "#ffffff",
                        backgroundColor: "#3e4649",
                        padding: "10px",
                        borderRadius: "6px",
                        textDecoration: "none",
                      }}
                      to={user._id}
                    >
                      Update
                    </NavLink>
                    <button
                      style={{
                        fontSize: "16px",
                        color: "#ffffff",
                        backgroundColor: "#9e3c32",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                      type="button"
                      onClick={() => handleDeleteUser(user._id, user.name)}
                    >
                      Delete
                    </button>
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
