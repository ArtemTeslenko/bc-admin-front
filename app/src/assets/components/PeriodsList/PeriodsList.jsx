import { useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableData,
  CommonButtonFlexContainer,
  CommonButtonPrimary,
  CommonButtonDanger,
  ListItemForm,
  ListItemFieldWrapper,
  ListItemFormLabel,
  ListItemFormInput,
} from "@/assets/styles";

export const PeriodsList = ({ periods, createNewPeriod, deletePeriod }) => {
  const periodsList = periods.data;
  const [isPeriodFormVisible, setIsPeriodFormVisible] = useState(false);
  const [newPeriod, setNewPeriod] = useState("");

  function handlePeriodCreate() {
    createNewPeriod(newPeriod);
    handlePeriodFormClose();
  }

  function handlePeriodFormClose() {
    setNewPeriod("");
    setIsPeriodFormVisible(false);
  }

  return (
    <>
      <CommonButtonPrimary
        className="right mb20"
        type="button"
        onClick={() => setIsPeriodFormVisible(true)}
      >
        Add period
      </CommonButtonPrimary>

      {isPeriodFormVisible && (
        <ListItemForm>
          <ListItemFieldWrapper>
            <ListItemFormLabel htmlFor="addPeriod">
              Add period
            </ListItemFormLabel>
            <ListItemFormInput
              id="addPeriod"
              value={newPeriod}
              placeholder="dd.mm.yyyy – dd.mm.yyyy"
              onChange={(e) => setNewPeriod(e.target.value)}
            />
          </ListItemFieldWrapper>

          <CommonButtonFlexContainer className="right">
            <CommonButtonDanger type="button" onClick={handlePeriodFormClose}>
              Close
            </CommonButtonDanger>

            <CommonButtonPrimary type="button" onClick={handlePeriodCreate}>
              Create
            </CommonButtonPrimary>
          </CommonButtonFlexContainer>
        </ListItemForm>
      )}

      <Table>
        <tbody>
          <TableRow>
            <TableHead>Period id</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {periodsList &&
            periodsList.map((periodItem) => {
              return (
                <TableRow key={periodItem._id}>
                  <TableData>{periodItem._id}</TableData>
                  <TableData>{periodItem.period}</TableData>
                  <TableData className="action">
                    <CommonButtonDanger
                      type="button"
                      onClick={() => deletePeriod(periodItem._id)}
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
