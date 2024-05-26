import { useState } from "react";
import { Input, Toggle } from "./StudentForm.styled";
import AgeCalculator from "./ageCalculator";

// function getAge(dateString) {
//   var today = new Date();
//   var birthDate = new Date(dateString);
//   var age = today.getFullYear() - birthDate.getFullYear();
//   var m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//   }
//   return age;
// }
// console.log('age: ' + getAge("1980/08/10"));

const LogicalNot = () => {
  //Using Inline Function and the The Logical Not (!) to toggle state
  const [toggle, setToggle] = useState(false);
  // const [fullYear, setFullYear] = useState('d')

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Client</button>
      {toggle && (
        <>
          <Toggle>
            <Input type="radio" value="Male" name="gender" /> Male
            <Input type="radio" value="Female" name="gender" /> Female
            <Input type="radio" value="Other" name="gender" /> Other
            {/* <button type="submit">Submit</button> */}
          </Toggle>
          {/* <Input
            type="date"
            placeholder="Enter BirthDate"
            // onClick={() => setFullYear(getAge)}
            // value={values.birthdate}
            //  onChange={handleChange}
            name="birthdate"
            // max={current}
          ></Input> */}
          <AgeCalculator />
        </>
      )}
    </div>
  );
};
export default LogicalNot;
