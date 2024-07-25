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
  CampbookMainPagePhotosLink,
  CampbookSessionSvgDecoration,
  CampbookSessionImageBackground,
  CampbookSessionImageWrapper,
  CampbookSessionLogoWrapper,
  CampbookSessionSummary,
  CampbookSessionSummaryText,
  CampbookSessionSummaryPseudoButton,
  CampbookSessionText,
  CampbookAchievementsTitleTextFirst,
  CampbookAchievementsTitleTextSecond,
  CampbookAchievementsText,
  CampbookAchievementsBottomIcons,
  CampbookHeroesTitleTextFirst,
  CampbookHeroesTitleTextSecond,
  CampbookHeroesInfoWrapper,
  CampbookHeroesInfoHeroBlock,
  CampbookHeroesInfoPhoto,
  CampbookHeroesInfoTitle,
  CampbookHeroesImageBackground,
  CampbookHeroesImageWrapper,
  CampbookHeroesBottomIcons,
  CampbookFeebackTitle,
  CampbookFeebackTitleText,
  CampbookFeebackContent,
  CampbookFeebackBottomIcons,
} from "./Campbook.styled";
import { studentsLocationsSimple, programText } from "@/assets/constants";

export const Campbook = ({
  student,
  teacherName,
  tutorName,
  feedback,
  photosUrl,
}) => {
  const { location, studentName, campPeriod, country } = student;

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

  useEffect(() => {
    const textWrapper = document.getElementById("achievementsText");
    const campbookProgramText = programText.find((text) => {
      return text.country === country && text[location] ? text[location] : "";
    });

    textWrapper.innerHTML = campbookProgramText[location]
      ? campbookProgramText[location]
      : "";
  }, []);

  function getFormatedMonth(month) {
    return month.toString().padStart(2, 0);
  }

  function getFormatedLocation(studentLocation) {
    const locationAddres = studentsLocationsSimple.find(
      (locationAdresses) => locationAdresses.location === studentLocation
    );
    return locationAddres.address;
  }

  return (
    <>
      <CampbookPage className="page" $pt={"36px"} $pb={"60px"} $bgc={"#e1efa1"}>
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
          {getFormatedLocation(location)} location
        </CampbookMainPageText>

        <CampbookMainPageText>{studentName}</CampbookMainPageText>

        <CampbookMainPagePhotosLink href={photosUrl ? photosUrl : ""}>
          Photo report
        </CampbookMainPagePhotosLink>
      </CampbookPage>

      <span className="nextPage"></span>

      <CampbookPage
        className="page"
        $pt={"100px"}
        $pb={"60px"}
        $bgc={"#e1efa1"}
      >
        <CampbookSessionSvgDecoration />
        <CampbookSessionImageBackground>
          <CampbookSessionImageWrapper id="sessionPageImage">
            <IoImageOutline style={{ width: "638px", height: "456px" }} />
          </CampbookSessionImageWrapper>
        </CampbookSessionImageBackground>

        <CampbookSessionLogoWrapper />

        <CampbookSessionSummary>
          <CampbookSessionSummaryText>Session</CampbookSessionSummaryText>
          <CampbookSessionSummaryPseudoButton>
            Summary
          </CampbookSessionSummaryPseudoButton>
        </CampbookSessionSummary>

        <CampbookSessionText>
          If you have received this letter, one of the camp sessions has
          concluded! At the closing ceremony, we agreed with the campers to meet
          again to create even more shared memories :)
        </CampbookSessionText>

        <CampbookSessionText>
          Our team managed to organize a comfortable and adventure-filled stay
          for the campers. We invite you to take a look at how it went!
        </CampbookSessionText>
      </CampbookPage>

      <span className="nextPage"></span>

      <CampbookPage
        className="page"
        $pt={"75px"}
        $pb={"200px"}
        $bgc={"#FAE0C8"}
      >
        <CampbookAchievementsTitleTextFirst>
          English learning progress
        </CampbookAchievementsTitleTextFirst>
        <CampbookAchievementsTitleTextSecond>
          Our achievements
        </CampbookAchievementsTitleTextSecond>

        <CampbookAchievementsText id="achievementsText" />

        <CampbookAchievementsBottomIcons />
      </CampbookPage>

      <span className="nextPage"></span>

      <CampbookPage
        className="page"
        $pt={"68px"}
        $pb={"124px"}
        $bgc={"#A9CEFB"}
      >
        <CampbookHeroesTitleTextFirst>
          Our Group Family
        </CampbookHeroesTitleTextFirst>
        <CampbookHeroesTitleTextSecond>
          Camp Heroes
        </CampbookHeroesTitleTextSecond>
        <CampbookHeroesInfoWrapper>
          <CampbookHeroesInfoHeroBlock>
            <CampbookHeroesInfoPhoto id="teacherImage">
              <IoImageOutline style={{ width: "243px", height: "186px" }} />
            </CampbookHeroesInfoPhoto>

            <CampbookHeroesInfoTitle>
              {teacherName && teacherName}
            </CampbookHeroesInfoTitle>
            <CampbookHeroesInfoTitle>Teacher</CampbookHeroesInfoTitle>
          </CampbookHeroesInfoHeroBlock>

          <CampbookHeroesInfoHeroBlock>
            <CampbookHeroesInfoPhoto id="tutorImage">
              <IoImageOutline style={{ width: "243px", height: "186px" }} />
            </CampbookHeroesInfoPhoto>

            <CampbookHeroesInfoTitle>
              {tutorName && tutorName}
            </CampbookHeroesInfoTitle>
            <CampbookHeroesInfoTitle>Tutor</CampbookHeroesInfoTitle>
          </CampbookHeroesInfoHeroBlock>
        </CampbookHeroesInfoWrapper>

        <CampbookHeroesImageBackground>
          <CampbookHeroesImageWrapper id="heroesPageImage">
            <IoImageOutline style={{ width: "608px", height: "362px" }} />
          </CampbookHeroesImageWrapper>
        </CampbookHeroesImageBackground>

        <CampbookHeroesBottomIcons />
      </CampbookPage>

      <span className="nextPage"></span>

      <CampbookPage
        className="page"
        $pt={"116px"}
        $pb={"150px"}
        $bgc={"#E1EFA1"}
      >
        <CampbookFeebackTitle>Individual feedback</CampbookFeebackTitle>
        <CampbookFeebackTitleText>
          from the English teacher at British Camp
        </CampbookFeebackTitleText>

        <CampbookFeebackContent>{feedback && feedback}</CampbookFeebackContent>

        <CampbookFeebackBottomIcons />
      </CampbookPage>
    </>
  );
};
