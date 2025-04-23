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
            Participation Agreement
            <br />
            for the British Camp
          </Title>

          <VoucherHeaderInfo>
            <p>
              Location: <span>{getFormatedLocation(locationSlug)}</span>
            </p>
            <p>
              Period of Stay: <span>from </span>
              {periodStart && (
                <span>
                  {periodStart.date().toString().padStart(2, 0)}.
                  {getFormatedMonth(periodStart.month() + 1)}.
                  {periodStart.year()}
                </span>
              )}{" "}
              <span>to </span>
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
              Concluded on the «
              {agreementState && (
                <span>
                  {agreementState.date().toString().padStart(2, 0)}.
                  {getFormatedMonth(agreementState.month() + 1)}
                </span>
              )}
              » day of {agreementState && agreementState.year()}, between:
            </VoucherBodySubtitleM>
          </VoucherBodySection>

          <VoucherBodySection>
            <VoucherBodySubtitleL style={{ textTransform: "uppercase" }}>
              Organizer: British Camp Sp. z o.o.
            </VoucherBodySubtitleL>

            <VoucherSectionList>
              <VoucherSectionListItem>
                <p>
                  Registered address:{" "}
                  <span>WARSZAWA, 03-216, MODLIŃSKA 6A/222</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Phone: <a href="tel:+48799360620">+48799360620</a>
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
                  Tax Identification Number (NIP): <span>5242956029</span>
                </p>
              </VoucherSectionListItem>
            </VoucherSectionList>

            <VoucherBodySubtitleS $mb={"16px"}>
              Bank accounts for payments:
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
              Represented by:{" "}
              <span>Vitalii Bresler, President of the Board</span>
            </VoucherBodySubtitleS>
          </VoucherBodySection>

          <VoucherBodySection>
            <VoucherBodySubtitleL style={{ textTransform: "uppercase" }}>
              And Legal Guardian/Adult Participant
            </VoucherBodySubtitleL>

            <VoucherBodySubtitleS $mb={"16px"}>
              Details of the Legal Guardian/Adult Participant:
            </VoucherBodySubtitleS>

            <VoucherSectionList>
              <VoucherSectionListItem>
                <p>
                  Full name: <span>{parentName}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Guardian's ID number: <span>{parentPassport}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Address: <span>{parentAddress}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Phone number: <span>{parentPhoneNumber}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  E-mail address: <span>{parentEmail}</span>
                </p>
              </VoucherSectionListItem>
            </VoucherSectionList>

            <VoucherBodySubtitleS $mb={"16px"}>
              Details of the Camp Participant:
            </VoucherBodySubtitleS>

            <VoucherSectionList>
              <VoucherSectionListItem>
                <p>
                  Full name: <span>{studentName}</span>
                </p>
              </VoucherSectionListItem>

              <VoucherSectionListItem>
                <p>
                  Date of birth:{" "}
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
                The subject of the Agreement is the participation of the
                Participant in the camp organized by the Organizer.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                Detailed information regarding the camp is available on the
                website <a href={clientUrl}>&#40;link&#41;</a>, accessible for
                review by the Guardian before concluding the Agreement.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                The Guardian agrees to all rules and conditions specified on the
                website, including payment amounts, payment deadlines, and other
                relevant terms.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                The Guardian undertakes to make the full payment no later than
                30 days before the start of the camp. The Guardian acknowledges
                that the Contractor allocates at least 30% of the Service fee to
                cover basic and essential costs necessary for the provision of
                the Services, which are non-refundable to the Guardian,
                regardless of the reason for withdrawal from the Services and/or
                termination of the Agreement.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                The Guardian is obliged to complete the Qualification Form prior
                to the start of the camp and provide all relevant medical
                restrictions or contraindications concerning the Participant.
              </VoucherFooterListItem>

              <VoucherFooterListItem>
                The Organizer undertakes to organize the Camp following the
                conditions specified on the website{" "}
                <a href={clientUrl}>&#40;link&#41;</a> for the person indicated
                by the Guardian, i.e., the Participant, for an appropriate fee
                in the form of an Advance Payment and Camp Fee.
              </VoucherFooterListItem>
            </VoucherFooterList>

            <VoucherFooterAccess>
              <VoucherFooterLogo />

              <VoucherFooterSigns>
                <VoucherFooterClientPlaceholder>
                  / Signature of the guardian /
                </VoucherFooterClientPlaceholder>

                <VoucherFooterManagerNamePlEng />

                <VoucherFooterManagerSignPlEng />

                <VoucherFooterManagerPlaceholder>
                  / Signature of the organizer /
                </VoucherFooterManagerPlaceholder>
              </VoucherFooterSigns>
            </VoucherFooterAccess>
          </VoucherFooter>
        </VoucherBody>
      </VoucherContainer>
    </>
  );
};
