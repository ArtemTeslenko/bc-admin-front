import axios from "axios";
import { useState, useEffect } from "react";
import Section from "@/assets/components/Section";
import { useParams } from "react-router-dom";
// import { Student } from "../components/Student/Student";
import { StudentForm } from "@/assets/components/StudentForm";

const StudentFormPage = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://bc-admin-back.onrender.com/api/students/${id}`, {headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDEyNjNmMmJiOTllMDc1NTk3NmI4YiIsImlhdCI6MTcxNjA0MDQ3NCwiZXhwIjoxNzE2MDY1Njc0fQ.eanL849G7gNVn25sjW3Le36T9TVKehKOlA4qypgT-NA",
      },})
      .then((response) => setStudent(response.data))
      .catch((err) => console.log(console.log(err)));
  }, []);

  return <Section>{student && <StudentForm student={student} />}</Section>;
};

export default StudentFormPage;
``