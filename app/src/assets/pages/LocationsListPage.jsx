import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LocationsList } from "@/assets/components/LocationsList";
import { setLocationToStorage } from "@/assets/utils";
import { Loader } from "@/assets/components/Loader";
import { NotificationDanger, NotificationSuccess } from "@/assets/styles";

const LocationsListPage = () => {
  const location = useLocation();
  const [locations, setLocations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [isSendReject, setIsSendReject] = useState(false);

  useEffect(() => {
    fetchLocationsList();

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

  function addLocation(locationEntity) {
    setIsLoading(true);
    axios
      .post("api/locations", locationEntity)
      .then((response) => {
        if (response.status === 201) {
          setIsSendSuccess(true);
        }
        fetchLocationsList();
      })
      .catch((err) => setIsSendReject(true))
      .finally(() => setIsLoading(false));
  }

  function edditLocation(id, locationEntity) {
    setIsLoading(true);
    axios
      .put(`api/locations/${id}`, locationEntity)
      .then((response) => {
        if (response.status === 200) {
          setIsSendSuccess(true);
        }
        fetchLocationsList();
      })
      .catch((err) => setIsSendReject(true))
      .finally(() => setIsLoading(false));
  }

  function removeLocation(id) {
    const resultOfConfirm = window.confirm("Do you want to delete location");

    if (!resultOfConfirm) {
      return;
    }

    setIsLoading(true);
    axios
      .delete(`api/locations/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setIsSendSuccess(true);
        }
        fetchLocationsList();
      })
      .catch((err) => setIsSendReject(true))
      .finally(() => setIsLoading(false));
  }

  function fetchLocationsList() {
    setIsLoading(true);
    axios
      .get("api/locations")
      .then((response) => setLocations(response.data))
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      {locations && (
        <LocationsList
          locations={locations}
          createNewLocation={addLocation}
          updateLocation={edditLocation}
          deleteLocation={removeLocation}
        />
      )}

      {isSendSuccess && <NotificationSuccess>Success</NotificationSuccess>}

      {isSendReject && <NotificationDanger>Error</NotificationDanger>}

      <Loader isLoading={isLoading} />
    </>
  );
};

export default LocationsListPage;
