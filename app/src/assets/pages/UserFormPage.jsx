import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { UserForm } from "@/assets/components/UserForm";
import { setLocationToStorage } from "@/assets/utils";

const UserFormPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`api/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => console.log(console.log(err)));

    setLocationToStorage(location.pathname);
  }, []);

  function handleRoleChange(newRole) {
    const roles = newRole.map((role) => role.value);
    const requestBody = { role: roles };

    axios
      .patch(`api/users/${id}/role`, requestBody)
      .then((response) => setUser(response.data))
      .catch((err) => console.log(console.log(err)));
  }

  return (
    <section>
      {user && <UserForm user={user} submitRoleChange={handleRoleChange} />}
    </section>
  );
};

export default UserFormPage;
