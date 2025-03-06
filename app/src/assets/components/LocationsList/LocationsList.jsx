import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  Table,
  TableRow,
  TableHead,
  TableData,
  CommonButtonFlexContainer,
  CommonButtonPrimary,
  CommonButtonWithIcon,
  CommonButtonDanger,
  ListItemForm,
  ListItemFieldWrapper,
  ListItemFormInput,
  ListItemFormLabel,
} from "@/assets/styles";
import { commonButtonIcon } from "@/assets/utils";

export const LocationsList = ({
  locations,
  createNewLocation,
  updateLocation,
  deleteLocation,
}) => {
  const [locationsList, setLocationsList] = useState([]);
  const [isLocationFormVisible, setIsLocationFormVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(getInitialLocation());

  useEffect(() => {
    if (locations.data) setLocationsList([...locations.data]);
  }, [locations]);

  function handleLocationSave() {
    const newEntity = prepareEntityToSend();

    if (!activeLocation._id) {
      createNewLocation(newEntity);
    } else {
      updateLocation(activeLocation._id, newEntity);
    }

    handleLocationFormClose();
  }

  function handleLocationFormOpen(id = null) {
    setIsLocationFormVisible(true);

    if (!id) {
      return;
    }

    const currentLocation = locationsList.find(
      (location) => location._id === id
    );

    setActiveLocation(currentLocation);
  }

  function handleLocationFormClose() {
    setActiveLocation(getInitialLocation());
    setIsLocationFormVisible(false);
  }

  function getInitialLocation() {
    return {
      slug: "",
      name: "",
      address: "",
    };
  }

  function prepareEntityToSend() {
    return {
      slug: activeLocation.slug,
      name: activeLocation.name,
      address: activeLocation.address,
    };
  }

  return (
    <>
      <CommonButtonWithIcon
        className="right mb20"
        type="button"
        onClick={() => handleLocationFormOpen()}
      >
        <IoAddCircleOutline style={commonButtonIcon} />
        Add location
      </CommonButtonWithIcon>

      {isLocationFormVisible && (
        <ListItemForm>
          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="locationSlug">
              Location slug
            </ListItemFormLabel>

            <ListItemFormInput
              id="locationSlug"
              value={activeLocation.slug}
              onChange={(e) =>
                setActiveLocation({ ...activeLocation, slug: e.target.value })
              }
            />
          </ListItemFieldWrapper>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="locationName">
              Location name
            </ListItemFormLabel>

            <ListItemFormInput
              id="locationName"
              value={activeLocation.name ? activeLocation.name : ""}
              onChange={(e) =>
                setActiveLocation({ ...activeLocation, name: e.target.value })
              }
            />
          </ListItemFieldWrapper>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="locationAddress">
              Location address
            </ListItemFormLabel>

            <ListItemFormInput
              id="locationAddress"
              value={activeLocation.address ? activeLocation.address : ""}
              onChange={(e) =>
                setActiveLocation({
                  ...activeLocation,
                  address: e.target.value,
                })
              }
            />
          </ListItemFieldWrapper>

          <CommonButtonFlexContainer className="right">
            <CommonButtonDanger type="button" onClick={handleLocationFormClose}>
              Close
            </CommonButtonDanger>

            <CommonButtonPrimary type="button" onClick={handleLocationSave}>
              Save
            </CommonButtonPrimary>
          </CommonButtonFlexContainer>
        </ListItemForm>
      )}

      <Table>
        <tbody>
          <TableRow>
            <TableHead>Slug</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {locationsList &&
            locationsList.map((locationItem) => {
              return (
                <TableRow key={locationItem._id}>
                  <TableData>{locationItem.slug}</TableData>
                  <TableData>{locationItem.name}</TableData>
                  <TableData>{locationItem.address}</TableData>
                  <TableData className="action">
                    <CommonButtonPrimary
                      type="button"
                      onClick={() => handleLocationFormOpen(locationItem._id)}
                    >
                      Update
                    </CommonButtonPrimary>
                    <CommonButtonDanger
                      type="button"
                      onClick={() => deleteLocation(locationItem._id)}
                    >
                      Delete
                    </CommonButtonDanger>
                  </TableData>
                </TableRow>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
