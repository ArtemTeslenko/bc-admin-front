import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { StudentsList } from "@/assets/components/StudentsList";
import { setLocationToStorage } from "@/assets/utils";
import { STUDENTS_FILTERS } from "@/assets/constants";

const StudentsListPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [students, setStudents] = useState({});
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});

  useEffect(() => {
    fetchStudentsList(page);
  }, [page]);

  useEffect(() => {
    fetchStudentsList(1);

    setLocationToStorage(location.pathname);
  }, []);

  useEffect(() => {
    const filters = Object.values(STUDENTS_FILTERS);

    filters.forEach((filter) => {
      const filterValue = searchParams.get(filter);

      if (!filterValue && params[filter]) {
        const newParams = { ...params };
        delete newParams[filter];
        setParams({ ...newParams });
      }

      if (filterValue && filter === "location") {
        setParams({ ...params, [filter]: searchParams.getAll(filter) });
      }

      if (filterValue && filter !== "location") {
        setParams({ ...params, [filter]: filterValue });
      }
    });
  }, [searchParams]);

  useEffect(() => {
    fetchStudentsList(1);
  }, [params]);

  function fetchStudentsList(page = 1) {
    axios
      .get("api/students", {
        params: {
          page,
          ...params,
        },
      })
      .then((response) => setStudents(response.data))
      .catch((err) => console.log(console.log(err)));
  }

  return (
    students && (
      <StudentsList
        students={students}
        page={page}
        handleChangePage={setPage}
      />
    )
  );
};

export default StudentsListPage;
