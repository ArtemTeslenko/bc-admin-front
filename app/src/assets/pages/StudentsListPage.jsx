import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { StudentsList } from "@/assets/components/StudentsList";
import { setLocationToStorage } from "@/assets/utils";
import { STUDENTS_FILTERS } from "@/assets/constants";
import { Loader } from "@/assets/components/Loader";

const StudentsListPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [students, setStudents] = useState({});
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [locationsList, setLocationsList] = useState([]);

  useEffect(() => {
    fetchStudentsList(page);
  }, [page]);

  useEffect(() => {
    fetchStudentsList(1);

    setLocationToStorage(location.pathname);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("api/locations")
      .then((response) => setLocationsList(response.data))
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const filters = Object.values(STUDENTS_FILTERS);
    const preparedParams = {};

    filters.forEach((filter) => {
      if (filter === "locationSlug") {
        preparedParams[filter] = searchParams.getAll(filter);
      }

      if (filter !== "locationSlug") {
        preparedParams[filter] = searchParams.get(filter);
      }
    });

    setParams(preparedParams);
  }, [searchParams]);

  useEffect(() => {
    fetchStudentsList(1);
  }, [params]);

  function fetchStudentsList(page = 1) {
    setIsLoading(true);
    axios
      .get("api/students", {
        params: {
          page,
          ...params,
        },
      })
      .then((response) => setStudents(response.data))
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));
  }

  function handleDeleteStudent(id, name) {
    const resultOfConfirm = window.confirm(
      `Do you want to delete student ${name}`
    );

    if (!resultOfConfirm) {
      return;
    }

    setIsLoading(true);
    axios
      .delete(`api/students/${id}`)
      .then((response) => {
        console.log(response);

        if (students.itemsPerPage < 2 && page - 1 !== 0) {
          setPage(page - 1);
        } else {
          fetchStudentsList(page);
        }
      })
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      {students && (
        <StudentsList
          students={students}
          page={page}
          handleChangePage={setPage}
          handleDeleteStudent={handleDeleteStudent}
          locationsList={locationsList}
        />
      )}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default StudentsListPage;
