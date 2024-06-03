import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { UsersList } from "@/assets/components/UsersList";
import { setLocationToStorage } from "@/assets/utils";

const UsersListPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersList();

    setLocationToStorage(location.pathname);
  }, []);

  function fetchUsersList() {
    axios
      .get("api/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(console.log(err)));
  }

  function handleDeleteUser(id, name) {
    const resultOfConfirm = window.confirm(
      `Do you want to delete user ${name}`
    );

    if (!resultOfConfirm) {
      return;
    }

    axios
      .delete(`api/users/${id}`)
      .then((response) => {
        console.log(response);
        console.log(`User ${name} removed successfuly`);
        fetchUsersList();
      })
      .catch((err) => console.log(console.log(err)));
  }

  return (
    users && <UsersList users={users} handleDeleteUser={handleDeleteUser} />
  );
};

export default UsersListPage;
