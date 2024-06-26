import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { StudentCreateForm } from "@/assets/components/StudentCreateForm";
import { setLocationToStorage } from "@/assets/utils";
import { Loader } from "@/assets/components/Loader";

const StudentCreatePage = () => {
  const location = useLocation();
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newStudentId, setNewStudentId] = useState(null);

  useEffect(() => {
    setLocationToStorage(location.pathname);
  }, []);

  function handleStudentCreate(studentEntity) {
    setIsLoading(true);
    axios
      .post(`api/students`, studentEntity)
      .then((response) => {
        console.log(response);
        setIsCreateSuccess(true);
        setNewStudentId(response.data._id);
      })
      .catch((err) => console.log(console.log(err)))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <section>
      <StudentCreateForm
        submitStudentCreate={handleStudentCreate}
        created={isCreateSuccess}
      />
      {isCreateSuccess && newStudentId && (
        <Navigate to={`/students/${newStudentId}`} />
      )}
      <Loader isLoading={isLoading} />
    </section>
  );
};

export default StudentCreatePage;
