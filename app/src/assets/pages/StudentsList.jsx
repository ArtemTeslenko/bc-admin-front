import axios from "axios";
import { useState, useEffect } from "react";
import { StudentsList } from "@/assets/components/StudentsList";

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("https://bc-admin-back.onrender.com/api/students", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDEyNjNmMmJiOTllMDc1NTk3NmI4YiIsImlhdCI6MTcxNjA0MDQ3NCwiZXhwIjoxNzE2MDY1Njc0fQ.eanL849G7gNVn25sjW3Le36T9TVKehKOlA4qypgT-NA",
        },
      })
      .then((response) => setStudents(response.data))
      .catch((err) => console.log(console.log(err)));
  }, []);

  return students && <StudentsList students={students} />;
};

export default StudentsListPage;
