import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { PeriodsList } from "@/assets/components/PeriodsList";
import { setLocationToStorage } from "@/assets/utils";

const PeriodsListPage = () => {
  const location = useLocation();
  const [periods, setPeriods] = useState({});

  useEffect(() => {
    fetchPeriodsList();

    setLocationToStorage(location.pathname);
  }, []);

  function addPeriod(body) {
    axios
      .post("api/periods", { period: body })
      .then((response) => {
        console.log(response);
        fetchPeriodsList();
      })
      .catch((err) => console.log(console.log(err)));

    fetchPeriodsList();
  }

  function removePeriod(id) {
    axios
      .delete(`api/periods/${id}`)
      .then((response) => {
        console.log(`Period removed successfuly`);
        fetchPeriodsList();
      })
      .catch((err) => console.log(console.log(err)));
  }

  function fetchPeriodsList() {
    axios
      .get("api/periods")
      .then((response) => setPeriods(response.data))
      .catch((err) => console.log(console.log(err)));
  }

  return (
    periods && (
      <PeriodsList
        periods={periods}
        createNewPeriod={addPeriod}
        deletePeriod={removePeriod}
      />
    )
  );
};

export default PeriodsListPage;
