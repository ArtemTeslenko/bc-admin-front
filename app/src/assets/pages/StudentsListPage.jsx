import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { StudentsList } from "@/assets/components/StudentsList";
import { setLocationToStorage } from "@/assets/utils";

const StudentsListPage = () => {
  const location = useLocation();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("api/students")
      .then((response) => setStudents(response.data))
      .catch((err) => console.log(console.log(err)));

    setLocationToStorage(location.pathname);
  }, []);

  return students && <StudentsList students={students} />;
};

export default StudentsListPage;
