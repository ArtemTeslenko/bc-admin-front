import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { FiFilter } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  CommonNavButton,
  CommonButtonDanger,
  FiltersContainer,
  FieldForm,
  FieldLabel,
  FieldInput,
  FieldButton,
  Table,
  TableRow,
  TableHead,
  TableData,
} from "@/assets/styles";
import { Pagination } from "@/assets/components/Pagination";
import { STUDENTS_FILTERS } from "@/assets/constants";
import {
  controlStyles,
  multiValueStyles,
  commonButtonIcon,
} from "@/assets/utils";

export const StudentsList = ({
  students,
  page,
  handleChangePage,
  handleDeleteStudent,
  locationsList,
}) => {
  const studentsList = students.data;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredName, setFilteredName] = useState("");
  const [locationsOptions, setLocationsOptions] = useState([]);

  useEffect(() => {
    if (locationsList.data?.length) {
      const options = prepareLocationsOptions(locationsList);

      setLocationsOptions(options);
    }
  }, [locationsList]);

  function setLocationToSearchParams(e) {
    e.preventDefault();

    searchParams.delete(STUDENTS_FILTERS.location);

    if (filteredLocations.length) {
      filteredLocations.forEach((location) =>
        searchParams.append(STUDENTS_FILTERS.location, location.value)
      );
    }

    setSearchParams(searchParams);
  }

  function setNameToSearchParams(e) {
    e.preventDefault();

    searchParams.delete(STUDENTS_FILTERS.name);

    if (filteredName.trim()) {
      searchParams.append(STUDENTS_FILTERS.name, filteredName);
    }

    setSearchParams(searchParams);
  }

  function getSludentLocationName(locationSlug) {
    return (
      locationsList.data?.find((location) => location.slug === locationSlug)
        ?.name || "No location"
    );
  }

  function prepareLocationsOptions(locations) {
    return locations.data.map(({ name, slug }) => {
      return { label: name, value: slug };
    });
  }

  return (
    <>
      <FiltersContainer>
        <FieldForm onSubmit={setLocationToSearchParams}>
          <FieldLabel>Location</FieldLabel>
          <Select
            value={filteredLocations}
            onChange={(selectedLocation) => {
              if (!selectedLocation.length) {
                setFilteredLocations([]);
                searchParams.delete(STUDENTS_FILTERS.location);
                setSearchParams(searchParams);
              }

              setFilteredLocations(selectedLocation);
            }}
            options={locationsOptions}
            isMulti
            styles={{
              control: controlStyles,
              multiValue: multiValueStyles,
              clearIndicator: (a, b) => ({
                ...a,
                color: "red",
              }),
            }}
          />
          <FieldButton type="button" onClick={setLocationToSearchParams}>
            <FiFilter />
            Filter
          </FieldButton>
        </FieldForm>

        <FieldForm onSubmit={setNameToSearchParams}>
          <FieldLabel>Name</FieldLabel>
          <FieldInput
            value={filteredName}
            onChange={(e) => setFilteredName(e.target.value)}
          />
          <FieldButton type="button" onClick={setNameToSearchParams}>
            <FiFilter />
            Filter
          </FieldButton>
        </FieldForm>
      </FiltersContainer>

      <CommonNavButton
        className="right mb20 flex-center"
        to={"/students/create"}
      >
        <IoAddCircleOutline style={commonButtonIcon} />
        Create student
      </CommonNavButton>

      <Table>
        <tbody>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date of birth</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Info</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {studentsList &&
            studentsList.map((student) => {
              return (
                <TableRow key={student._id}>
                  <TableData>{student.studentName}</TableData>
                  <TableData>{student.studentBirthday}</TableData>
                  <TableData>
                    {getSludentLocationName(student.locationSlug)}
                  </TableData>
                  <TableData>{student.comments}</TableData>
                  <TableData className="action">
                    <CommonNavButton to={student._id}>Update</CommonNavButton>
                    <CommonButtonDanger
                      type="button"
                      onClick={() =>
                        handleDeleteStudent(student._id, student.studentName)
                      }
                    >
                      Delete
                    </CommonButtonDanger>
                  </TableData>
                </TableRow>
              );
            })}
        </tbody>
      </Table>

      <Pagination
        list={students}
        page={page}
        handleChangePage={handleChangePage}
      />
    </>
  );
};
