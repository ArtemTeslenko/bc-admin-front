import axios from "axios";
import { useState, useEffect } from "react";
import Section from "@/assets/components/Section";
import { useParams } from "react-router-dom";
import { Student } from "../components/Student/Student";

const StudentForm = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://bc-admin-back.onrender.com/api/students/${id}`)
      .then((response) => setStudent(response.data))
      .catch((err) => console.log(console.log(err)));
  }, []);

  return <Section>{student && <Student student={student} />}</Section>;
};

export default StudentForm;
