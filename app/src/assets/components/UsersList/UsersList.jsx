import { NavLink } from "react-router-dom";
import {
  UsersTable,
  TableRow,
  TableHead,
  TableData,
} from "@/assets/components/UsersList";

export const UsersList = ({ users, handleDeleteUser }) => {
  return (
    <>
      <UsersTable>
        <tbody>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {users &&
            users.map((user) => {
              return (
                <TableRow key={user._id}>
                  <TableData>{user.name}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.role}</TableData>
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
      <p>pagination</p>
      <p>total</p>
    </>
  );
};
