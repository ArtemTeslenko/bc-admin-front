import { NavLink } from "react-router-dom";
import { StudentsTable } from "@/assets/components/StudentsList";

export const StudentsList = ({ students }) => {
  return (
    <StudentsTable>
      <tbody>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Middlename</th>
          <th>Action</th>
        </tr>
        {students &&
          students.map((student) => {
            return (
              <tr key={student._id}>
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.middlename}</td>
                <td>
                  <NavLink to={student._id}>Update</NavLink>
                </td>
              </tr>
            );
          })}
      </tbody>
    </StudentsTable>
  );
};
