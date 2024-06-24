// import { useState } from "react";
import {
  Input,
  ToggleWrapper,
  InputWrapper,
  Label,
} from "./StudentForm.styled";
import AgeCalculator from "@/assets/utils/AgeCalculator";

export const ToggleForm = () => {
  // const {parent} = student
  // const [parentName, SetParentName] = useState(parent)

  return (
    <div>
      <InputWrapper>
        <Label>Choose the gender</Label>
        <ToggleWrapper>
          <Input type="radio" value="Male" name="gender" /> Male
          <Input type="radio" value="Female" name="gender" /> Female
          <Input type="radio" value="Other" name="gender" /> Other
          <button type="submit">Submit</button>
        </ToggleWrapper>
      </InputWrapper>

      <InputWrapper>
        <AgeCalculator />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="parentName">Parent Name</Label>
        <Input
          id="parentName"
          placeholder="Type parent of student`s name"
          // value={parentName}
          // onChange={(e) => SetParentName(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>Student status</Label>
        <ToggleWrapper>
          <Input type="radio" value="New" name="status" /> New
          <Input type="radio" value="Return" name="status" /> Return
          <button type="submit">Submit</button>
        </ToggleWrapper>
        <Input placeholder="Comments" />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="CrmLink">Crm Link</Label>
        <Input id="CrmLink" placeholder="Crm Link" />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="BookingNumber">Booking Number</Label>
        <Input id="CrmLink" placeholder="Booking Number" />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="Manager">Manager</Label>
        <Input id="Manager" placeholder="Manager name" />
      </InputWrapper>


    </div>
  );
};
