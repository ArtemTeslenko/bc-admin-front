import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { UsersList } from "@/assets/components/UsersList";
import { setLocationToStorage } from "@/assets/utils";
import { USERS_FILTERS } from "@/assets/constants";

const UsersListPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});

  useEffect(() => {
    const filters = Object.values(USERS_FILTERS);

    filters.forEach((filter) => {
      const filterValue = searchParams.get(filter);

      if (!filterValue && params[filter]) {
        const newParams = { ...params };
        delete newParams[filter];
        setParams({ ...newParams });
      }

      if (filterValue && filter === "role") {
        setParams({ ...params, [filter]: searchParams.getAll(filter) });
      }

      if (filterValue && filter !== "role") {
        setParams({ ...params, [filter]: filterValue });
      }
    });
  }, [searchParams]);

  useEffect(() => {
    fetchUsersList(1);
  }, [params]);

  useEffect(() => {
    fetchUsersList(page);
  }, [page]);

  useEffect(() => {
    fetchUsersList(1);

    setLocationToStorage(location.pathname);
  }, []);

  function fetchUsersList(page = 1) {
    axios
      .get("api/users", {
        params: {
          page,
          ...params,
        },
      })
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
        fetchUsersList(page);
      })
      .catch((err) => console.log(console.log(err)));
  }

  return (
    users && (
      <UsersList
        users={users}
        handleDeleteUser={handleDeleteUser}
        page={page}
        handleChangePage={setPage}
      />
    )
  );
};

export default UsersListPage;
