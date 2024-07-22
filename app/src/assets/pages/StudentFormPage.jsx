import axios from "axios";
import { useState, useEffect } from "react";
import { StudentForm } from "@/assets/components/StudentForm";
import { useParams, useLocation } from "react-router-dom";
import { StudentPDF } from "@/assets/components/StudentPDF";
import { setLocationToStorage } from "@/assets/utils";
import { Loader } from "@/assets/components/Loader";

const StudentFormPage = () => {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`api/students/${id}`)
      .then((response) => setStudent(response.data))
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));

    setLocationToStorage(location.pathname);
  }, []);

  function handleStudentChange(newEntity) {
    setIsLoading(true);
    axios
      .put(`api/students/${id}`, newEntity)
      .then((response) => setStudent(response.data))
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));
  }

  return (
    <section>
      {student && (
        <>
          <StudentForm
            student={student}
            submitStudentChange={handleStudentChange}
          />

          <StudentPDF student={student} />
        </>
      )}
      <Loader isLoading={isLoading} />
    </section>
  );
};

export default StudentFormPage;
