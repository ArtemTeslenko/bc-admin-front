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

export const Voucher = ({ student, locationsList }) => {
  const { locationSlug, studentName, studentBirthday, parentName, campPeriod } =
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
      return moment(currValue.trim(), "DD.MM.YYYY") <
        moment(prevValue.trim(), "DD.MM.YYYY")
        ? currValue.trim()
        : prevValue.trim();
    });

    const maxPeriod = allPeriods.reduce((prevValue, currValue) => {
      return moment(currValue.trim(), "DD.MM.YYYY") >
        moment(prevValue.trim(), "DD.MM.YYYY")
        ? currValue.trim()
        : prevValue.trim();
    });

    setPeriodStart(moment(minPeriod, "DD.MM.YYYY"));
    setPeriodEnd(moment(maxPeriod, "DD.MM.YYYY"));
  }, []);

  function getFormatedMonth(month) {
    return month.toString().padStart(2, 0);
  }

  function getFormatedLocation(locationSlug) {
    const locationEntity = locationsList.data.find(
      (location) => location.slug === locationSlug
    );
    return locationEntity?.address || "";
  }

  return (
    <VoucherContainer className="page">
      <Title>Путівка на відпочинок та мовний практикум від</Title>

      <TradeMark>тм</TradeMark>

      <ContainersWrapper>
        <ContainerInfo>
          <SectionInfo>
            <SectionInfoTitle>Інформація про учасника:</SectionInfoTitle>
            <SectionInfoField>
              <SectionInfoLabel>Прізвище, ім'я, по-батькові:</SectionInfoLabel>
              <SectionInfoName id="voucherStudentName">
                {studentName}
              </SectionInfoName>
            </SectionInfoField>
            <SectionInfoField>
              <SectionInfoLabel>Дата народження:</SectionInfoLabel>
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
            <SectionInfoTitle>Інформація про Замовника:</SectionInfoTitle>
            <SectionInfoField>
              <SectionInfoLabel>Прізвище, ім'я, по-батькові:</SectionInfoLabel>
              <SectionInfoName id="voucherParentName">
                {parentName}
              </SectionInfoName>
            </SectionInfoField>
          </SectionInfo>
          <SectionInfo>
            <SectionInfoTitle>Адреса отримання послуг:</SectionInfoTitle>
            <SectionInfoField>
              <SectionInfoName id="voucherServiceAddress">
                {getFormatedLocation(locationSlug)}
              </SectionInfoName>
            </SectionInfoField>
          </SectionInfo>
          <SectionInfo>
            <SectionInfoTitle>Період надання послуг:</SectionInfoTitle>
            <SectionInfoField>
              <SectionInfoLabel>Дата початку перебування:</SectionInfoLabel>
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
              <SectionInfoLabel>Дата завершення перебування:</SectionInfoLabel>
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
          <ContactsTitle>Контактна інформація:</ContactsTitle>

          <ContactsList>
            <ContactsListItem>
              <ContactsLink href="tel:+380739467973">
                Номер телефону: <span>+38 073 946 7973</span>
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
                href="https://www.instagram.com/britishcamp.ua?igsh=YWpuYzJqbTA0OTVh"
                className="underlined"
              >
                INSTAGRAM
              </ContactsLink>
            </ContactsListItem>
          </ContactsList>

          <ContactsNotification>
            *Путівка набуває чинності після сплати рахунку Замовником
          </ContactsNotification>
        </ContainerContacts>
      </ContainersWrapper>
    </VoucherContainer>
  );
};
