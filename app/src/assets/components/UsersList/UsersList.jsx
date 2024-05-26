import { NavLink } from "react-router-dom";
import { UsersTable } from "@/assets/components/UsersList";

export const UsersList = ({ users }) => {
  return (
    <UsersTable>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
        {users &&
          users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <NavLink to={user._id}>Update</NavLink>
                </td>
              </tr>
            );
          })}
      </tbody>
    </UsersTable>
  );
};
