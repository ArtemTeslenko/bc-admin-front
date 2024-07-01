import { useState } from "react";
import { Input } from "../components/StudentForm/StudentForm.styled";

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(0);

  const calculateAge = () => {
    const today = new Date();
    const birthdateDate = new Date(birthdate);

    let age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateDate.getDate())
    ) {
      age--;
    }

    setAge(age);
  };

  return (
    <>
      <div>
        <div>Date of Birth</div>
        <Input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <div>
          <button onClick={calculateAge}>Calculate Age</button>
        </div>
      </div>
      <div>{age > 0 ? `${age} years` : ""}</div>
    </>
  );
};

export default AgeCalculator;
