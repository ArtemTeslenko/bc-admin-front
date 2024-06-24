import { useState, useEffect } from "react";
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
  CommonButtonPrimary,
  InnerFormWrapper,
  CommonButtonToggler,
} from "@/assets/styles";
import { arrowStyles } from "@/assets/utils";
import { UaVoucher } from "../Vouchers/UaVoucher";

export const StudentForm = ({ student }) => {
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
  const [period, setPeriod] = useState("");
  const [isParentVisible, setIsParentVisible] = useState(false);

  useEffect(() => setPeriod(campPeriod[Object.keys(campPeriod)[0]]), [student]);

  // const [studentName, setStudentName] = useState(name);
  // const [studentSurname, setStudentSurname] = useState(surname);
  // const [studentMiddlename, setStudentMiddlename] = useState(middlename);
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
              <ListItemFormInput id="country" value={country} disabled />
            </ListItemFieldWrapperGrid>

            <ListItemFieldWrapperGrid>
              <ListItemFormLabel htmlFor="location">Location</ListItemFormLabel>
              <ListItemFormInput id="location" value={location} disabled />
            </ListItemFieldWrapperGrid>
          </ListItemFieldsGrid>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="studentBirthday">
              Student birthday
            </ListItemFormLabel>
            <ListItemFormInput
              id="studentBirthday"
              value={studentBirthday}
              disabled
            />
          </ListItemFieldWrapper>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="campPeriod">
              Camp period
            </ListItemFormLabel>
            <ListItemFormInput id="campPeriod" value={period} disabled />
          </ListItemFieldWrapper>

          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="comments">Comments</ListItemFormLabel>
            <ListItemFormInput id="comments" value={comments} disabled />
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
                    value={parentName}
                    disabled
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentPassport">
                    Parent passport
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentPassport"
                    value={parentPassport}
                    disabled
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentTaxpayerNumber">
                    Parent taxpayer number
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentTaxpayerNumber"
                    value={parentTaxpayerNumber}
                    disabled
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentAddress">
                    Parent address
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentAddress"
                    value={parentAddress}
                    disabled
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentPhoneNumber">
                    Parent phone
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentPhoneNumber"
                    value={parentPhoneNumber}
                    disabled
                  />
                </ListItemFieldWrapper>

                <ListItemFieldWrapper>
                  <ListItemFormLabel htmlFor="parentEmail">
                    Parent email
                  </ListItemFormLabel>
                  <ListItemFormInput
                    id="parentEmail"
                    value={parentEmail}
                    disabled
                  />
                </ListItemFieldWrapper>
              </div>
            )}
          </InnerFormWrapper>

          <CommonButtonPrimary
            type="submit"
            className="right"
            onClick={(e) => {
              e.preventDefault();
              // submitRoleChange(userRole);
            }}
          >
            Update student
          </CommonButtonPrimary>
        </ListItemForm>
      )}
      <UaVoucher />
    </>
  );
};