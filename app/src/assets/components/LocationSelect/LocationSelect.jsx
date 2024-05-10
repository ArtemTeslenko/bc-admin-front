import { useState } from "react";
import { STUDENTS_LOCATION } from "@/assets/constants";

export const LocationSelect = () => {
  const [location, setLocation] = useState(getLocationOptions);

  function getLocationOptions() {
    return STUDENTS_LOCATION.map((location) => {
      return { value: location, label: `${location} Location` };
    });
  }

  return <div>qwe</div>;
};
