import axios from "axios";
import { useState, useEffect } from "react";
import { StudentForm } from "@/assets/components/StudentForm";
import { useParams, useLocation } from "react-router-dom";
import { StudentPDF } from "@/assets/components/StudentPDF";
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

  return (
    <section>
      {student && (
        <>
          <StudentForm student={student} />
          <StudentPDF location={student.location} />
        </>
      )}
    </section>
  );
};

export default StudentFormPage;
