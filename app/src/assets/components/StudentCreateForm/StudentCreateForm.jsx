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
  CommonButtonPrimary,
  InnerFormWrapper,
  CommonButtonToggler,
} from "@/assets/styles";
import { arrowStyles, controlStyles, multiValueStyles } from "@/assets/utils";
import { studentsCountriesOptions } from "@/assets/constants";
import { Loader } from "@/assets/components/Loader";

export const StudentCreateForm = ({
  submitStudentCreate,
  created,
  locationsList,
}) => {
  const [countryState, setCountryState] = useState({});
  const [locationState, setLocationState] = useState({});
  const [studentNameState, setStudentNameState] = useState("");
  const [studentBirthdayState, setStudentBirthdayState] = useState("");
  const [periodState, setPeriodState] = useState(null);
  const [commentState, setCommentState] = useState("");
  const [parentNameState, setParentNameState] = useState("");
  const [parentPassportState, setParentPassportState] = useState("");
  const [parentTaxpayerNumberState, setParentTaxpayerNumberState] =
    useState("");
  const [parentAddressState, setParentAddressState] = useState("");
  const [parentPhoneNumberState, setParentPhoneNumberState] = useState("");
  const [parentEmailState, setParentEmailState] = useState("");
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [periodsList, setPeriodsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationsOptions, setLocationsOptions] = useState([]);

  useEffect(() => {
    fetchPeriodsList();
  }, []);

  useEffect(() => {
    if (created) {
      resetForm();
    }
  }, [created]);

  useEffect(() => {
    if (locationsList.data?.length) {
      const options = prepareLocationsOptions(locationsList);

      setLocationsOptions(options);
    }
  }, [locationsList]);

  function handleCreateAction(event) {
    event.preventDefault();

    const newEntity = prepareEntityToSend();

    submitStudentCreate(newEntity);
  }

  function prepareEntityToSend() {
    const newStudentEntity = {
      locationSlug: locationState.value,
      parentName: parentNameState,
      parentPassport: parentPassportState,
      parentTaxpayerNumber: parentTaxpayerNumberState,
      parentAddress: parentAddressState,
      parentPhoneNumber: parentPhoneNumberState,
      parentEmail: parentEmailState,
      studentName: studentNameState,
      studentBirthday: studentBirthdayState,
      campPeriod: getPreparedPeriodsToSend(),
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

  function prepareLocationsOptions(locations) {
    return locations.data.map(({ name, slug }) => {
      return { label: name, value: slug };
    });
  }

  function getPreparedPeriodsToSend() {
    return periodState?.length
      ? Object.fromEntries(
          periodState.map(({ value, label }) => [value, label])
        )
      : null;
  }

  function resetForm() {
    setCountryState({});
    setLocationState({});
    setStudentNameState("");
    setStudentBirthdayState("");
    setPeriodState(null);
    setCommentState("");
    setParentNameState("");
    setParentPassportState("");
    setParentTaxpayerNumberState("");
    setParentAddressState("");
    setParentPhoneNumberState("");
    setParentEmailState("");
  }

  return (
    <>
      <ListItemFormTitle>Create new student</ListItemFormTitle>

      <ListItemForm>
        <ListItemFieldsGrid $columns={2}>
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
              options={locationsOptions}
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
                  onChange={(e) => setParentTaxpayerNumberState(e.target.value)}
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
          onClick={(e) => handleCreateAction(e)}
        >
          Create student
        </CommonButtonPrimary>
      </ListItemForm>

      <Loader isLoading={isLoading} />
    </>
  );
};
