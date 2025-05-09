import moment from "moment";
import { useState, useEffect } from "react";
import { IoImageOutline } from "react-icons/io5";
import {
  CampbookPage,
  CampbookMainLogoImage,
  CampbookMainLogoText,
  CampbookPeriod,
  CampbookStarSVG,
  CampbookLocationImageWrapper,
  CampbookMainPageText,
  CampbookMainPageSecondaryText,
  CampbookMainPageGroup,
  CampbookFeebackTitle,
  CampbookFeebackTitleText,
  CampbookFeebackTitleSecondary,
  CampbookFeebackTitleTextSecondary,
  CampbookFeebackContent,
  CampbookFeebackContentTitle,
  CampbookFeebackBottomIcons,
} from "./Campbook.styled";

export const Campbook = ({ student, feedback, locationsList }) => {
  const { locationSlug, studentName, campPeriod } = student;

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

    const formatedName = locationEntity?.name.replace(/\s[A-Z]{2}$/, "");

    return formatedName || "";
  }

  return (
    <>
      <CampbookPage className="page" $pt={"30px"} $pb={"60px"} $bgc={"#CEF488"}>
        <CampbookMainLogoImage />

        <CampbookMainLogoText>Camp Book</CampbookMainLogoText>

        <CampbookPeriod>
          {periodStart &&
            `${periodStart.date().toString().padStart(2, 0)}.${getFormatedMonth(
              periodStart.month() + 1
            )}`}{" "}
          -{" "}
          {periodEnd &&
            `${periodEnd.date().toString().padStart(2, 0)}.${getFormatedMonth(
              periodEnd.month() + 1
            )}`}
        </CampbookPeriod>

        <CampbookStarSVG />

        <CampbookLocationImageWrapper id="mainPageImage">
          <IoImageOutline style={{ width: "670px", height: "515px" }} />
        </CampbookLocationImageWrapper>

        <CampbookMainPageText>
          {getFormatedLocation(locationSlug)} location
        </CampbookMainPageText>

        <CampbookMainPageSecondaryText>
          {studentName}
        </CampbookMainPageSecondaryText>

        <CampbookMainPageGroup>
          Group {feedback.group && feedback.group}
        </CampbookMainPageGroup>
      </CampbookPage>

      <span className="nextPage"></span>

      <CampbookPage
        className="page"
        $pt={"74px"}
        $pb={"150px"}
        $bgc={"#CEF488"}
      >
        <CampbookFeebackTitle>Personalized feedback</CampbookFeebackTitle>
        <CampbookFeebackTitleText>
          from the English teacher at British Camp
        </CampbookFeebackTitleText>

        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            LEVEL OF THE MATERIALS TAUGHT:{" "}
          </CampbookFeebackContentTitle>
          {feedback.materialsTaught && feedback.materialsTaught}
        </CampbookFeebackContent>

        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            FINAL TEST RESULTS:{" "}
          </CampbookFeebackContentTitle>
          {feedback.testResult && feedback.testResult}
        </CampbookFeebackContent>

        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            TOPICS COVERED:{" "}
          </CampbookFeebackContentTitle>
          {feedback.topicsCovered && feedback.topicsCovered}
        </CampbookFeebackContent>

        <CampbookFeebackContent $mb={"52px"}>
          <CampbookFeebackContentTitle>
            WORKING MODE:{" "}
          </CampbookFeebackContentTitle>
          {feedback.workingMode && feedback.workingMode}
        </CampbookFeebackContent>

        <CampbookFeebackTitleSecondary>
          <CampbookFeebackTitleTextSecondary>
            AREAS FOR FURTHER DEVELOPMENT
          </CampbookFeebackTitleTextSecondary>
        </CampbookFeebackTitleSecondary>

        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            In order to further improve speaking skills,{" "}
          </CampbookFeebackContentTitle>
          {feedback.speakingSkills && feedback.speakingSkills}
        </CampbookFeebackContent>
        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            In order to further develop reading skills,{" "}
          </CampbookFeebackContentTitle>
          {feedback.readingSkills && feedback.readingSkills}
        </CampbookFeebackContent>
        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            Listening skills can be further developed by{" "}
          </CampbookFeebackContentTitle>
          {feedback.listeningSkills && feedback.listeningSkills}
        </CampbookFeebackContent>
        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            While speaking of writing skills,{" "}
          </CampbookFeebackContentTitle>
          {feedback.writingSkills && feedback.writingSkills}
        </CampbookFeebackContent>
        <CampbookFeebackContent>
          <CampbookFeebackContentTitle>
            Additional information about the camper:{" "}
          </CampbookFeebackContentTitle>
          {feedback.additionalInfo && feedback.additionalInfo}
        </CampbookFeebackContent>

        <CampbookFeebackBottomIcons />
      </CampbookPage>
    </>
  );
};
