import moment from "moment";
import { useState, useEffect } from "react";
import {
  VoucherContainer,
  Title,
  TradeMark,
  ContainersWrapper,
  ContainerInfo,
  SectionInfo,
  SectionInfoTitle,
  SectionInfoField,
  SectionInfoLabel,
  SectionInfoName,
  SectionInfoDate,
  SectionInfoDateItem,
  ContainerContacts,
  ContactsTitle,
  ContactsList,
  ContactsListItem,
  ContactsLink,
  ContactsText,
  ContactsNotification,
} from "./Voucher.styled";
import { studentsLocationsAddress } from "@/assets/constants";

export const Voucher = ({ student }) => {
  const { location, studentName, studentBirthday, parentName, campPeriod } =
    student;
  const [birthday, setBirthday] = useState(
    moment(studentBirthday, "DD.MM.YYYY")
  );
  const [periodStart, setPeriodStart] = useState(null);
  const [periodEnd, setPeriodEnd] = useState(null);

  useEffect(() => {
    const periodsKeys = Object.keys(campPeriod);

    const allPeriods = periodsKeys
      .map((key) => {
        if (campPeriod[key].includes("–")) {
          return campPeriod[key].split("–"); //	&ndash;
        }
        if (campPeriod[key].includes("-")) {
          return campPeriod[key].split("-"); //&#0;
        }
      })
      .flat();

    const minPeriod = allPeriods.reduce((prevValue, currValue) => {
      return moment(currValue.trim(), "DD.MM.YYYY").unix() <
        moment(prevValue.trim(), "DD.MM.YYYY").unix()
        ? currValue.trim()
        : prevValue.trim();
    });

    const maxPeriod = allPeriods.reduce((prevValue, currValue) => {
      return moment(currValue.trim(), "DD.MM.YYYY").unix() >
        moment(prevValue.trim(), "DD.MM.YYYY").unix()
        ? currValue.trim()
        : prevValue.trim();
    });

    setPeriodStart(moment(minPeriod, "DD.MM.YYYY"));
    setPeriodEnd(moment(maxPeriod, "DD.MM.YYYY"));
  }, []);

  function getFormatedMonth(month) {
    return month.toString().padStart(2, 0);
  }

  function getFormatedLocation(studentLocation) {
    const locationAddres = studentsLocationsAddress.find(
      (a) => a.location === studentLocation
    );
    return locationAddres.address;
  }

  return (
    <>
      <VoucherContainer className="page">
        <Title>Voucher na wakacje i praktyki językowe od </Title>

        <TradeMark>тм</TradeMark>

        <ContainersWrapper>
          <ContainerInfo>
            <SectionInfo>
              <SectionInfoTitle>Informacje o uczestniku:</SectionInfoTitle>
              <SectionInfoField>
                <SectionInfoLabel>Imię i nazwisko:</SectionInfoLabel>
                <SectionInfoName id="voucherStudentName">
                  {studentName}
                </SectionInfoName>
              </SectionInfoField>
              <SectionInfoField>
                <SectionInfoLabel>Data urodzenia:</SectionInfoLabel>
                <SectionInfoDate>
                  <SectionInfoDateItem id="voucherStudentDay">
                    {birthday.date().toString().padStart(2, 0)}
                  </SectionInfoDateItem>
                  <SectionInfoDateItem id="voucherStudentMounth">
                    {getFormatedMonth(birthday.month() + 1)}
                  </SectionInfoDateItem>
                  <SectionInfoDateItem id="voucherStudentYear">
                    {birthday.year()}
                  </SectionInfoDateItem>
                </SectionInfoDate>
              </SectionInfoField>
            </SectionInfo>
            <SectionInfo>
              <SectionInfoTitle>Informacje o Kliencie:</SectionInfoTitle>
              <SectionInfoField>
                <SectionInfoLabel>Imię i nazwisko:</SectionInfoLabel>
                <SectionInfoName id="voucherParentName">
                  {parentName}
                </SectionInfoName>
              </SectionInfoField>
            </SectionInfo>
            <SectionInfo>
              <SectionInfoTitle>Adres do odbioru usług:</SectionInfoTitle>
              <SectionInfoField>
                <SectionInfoName id="voucherServiceAddress">
                  {getFormatedLocation(location)}
                </SectionInfoName>
              </SectionInfoField>
            </SectionInfo>
            <SectionInfo>
              <SectionInfoTitle>Okres świadczenia usług:</SectionInfoTitle>
              <SectionInfoField>
                <SectionInfoLabel>Data rozpoczęcia pobytu:</SectionInfoLabel>
                {periodStart && (
                  <SectionInfoDate>
                    <SectionInfoDateItem id="voucherStartPeriodDay">
                      {periodStart.date().toString().padStart(2, 0)}
                    </SectionInfoDateItem>
                    <SectionInfoDateItem id="voucherStartPeriodMounth">
                      {getFormatedMonth(periodStart.month() + 1)}
                    </SectionInfoDateItem>
                    <SectionInfoDateItem id="voucherStartPeriodYear">
                      {periodStart.year()}
                    </SectionInfoDateItem>
                  </SectionInfoDate>
                )}
              </SectionInfoField>
              <SectionInfoField>
                <SectionInfoLabel>Data zakończenia pobytu:</SectionInfoLabel>
                {periodEnd && (
                  <SectionInfoDate>
                    <SectionInfoDateItem id="voucherStartPeriodDay">
                      {periodEnd.date().toString().padStart(2, 0)}
                    </SectionInfoDateItem>
                    <SectionInfoDateItem id="voucherStartPeriodMounth">
                      {getFormatedMonth(periodEnd.month() + 1)}
                    </SectionInfoDateItem>
                    <SectionInfoDateItem id="voucherStartPeriodYear">
                      {periodEnd.year()}
                    </SectionInfoDateItem>
                  </SectionInfoDate>
                )}
              </SectionInfoField>
            </SectionInfo>
          </ContainerInfo>

          <ContainerContacts>
            <ContactsTitle>Informacja kontaktowa:</ContactsTitle>

            <ContactsList>
              <ContactsListItem>
                <ContactsLink href="tel:+48739270377">
                  Numer telefonu: <span>+48 739 270 377</span>
                </ContactsLink>
              </ContactsListItem>
              <ContactsListItem className="flex">
                <ContactsText>Email:</ContactsText>
                <ContactsLink
                  href="mailto:hello@british.camp"
                  className="underlined"
                >
                  hello@british.camp
                </ContactsLink>
              </ContactsListItem>
              <ContactsListItem>
                <ContactsLink
                  href="https://www.instagram.com/britishcamp.pl?igsh=ZGdjaTN1eHhnZ212"
                  className="underlined"
                >
                  INSTAGRAM
                </ContactsLink>
              </ContactsListItem>
            </ContactsList>

            <ContactsNotification>
              *Voucher nabiera ważności po opłaceniu rachunku przez Klienta
            </ContactsNotification>
          </ContainerContacts>
        </ContainersWrapper>
      </VoucherContainer>
    </>
  );
};
