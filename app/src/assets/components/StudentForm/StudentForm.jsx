import {
  Input,
  Label,
  Form,
  InputWrapper,
} from "@/assets/components/StudentForm";
import { useState } from "react";
import {LogicalNot} from "@/assets/components/StudentForm";

export const StudentForm = ({ student }) => {
  const { name, surname, middlename } = student;

  const [studentName, setStudentName] = useState(name);
  const [studentSurname, setStudentSurname] = useState(surname);
  const [studentMiddlename, setStudentMiddlename] = useState(middlename);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target);
      }}
    >
      <InputWrapper>
        <Label htmlFor="studentName">Name</Label>
        <Input
          id="studentName"
          placeholder="Type student name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="studentSurname">Surname</Label>
        <Input
          id="studentSurname"
          placeholder="Type student surname"
          value={studentSurname}
          onChange={(e) => setStudentSurname(e.target.value)}
        />
      </InputWrapper>
      {/* <button type="submit">update</button> */}
      <InputWrapper>
        <Label htmlFor="studentMiddlename">Middlename</Label>
        <Input
          id="studentMiddlename"
          placeholder="Type student middlename"
          value={studentMiddlename}
          onChange={(e) => setStudentMiddlename(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>  
      <LogicalNot />
      </InputWrapper>
    </Form>
  );
};
