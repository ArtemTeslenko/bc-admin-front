import moment from "moment";
import { useState, useEffect } from "react";
import {
  VoucherContainer,
  VoucherHeader,
  Title,
  VoucherHeaderInfo,
  VoucherBody,
  VoucherBodySection,
  VoucherBodySubtitleL,
  VoucherBodySubtitleM,
  VoucherBodySubtitleS,
  VoucherSectionList,
  VoucherSectionListItem,
  VoucherFooter,
  VoucherFooterList,
  VoucherFooterListItem,
  VoucherFooterAccess,
  VoucherFooterLogo,
  VoucherFooterSigns,
  VoucherFooterClientPlaceholder,
  VoucherFooterManagerPlaceholder,
  VoucherFooterManagerName,
  VoucherFooterManagerSign,
} from "./Voucher.styled";
import { CLIENT_BASE_URL } from "@/assets/constants";

export const Voucher = ({ student, locationsList }) => {
  const {
    locationSlug,
    studentName,
    studentBirthday,
    parentName,
    parentAddress,
    parentPassport,
    parentPhoneNumber,
    parentEmail,
    campPeriod,
    country,
    agreementDate,
  } = student;
  const [birthday, setBirthday] = useState(
    moment(studentBirthday, "DD.MM.YYYY")
  );
  const [periodStart, setPeriodStart] = useState(null);
  const [periodEnd, setPeriodEnd] = useState(null);
  const [clientUrl, setClientUrl] = useState("");
  const [agreementState, setAgreementState] = useState(null);

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

  useEffect(() => {
    if (country && locationSlug) {
      const url = CLIENT_BASE_URL.replace("{country}", country).replace(
        "{location}",
        locationSlug
      );

      setClientUrl(url);
    }
  }, [country, locationSlug]);

  useEffect(() => {
    const formatedAgreementDate = moment(agreementDate).format("DD.MM.YYYY");

    setAgreementState(moment(formatedAgreementDate, "DD.MM.YYYY"));
  }, [agreementDate]);

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
      <VoucherHeader>
        <Title>
          Путівка на відпочинок
          <br />
          та мовний практикум
        </Title>

        <VoucherHeaderInfo>
          <p>
            Локація: <span>{getFormatedLocation(locationSlug)}</span>
          </p>
          <p>
            Період перебування: <span>з </span>
            {periodStart && (
              <span>
                {periodStart.date().toString().padStart(2, 0)}.
                {getFormatedMonth(periodStart.month() + 1)}.{periodStart.year()}
              </span>
            )}{" "}
            <span>до </span>
            {periodEnd && (
              <span>
                {periodEnd.date().toString().padStart(2, 0)}.
                {getFormatedMonth(periodEnd.month() + 1)}.{periodEnd.year()}
              </span>
            )}
          </p>
        </VoucherHeaderInfo>
      </VoucherHeader>

      <VoucherBody>
        <VoucherBodySection>
          <VoucherBodySubtitleM>
            Укладений «
            {agreementState && (
              <span>
                {agreementState.date().toString().padStart(2, 0)}.
                {getFormatedMonth(agreementState.month() + 1)}
              </span>
            )}
            » {agreementState && agreementState.year()} року між:
          </VoucherBodySubtitleM>
        </VoucherBodySection>

        <VoucherBodySection>
          <VoucherBodySubtitleL>
            ОРГАНІЗАТОРОМ: BRITISH CAMP
          </VoucherBodySubtitleL>

          <VoucherSectionList>
            <VoucherSectionListItem>
              <p>
                Юридична адреса:{" "}
                <span>
                  бульвар Миколи Міхновського, 7, офіс 22, Київ, 02000
                </span>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                Телефон: <a href="tel:+380632326009">+380632326009</a>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                E-mail:{" "}
                <a href="mailto:hello@british.camp">hello@british.camp</a>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                Ідентифікаційний номер платника податків (ЄРДПОУ):{" "}
                <span>ТОВ “БРІТІШ КЕМП” ЄДРПОУ: 45065361</span>
              </p>
            </VoucherSectionListItem>
          </VoucherSectionList>

          <VoucherBodySubtitleS>
            Представлений: <span>директором Федорченко О. С.</span>
          </VoucherBodySubtitleS>
        </VoucherBodySection>

        <VoucherBodySection>
          <VoucherBodySubtitleL>
            ТА ПРЕДСТАВНИКОМ ЗАМОВНИКА:
          </VoucherBodySubtitleL>

          <VoucherSectionList>
            <VoucherSectionListItem>
              <p>
                ПІБ: <span>{parentName}</span>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                Адреса проживання: <span>{parentAddress}</span>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                Номер документа, що посвідчує особу (паспорт / ID-картка)
                Замовника: <span>{parentPassport}</span>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                Контактний номер телефону: <span>{parentPhoneNumber}</span>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                E-mail адреса: <span>{parentEmail}</span>
              </p>
            </VoucherSectionListItem>
          </VoucherSectionList>

          <VoucherBodySubtitleS $mb={"16px"}>Учасником:</VoucherBodySubtitleS>

          <VoucherSectionList>
            <VoucherSectionListItem>
              <p>
                ПІБ: <span>{studentName}</span>
              </p>
            </VoucherSectionListItem>

            <VoucherSectionListItem>
              <p>
                Дата народження:{" "}
                {birthday && (
                  <span>
                    {birthday.date().toString().padStart(2, 0)}.
                    {getFormatedMonth(birthday.month() + 1)}.{birthday.year()}
                  </span>
                )}
              </p>
            </VoucherSectionListItem>
          </VoucherSectionList>
        </VoucherBodySection>

        <VoucherFooter>
          <VoucherFooterList>
            <VoucherFooterListItem>
              Предметом договору є перебування Учасника на відпочинку та мовному
              практикумі, що проводить Організатор.
            </VoucherFooterListItem>

            <VoucherFooterListItem>
              Детальна інформація щодо відпочинку та мовного практикуму
              розміщена на вебсайті: <a href={clientUrl}>&#40;посилання&#41;</a>
              , доступному для Ознайомлення перед укладенням Договору.
            </VoucherFooterListItem>

            <VoucherFooterListItem>
              Замовник погоджується з усіма правилами та умовами на сайті, в
              тому числі з сумою оплат, термінами їх внесення тощо.
            </VoucherFooterListItem>

            <VoucherFooterListItem>
              Замовник зобов'язується внести повну вартість не пізніше ніж за 30
              днів до початку періоду надання послуг. Замовник погоджується, що
              принаймні 30% вартості Послуг спрямовуються Виконавцем на покриття
              базових та обов’язкових для організації процесу надання Послуг
              витрат, які не підлягають поверненню Замовнику незалежно від
              причин відмови від Послуг та/або розірвання Договору.
            </VoucherFooterListItem>

            <VoucherFooterListItem>
              Замовник зобов'язується перед початком отримання послуг вказати
              всі медичні обмеження та протипоказання для Учасника.
            </VoucherFooterListItem>
          </VoucherFooterList>

          <VoucherFooterAccess>
            <VoucherFooterLogo />

            <VoucherFooterSigns>
              <VoucherFooterClientPlaceholder>
                / Підпис Замовника /
              </VoucherFooterClientPlaceholder>

              <VoucherFooterManagerSign />

              <VoucherFooterManagerName>
                Федорченко О. С.
              </VoucherFooterManagerName>

              <VoucherFooterManagerPlaceholder>
                / Підпис Організатора /
              </VoucherFooterManagerPlaceholder>
            </VoucherFooterSigns>
          </VoucherFooterAccess>
        </VoucherFooter>
      </VoucherBody>
    </VoucherContainer>
  );
};
