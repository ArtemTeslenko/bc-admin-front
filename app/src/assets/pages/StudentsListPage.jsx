import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { StudentsList } from "@/assets/components/StudentsList";
import { setLocationToStorage } from "@/assets/utils";

const StudentsListPage = () => {
  const location = useLocation();
  const [students, setStudents] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchStudentsList(page);
  }, [page]);

  useEffect(() => {
    fetchStudentsList(1);

    setLocationToStorage(location.pathname);
  }, []);

  function fetchStudentsList(page = 1) {
    axios
      .get("api/students", {
        params: {
          page,
          // ...{ role: ["admin", "super-admin"] },
          // ...params,
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
