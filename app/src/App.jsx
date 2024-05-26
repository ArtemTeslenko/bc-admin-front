import { Routes, Route } from "react-router-dom";
import { HomePage, StudentsListPage, StudentFormPage } from "@/assets/pages";
import { Layout } from "./assets/components/Layout/Layout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="students" element={<StudentsListPage />}></Route>
          <Route path="students/:id" element={<StudentFormPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}
