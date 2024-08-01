import { useState, useEffect } from "react";
import moment from "moment";
import { GoCalendar } from "react-icons/go";
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
  ListItemFieldWrapperGrid,
  ListItemFieldsGrid,
  ListItemFormLabel,
  ListItemFormDatepicker,
  ListItemFormAttention,
} from "@/assets/styles";
import { commonButtonIcon } from "@/assets/utils";

export const PeriodsList = ({ periods, createNewPeriod, deletePeriod }) => {
  const periodsList = periods.data;
  const [isPeriodFormVisible, setIsPeriodFormVisible] = useState(false);
  const [newPeriod, setNewPeriod] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setNewPeriod(
      `${moment(startDate).format("DD.MM.YYYY")} - ${moment(endDate).format(
        "DD.MM.YYYY"
      )}`
    );
  }, [startDate, endDate]);

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
      <CommonButtonWithIcon
        className="right mb20"
        type="button"
        onClick={() => setIsPeriodFormVisible(true)}
      >
        <IoAddCircleOutline style={commonButtonIcon} />
        Add period
      </CommonButtonWithIcon>

      {isPeriodFormVisible && (
        <ListItemForm>
          <ListItemFieldsGrid $columns={2}>
            <ListItemFieldWrapperGrid>
              <ListItemFormLabel htmlFor="periodFrom">
                Date from
              </ListItemFormLabel>

              <ListItemFormDatepicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                dateFormat="dd/MM/yyyy"
                showIcon
                icon={<GoCalendar style={{ width: "14px", height: "14px" }} />}
              />
            </ListItemFieldWrapperGrid>

            <ListItemFieldWrapperGrid>
              <ListItemFormLabel htmlFor="periodTo">Date to</ListItemFormLabel>

              <ListItemFormDatepicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                dateFormat="dd/MM/yyyy"
                showIcon
                icon={<GoCalendar style={{ width: "14px", height: "14px" }} />}
              />
            </ListItemFieldWrapperGrid>
          </ListItemFieldsGrid>

          <ListItemFormAttention>
            {moment(startDate).format("DD.MM.YYYY")} -{" "}
            {moment(endDate).format("DD.MM.YYYY")}
          </ListItemFormAttention>

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
