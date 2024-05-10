import axios from "axios";
import { useState, useEffect } from "react";
import { StudentsList } from "@/assets/components/StudentsList";

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("https://bc-admin-back.onrender.com/api/students")
      .then((response) => setStudents(response.data))
      .catch((err) => console.log(console.log(err)));
  }, []);

  return students && <StudentsList students={students} />;
};

export default StudentsListPage;
