import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { UsersList } from "@/assets/components/UsersList";
import { setLocationToStorage } from "@/assets/utils";

const UsersListPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("api/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(console.log(err)));

    setLocationToStorage(location.pathname);
  }, []);

  return users && <UsersList users={users} />;
};

export default UsersListPage;
