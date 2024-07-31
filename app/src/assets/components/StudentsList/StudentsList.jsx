import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { FiFilter } from "react-icons/fi";
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
import { STUDENTS_FILTERS, studentsLocationsOptions } from "@/assets/constants";
import { controlStyles, multiValueStyles } from "@/assets/utils";

export const StudentsList = ({
  students,
  page,
  handleChangePage,
  handleDeleteStudent,
}) => {
  const studentsList = students.data;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredName, setFilteredName] = useState("");

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
            options={studentsLocationsOptions}
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

      <CommonNavButton className="right mb20" to={"/students/create"}>
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
                  <TableData>{student.location}</TableData>
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
