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
  VoucherFooterManagerNamePlEng,
  VoucherFooterManagerSignPlEng,
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
    parentTaxpayerNumber,
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
    <>
      <VoucherContainer className="page">
        <VoucherHeader>
          <Title>
            Umowa uczestnictwa
            <br />w obozie "BRITISH CAMP"
          </Title>

          <VoucherHeaderInfo>
            <p>
              Lokalizacja: <span>{getFormatedLocation(locationSlug)}</span>
            </p>
            <p>
              Terminy sesji: <span>od </span>
              {periodStart && (
                <span>
                  {periodStart.date().toString().padStart(2, 0)}.
                  {getFormatedMonth(periodStart.month() + 1)}.
                  {periodStart.year()}
                </span>
              )}{" "}
              <span>do </span>
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
              Zawarta w dniu «
              {agreementState && (
                <span>
                  {agreementState.date().toString().padStart(2, 0)}.
                  {getFormatedMonth(agreementState.month() + 1)}
                </span>
              )}
              » {agreementState && agreementState.year()} roku pomiędzy:
            </VoucherBodySubtitleM>
          </VoucherBodySection>

          <VoucherBodySection>
            <VoucherBodySubtitleL style={{ textTransform: "uppercase" }}>
              Organizatorem: British Camp Sp. z o.o.
            </VoucherBodySubtitleL>

            <VoucherSectionList>
              <VoucherSectionListItem>
                <p>
                  Adres: <span>WARSZAWA, 03-216, MODLIŃSKA 6A/222</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Telefon: <a href="tel:+48799360556">+48799360556</a>
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
                  NIP: <span>5242956029</span>
                </p>
              </VoucherSectionListItem>
            </VoucherSectionList>

            <VoucherBodySubtitleS $mb={"16px"}>
              Konto do wpłat:
            </VoucherBodySubtitleS>

            <VoucherSectionList>
              <VoucherSectionListItem>
                <p>
                  <span>
                    BRITISH CAMP Spółka z ograniczoną odpowiedzialnością (EUR):
                    PKO Bank 33102010420000830205243953
                  </span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  <span>
                    BRITISH CAMP Spółka z ograniczoną odpowiedzialnością (PLN):
                    PKO Bank 55102010420000810205243946
                  </span>
                </p>
              </VoucherSectionListItem>
            </VoucherSectionList>

            <VoucherBodySubtitleS>
              Reprezentowanym przez:{" "}
              <span>Vitalii Bresler, Prezes zarządu</span>
            </VoucherBodySubtitleS>
          </VoucherBodySection>

          <VoucherBodySection>
            <VoucherBodySubtitleL style={{ textTransform: "uppercase" }}>
              Oraz Opiekunem prawnym/pełnoletnim uczestnikiem:
            </VoucherBodySubtitleL>

            <VoucherSectionList>
              <VoucherSectionListItem>
                <p>
                  Imię i Nazwisko: <span>{parentName}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Numer dowodu osobistego opiekuna:{" "}
                  <span>{parentPassport}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  PESEL: <span>{parentTaxpayerNumber}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Adres: <span>{parentAddress}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Numer telefonu: <span>{parentPhoneNumber}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Adres E-mail: <span>{parentEmail}</span>
                </p>
              </VoucherSectionListItem>
            </VoucherSectionList>

            <VoucherBodySubtitleS $mb={"16px"}>
              Szczegóły uczestnika campu:
            </VoucherBodySubtitleS>

            <VoucherSectionList>
              <VoucherSectionListItem>
                <p>
                  Imię i Nazwisko: <span>{studentName}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Data urodzenia:{" "}
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
                Przedmiotem umowy jest udział Uczestnika w obozie organizowanym
                przez Organizatora.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                Szczegółowe informacje dotyczące obozu znajdują się na stronie
                internetowej: <a href={clientUrl}>&#40;link&#41;</a>, dostępnej
                do zapoznania się przez Opiekuna przed zawarciem Umowy.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                Opiekun akceptuje wszystkie zasady i warunki określone na
                stronie internetowej, w tym wysokość opłat, terminy ich
                uiszczenia itp.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                Opiekun zobowiązuje się do uiszczenia pełnej kwoty nie później
                niż 30 dni przed rozpoczęciem obozu. Opiekun akceptuje, że co
                najmniej 30% wartości Usług jest przeznaczane przez Wykonawcę na
                pokrycie podstawowych i niezbędnych kosztów organizacyjnych,
                które nie podlegają zwrotowi Opiekunowi, niezależnie od
                przyczyny rezygnacji z Usług i/lub rozwiązania Umowy.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                Opiekun zobowiązuje się do wypełnienia Karty Kwalifikacyjnej
                przed rozpoczęciem obozu oraz do podania wszelkich ograniczeń
                medycznych i przeciwwskazań dotyczących Uczestnika.
              </VoucherFooterListItem>
            </VoucherFooterList>

            <VoucherFooterAccess>
              <VoucherFooterLogo />

              <VoucherFooterSigns>
                <VoucherFooterClientPlaceholder>
                  / Podpis Opiekuna/petnoletniego uczestnika /
                </VoucherFooterClientPlaceholder>

                <VoucherFooterManagerNamePlEng />

                <VoucherFooterManagerSignPlEng />

                <VoucherFooterManagerPlaceholder>
                  / Podpis Organizatora /
                </VoucherFooterManagerPlaceholder>
              </VoucherFooterSigns>
            </VoucherFooterAccess>
          </VoucherFooter>
        </VoucherBody>
      </VoucherContainer>
    </>
  );
};
