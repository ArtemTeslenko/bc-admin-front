import { useState } from "react";
import { ToggleForm } from "@/assets/components/StudentForm/ToggleForm";

export const ToggleButton = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Client</button>
      {toggle && (
        <>
          <ToggleForm />
        </>
      )}
    </div>
  );
};
