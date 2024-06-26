import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import {
  ListItemFormTitle,
  ListItemForm,
  ListItemFieldsGrid,
  ListItemFieldWrapperGrid,
  ListItemFieldWrapper,
  ListItemFormLabel,
  ListItemFormInput,
  ListItemFormTextarea,
  ListItemFormDatepicker,
  CommonButtonPrimary,
  InnerFormWrapper,
  CommonButtonToggler,
} from "@/assets/styles";
import { arrowStyles, controlStyles, multiValueStyles } from "@/assets/utils";
import {
  studentsCountriesOptions,
  studentsLocationsOptions,
} from "@/assets/constants";
import { Loader } from "@/assets/components/Loader";

export const StudentForm = ({ student, submitStudentChange }) => {
  const {
    _id,
    country,
    location,
    parentName,
    parentPassport,
    parentTaxpayerNumber,
    parentAddress,
    parentPhoneNumber,
    parentEmail,
    studentName,
    studentBirthday,
    campPeriod,
    comments,
  } = student;

  const [countryState, setCountryState] = useState({});
  const [locationState, setLocationState] = useState({});
  const [studentNameState, setStudentNameState] = useState(studentName);
  const [studentBirthdayState, setStudentBirthdayState] =
    useState(studentBirthday);
  const [periodState, setPeriodState] = useState(campPeriod);
  const [commentState, setCommentState] = useState(comments);
  const [parentNameState, setParentNameState] = useState(parentName);
  const [parentPassportState, setParentPassportState] =
    useState(parentPassport);
  const [parentTaxpayerNumberState, setParentTaxpayerNumberState] =
    useState(parentTaxpayerNumber);
  const [parentAddressState, setParentAddressState] = useState(parentAddress);
  const [parentPhoneNumberState, setParentPhoneNumberState] =
    useState(parentPhoneNumber);
  const [parentEmailState, setParentEmailState] = useState(parentEmail);
  const [isParentVisible, setIsParentVisible] = useState(false);
  const [periodsList, setPeriodsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const periods = Object.keys(campPeriod).map((key) => {
      return { label: campPeriod[key], value: key };
    });
    setPeriodState(periods);
  }, [student]);

  useEffect(() => {
    if (country) {
      const countryOption = studentsCountriesOptions.find(
        (option) => option.value === country
      );
      setCountryState(countryOption);
    }

    fetchPeriodsList();
  }, []);

  useEffect(() => {
    if (location) {
      const locationOption = studentsLocationsOptions.find(
        (option) => option.value === location
      );
      setLocationState(locationOption);
    }
  }, []);

  function handleUpdateAction(event) {
    event.preventDefault();

    const newEntity = prepareEntityToSend();

    submitStudentChange(newEntity);
  }

  function prepareEntityToSend() {
    const preparedPeriods = {};
    periodState.forEach(
      (period) => (preparedPeriods[period.value] = period.label)
    );

    const newStudentEntity = {
      location: locationState.value,
      parentName: parentNameState,
      parentPassport: parentPassportState,
      parentTaxpayerNumber: parentTaxpayerNumberState,
      parentAddress: parentAddressState,
      parentPhoneNumber: parentPhoneNumberState,
      parentEmail: parentEmailState,
      studentName: studentNameState,
      studentBirthday: studentBirthdayState,
      campPeriod: preparedPeriods,
      comments: commentState,
      country: countryState.value,
    };

    return newStudentEntity;
  }

  function fetchPeriodsList() {
    setIsLoading(true);

    axios
      .get("api/periods")
      .then((response) => {
        const periodsOptions = preparePeriodsOptions(response.data);
        setPeriodsList(periodsOptions);
      })
      .catch((err) => console.log(console.log(err)))
      .finally(() => setIsLoading(false));
  }

  function preparePeriodsOptions(periods) {
    return periods.data.map((periodItem) => {
      return { label: periodItem.period, value: periodItem._id };
    });
  }

  return (
    <>
      <ListItemFormTitle>Student: {studentName}</ListItemFormTitle>
      {student && (
        <ListItemForm>
          <ListItemFieldsGrid $columns={3}>
            <ListItemFieldWrapperGrid>
              <ListItemFormLabel htmlFor="id">Id</ListItemFormLabel>
              <ListItemFormInput id="id" value={_id} disabled />
            </ListItemFieldWrapperGrid>

            <ListItemFieldWrapperGrid>
              <ListItemFormLabel htmlFor="country">Country</ListItemFormLabel>
              <Select
                id="country"
                value={countryState}
                onChange={(selectedCountry) => setCountryState(selectedCountry)}
                options={studentsCountriesOptions}
                styles={{
                  control: controlStyles,
                  multiValue: multiValueStyles,
                }}
              />
            </ListItemFieldWrapperGrid>

            <ListItemFieldWrapperGrid>
              <ListItemFormLabel htmlFor="location">Location</ListItemFormLabel>
              <Select
                id="location"
                value={locationState}
                onChange={(selectedLocation) =>
                  setLocationState(selectedLocation)
                }
                options={studentsLocationsOptions}
                styles={{
                  control: controlStyles,
                  multiValue: multiValueStyles,
                }}
              />
            </ListItemFieldWrapperGrid>
          </ListItemFieldsGrid>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="studentName">
              Student name
            </ListItemFormLabel>
            <ListItemFormInput
              id="studentName"
              value={studentNameState}
              onChange={(e) => setStudentNameState(e.target.value)}
            />
          </ListItemFieldWrapper>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="studentBirthday">
              Student birthday
            </ListItemFormLabel>
            <ListItemFormInput
              id="studentBirthday"
              value={studentBirthdayState}
              onChange={(e) => setStudentBirthdayState(e.target.value)}
            />
          </ListItemFieldWrapper>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="campPeriod">
              Camp period
            </ListItemFormLabel>
            <Select
              id="campPeriod"
              value={periodState}
              onChange={(selectedPeriod) => setPeriodState(selectedPeriod)}
              options={periodsList}
              isMulti
              styles={{
                control: controlStyles,
                multiValue: multiValueStyles,
              }}
            />
          </ListItemFieldWrapper>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="comments">Comments</ListItemFormLabel>
            <ListItemFormTextarea
              id="comments"
              value={commentState}
              onChange={(e) => setCommentState(e.target.value)}
            />
          </ListItemFieldWrapper>

          <InnerFormWrapper>
            <CommonButtonToggler
              type="button"
              onClick={() => setIsParentVisible(!isParentVisible)}
            >
              {isParentVisible ? (
                <>
                  <span>Hide parent info </span>
                  <IoArrowUpCircleOutline style={arrowStyles} />
                </>
              ) : (
                <>
                  <span>Show parent info </span>
                  <IoArrowDownCircleOutline style={arrowStyles} />
                </>
              )}
            </CommonButtonToggler>

            {isParentVisible && (
              <div>
                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentName">
                    Parent name
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentName"
                    value={parentNameState}
                    onChange={(e) => setParentNameState(e.target.value)}
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentPassport">
                    Parent passport
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentPassport"
                    value={parentPassportState}
                    onChange={(e) => setParentPassportState(e.target.value)}
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentTaxpayerNumber">
                    Parent taxpayer number
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentTaxpayerNumber"
                    value={parentTaxpayerNumberState}
                    onChange={(e) =>
                      setParentTaxpayerNumberState(e.target.value)
                    }
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentAddress">
                    Parent address
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentAddress"
                    value={parentAddressState}
                    onChange={(e) => setParentAddressState(e.target.value)}
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentPhoneNumber">
                    Parent phone
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentPhoneNumber"
                    value={parentPhoneNumberState}
                    onChange={(e) => setParentPhoneNumberState(e.target.value)}
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentEmail">
                    Parent email
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentEmail"
                    value={parentEmailState}
                    onChange={(e) => setParentEmailState(e.target.value)}
                  />
                </ListItemFieldWrapper>
              </div>
            )}
          </InnerFormWrapper>

          <CommonButtonPrimary
            type="submit"
            className="right"
            onClick={(e) => handleUpdateAction(e)}
          >
            Update student
          </CommonButtonPrimary>
        </ListItemForm>
      )}
      <Loader isLoading={isLoading} />
    </>
  );
};
