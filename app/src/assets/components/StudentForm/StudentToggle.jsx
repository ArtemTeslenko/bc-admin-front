import { useState } from "react";
import { Input, ToggleForm } from "./StudentForm.styled";
import AgeCalculator from "./AgeCalculator";


export const LogicalNot = () => {

  const [toggle, setToggle] = useState(false);


  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Client</button>
      {toggle && (
        <>
          <ToggleForm>
            <Input type="radio" value="Male" name="gender" /> Male
            <Input type="radio" value="Female" name="gender" /> Female
            <Input type="radio" value="Other" name="gender" /> Other
            {/* <button type="submit">Submit</button> */}
          </ToggleForm>
          <AgeCalculator />
        </>
      )}
    </div>
  );
};
