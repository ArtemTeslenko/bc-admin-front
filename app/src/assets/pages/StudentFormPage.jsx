import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Student } from "@/assets/components/Student";
import { setLocationToStorage } from "@/assets/utils";

const StudentFormPage = () => {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`api/students/${id}`)
      .then((response) => setStudent(response.data))
      .catch((err) => console.log(console.log(err)));

    setLocationToStorage(location.pathname);
  }, []);

  return <section>{student && <Student student={student} />}</section>;
};

export default StudentFormPage;
