import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Table, TableRow, TableHead, TableData } from "@/assets/styles";
import {
  CommonNavButton,
  CommonButtonDanger,
  FiltersContainer,
  FieldForm,
  FieldLabel,
  FieldInput,
  FieldButton,
} from "@/assets/styles";
import { Pagination } from "@/assets/components/Pagination";
import { STUDENTS_FILTERS, studentsLocationsOptions } from "@/assets/constants";

export const StudentsList = ({ students, page, handleChangePage }) => {
  const studentsList = students.data;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredLocations, setFilteredLocations] = useState([]);

  function setLocationToSearchParams() {
    console.log("setLocationToSearchParams");
  }

  return (
    <>
      <FiltersContainer>
        <FieldForm>
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
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: "16px",
                boxShadow: "inset 0px 0px 10px 1px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                border: "none",
              }),
              multiValue: (styles, state) => ({
                ...styles,
                backgroundColor: "#e9f9f2",
                borderRadius: "4px",
              }),
            }}
          />
          <FieldButton type="button" onClick={setLocationToSearchParams}>
            Filter
          </FieldButton>
        </FieldForm>
      </FiltersContainer>

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
                        console.log(student._id, student.studentName)
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
