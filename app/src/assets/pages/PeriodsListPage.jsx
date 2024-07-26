import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { PeriodsList } from "@/assets/components/PeriodsList";
import { setLocationToStorage } from "@/assets/utils";
import { Loader } from "@/assets/components/Loader";
import { NotificationDanger, NotificationSuccess } from "@/assets/styles";

const PeriodsListPage = () => {
  const location = useLocation();
  const [periods, setPeriods] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [isSendReject, setIsSendReject] = useState(false);

  useEffect(() => {
    fetchPeriodsList();

    setLocationToStorage(location.pathname);
  }, []);

  useEffect(() => {
    if (isSendSuccess) {
      setTimeout(() => setIsSendSuccess(false), 3500);
    }
  }, [isSendSuccess]);

  useEffect(() => {
    if (isSendReject) {
      setTimeout(() => setIsSendReject(false), 3500);
    }
  }, [isSendReject]);

  function addPeriod(body) {
    setIsLoading(true);
    axios
      .post("api/periods", { period: body })
      .then((response) => {
        if (response.status === 201) {
          setIsSendSuccess(true);
        }
        fetchPeriodsList();
      })
      .catch((err) => setIsSendReject(true))
      .finally(() => setIsLoading(false));

    fetchPeriodsList();
  }

  function removePeriod(id) {
    setIsLoading(true);
    axios
      .delete(`api/periods/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setIsSendSuccess(true);
        }
        fetchPeriodsList();
      })
      .catch((err) => setIsSendReject(true))
      .finally(() => setIsLoading(false));
  }

  function fetchPeriodsList() {
    setIsLoading(true);
    axios
      .get("api/periods")
      .then((response) => setPeriods(response.data))
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      {periods && (
        <PeriodsList
          periods={periods}
          createNewPeriod={addPeriod}
          deletePeriod={removePeriod}
        />
      )}

      {isSendSuccess && <NotificationSuccess>Success</NotificationSuccess>}

      {isSendReject && <NotificationDanger>Error</NotificationDanger>}

      <Loader isLoading={isLoading} />
    </>
  );
};

export default PeriodsListPage;
