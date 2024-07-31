import { useState, useEffect } from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import {
  PdfContainer,
  ClientPdf,
  CommonButtonPrimary,
  CommonButtonToggler,
  CommonButtonFlexContainer,
  ListItemFieldWrapper,
  ListItemFormLabel,
  ListItemFormInput,
  ListItemFormTextarea,
  NotificationDanger,
  NotificationSuccess,
  InnerFormWrapper,
} from "@/assets/styles";
import {
  PdfWrapper,
  InputResultWrapper,
  InputResultInfo,
  InputResultAttantion,
} from "@/assets/components/StudentPDF";
import { arrowStyles, handlePdfSend, handlePdfLoad } from "@/assets/utils";
import { ImageUploader } from "@/assets/components/ImageUploader";
import { Loader } from "@/assets/components/Loader";

export const StudentPDF = ({ student }) => {
  const { country, parentEmail } = student;

  const [isCampbookVisible, setIsCampbookVisible] = useState(false);
  const [isVoucherVisible, setIsVoucherVisible] = useState(false);
  const [campbook, setCampbook] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [voucherRecipientEmail, setVoucherRecipientEmail] =
    useState(parentEmail);
  const [campbookRecipientEmail, setCampbookRecipientEmail] =
    useState(parentEmail);
  const [photosUrl, setPhotosUrl] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [feedback, setFeedback] = useState({
    materialsTaught: "",
    testResult: "",
    topicsCovered: "",
    workingMode: "",
    speakingSkills: "",
    readingSkills: "",
    listeningSkills: "",
    writingSkills: "",
    additionalInfo: "",
  });
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(true);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [isSendReject, setIsSendReject] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (country) {
      const firstLetterCountry = country.charAt(0).toUpperCase();
      const formatedCountry = firstLetterCountry + country.slice(1);

      import(`../Campbooks/${formatedCountry}Campbook.jsx`).then((result) =>
        setCampbook(result)
      );
      import(`../Vouchers/${formatedCountry}Voucher.jsx`).then((result) =>
        setVoucher(result)
      );
    }
  }, []);

  useEffect(() => {
    if (isNotificationVisible) {
      setTimeout(() => setIsNotificationVisible(false), 3500);
    }
  }, [isNotificationVisible]);

  useEffect(() => {
    if (isSendSuccess) {
      setTimeout(() => setIsSendSuccess(false), 3500);
    }
  }, [isSendSuccess]);

  useEffect(() => {
    if (isSendReject) {
      setTimeout(() => setIsSendReject(false), 3500);
    }
  }, [isSendReject]);

  function handleCampbookSend() {
    const isCampbookValid = validateCampbook();

    if (!isCampbookValid) {
      setIsNotificationVisible(true);
      return;
    }

    setIsLoading(true);

    handlePdfSend(
      ".campbook__pdf",
      campbookRecipientEmail,
      country,
      setIsSendSuccess,
      setIsSendReject,
      setIsLoading
    );
  }

  function validateCampbook() {
    const isEmptyFeedback = Object.keys(feedback).some((key) => !feedback[key]);

    if (
      !photosUrl.trim() ||
      !teacherName.trim() ||
      !tutorName.trim() ||
      isEmptyFeedback
    ) {
      return false;
    }

    return true;
  }

  return (
    <>
      <PdfContainer>
        <CommonButtonToggler
          type="button"
          onClick={() => setIsVoucherVisible(!isVoucherVisible)}
        >
          {isVoucherVisible ? (
            <>
              <span>Hide voucher PDF </span>
              <IoArrowUpCircleOutline style={arrowStyles} />
            </>
          ) : (
            <>
              <span>Show voucher PDF </span>
              <IoArrowDownCircleOutline style={arrowStyles} />
            </>
          )}
        </CommonButtonToggler>

        {voucher && isVoucherVisible && (
          <>
            <PdfWrapper>
              <ClientPdf className="voucher__pdf">
                <voucher.Voucher student={student} />
              </ClientPdf>
            </PdfWrapper>

            <ListItemFieldWrapper className="mt20">
              <ListItemFormLabel htmlFor="voucherRecipientEmail">
                Change recipient email
              </ListItemFormLabel>
              <ListItemFormInput
                id="voucherRecipientEmail"
                value={voucherRecipientEmail}
                onChange={(e) => setVoucherRecipientEmail(e.target.value)}
              />
            </ListItemFieldWrapper>

            <InputResultWrapper>
              <InputResultInfo>The voucher will be send to </InputResultInfo>

              <InputResultAttantion>
                {voucherRecipientEmail}
              </InputResultAttantion>
            </InputResultWrapper>

            <CommonButtonFlexContainer>
              <CommonButtonPrimary
                type="button"
                onClick={() => handlePdfLoad(".voucher__pdf", country)}
              >
                Load PDF
              </CommonButtonPrimary>

              <CommonButtonPrimary
                type="button"
                onClick={() => {
                  setIsLoading(true);

                  handlePdfSend(
                    ".voucher__pdf",
                    voucherRecipientEmail,
                    country,
                    setIsSendSuccess,
                    setIsSendReject,
                    setIsLoading
                  );
                }}
              >
                Send PDF
              </CommonButtonPrimary>
            </CommonButtonFlexContainer>
          </>
        )}
      </PdfContainer>

      <PdfContainer>
        <CommonButtonToggler
          type="button"
          onClick={() => setIsCampbookVisible(!isCampbookVisible)}
        >
          {isCampbookVisible ? (
            <>
              <span>Hide campbook PDF </span>
              <IoArrowUpCircleOutline style={arrowStyles} />
            </>
          ) : (
            <>
              <span>Show campbook PDF </span>
              <IoArrowDownCircleOutline style={arrowStyles} />
            </>
          )}
        </CommonButtonToggler>

        {campbook && isCampbookVisible && (
          <>
            <PdfWrapper>
              <ClientPdf className="campbook__pdf">
                <campbook.Campbook
                  student={student}
                  teacherName={teacherName}
                  tutorName={tutorName}
                  feedback={feedback}
                  photosUrl={photosUrl}
                />
              </ClientPdf>
            </PdfWrapper>
            <ImageUploader
              stylesClasses="parent mt20"
              inputId="firstImageUpload"
              interimImageId="first-image-interim"
              resultImageId="mainPageImage"
              previewImageId="first-image-preview"
              requiredWidth={673}
              requiredHeight={517}
              imageName="main"
            />
            <ImageUploader
              stylesClasses="parent mt20"
              inputId="secondImageUpload"
              interimImageId="second-image-interim"
              resultImageId="sessionPageImage"
              previewImageId="second-image-preview"
              requiredWidth={673}
              requiredHeight={517}
              imageName="summary"
            />
            <ImageUploader
              stylesClasses="parent mt20"
              inputId="thirdImageUpload"
              interimImageId="third-image-interim"
              resultImageId="teacherImage"
              previewImageId="third-image-preview"
              requiredWidth={243}
              requiredHeight={243}
              imageName="teacher"
            />
            <ImageUploader
              stylesClasses="parent mt20"
              inputId="fourthImageUpload"
              interimImageId="fourth-image-interim"
              resultImageId="tutorImage"
              previewImageId="fourth-image-preview"
              requiredWidth={243}
              requiredHeight={243}
              imageName="tutor"
            />
            <ImageUploader
              stylesClasses="parent mt20 mb20"
              inputId="fifthImageUpload"
              interimImageId="fifth-image-interim"
              resultImageId="heroesPageImage"
              previewImageId="fifth-image-preview"
              requiredWidth={608}
              requiredHeight={362}
              imageName="group"
            />
            <ListItemFieldWrapper>
              <ListItemFormLabel htmlFor="photosLink">
                Put photos link
              </ListItemFormLabel>
              <ListItemFormInput
                id="photosLink"
                value={photosUrl}
                onChange={(e) => setPhotosUrl(e.target.value)}
              />
            </ListItemFieldWrapper>
            <InputResultWrapper>
              <InputResultInfo>The photos link</InputResultInfo>

              <InputResultAttantion>{photosUrl}</InputResultAttantion>
            </InputResultWrapper>
            <ListItemFieldWrapper>
              <ListItemFormLabel htmlFor="teacherName">
                Put teacher name
              </ListItemFormLabel>
              <ListItemFormInput
                id="teacherName"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </ListItemFieldWrapper>
            <InputResultWrapper>
              <InputResultInfo>The teacher name is</InputResultInfo>

              <InputResultAttantion>{teacherName}</InputResultAttantion>
            </InputResultWrapper>
            <ListItemFieldWrapper>
              <ListItemFormLabel htmlFor="tutorName">
                Put tutor name
              </ListItemFormLabel>
              <ListItemFormInput
                id="tutorName"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
              />
            </ListItemFieldWrapper>
            <InputResultWrapper>
              <InputResultInfo>The tutor name is </InputResultInfo>

              <InputResultAttantion>{tutorName}</InputResultAttantion>
            </InputResultWrapper>

            <InnerFormWrapper>
              <CommonButtonToggler
                type="button"
                onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
              >
                {isFeedbackVisible ? (
                  <>
                    <span>Hide feedback </span>
                    <IoArrowUpCircleOutline style={arrowStyles} />
                  </>
                ) : (
                  <>
                    <span>Show feedback </span>
                    <IoArrowDownCircleOutline style={arrowStyles} />
                  </>
                )}
              </CommonButtonToggler>

              {isFeedbackVisible && (
                <>
                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="materialsTaught">
                      Level of the materials taught
                    </ListItemFormLabel>

                    <ListItemFormInput
                      id="materialsTaught"
                      value={feedback.materialsTaught}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          materialsTaught: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>
                      Level of the materials taught
                    </InputResultInfo>

                    <InputResultAttantion>
                      {feedback.materialsTaught}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="testResult">
                      Final test result
                    </ListItemFormLabel>

                    <ListItemFormInput
                      id="testResult"
                      value={feedback.testResult}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          testResult: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>Final test result</InputResultInfo>

                    <InputResultAttantion>
                      {feedback.testResult}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="topicsCovered">
                      Topics covered
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="topicsCovered"
                      value={feedback.topicsCovered}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          topicsCovered: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>Topics covered</InputResultInfo>

                    <InputResultAttantion>
                      {feedback.topicsCovered}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="workingMode">
                      Working mode
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="workingMode"
                      value={feedback.workingMode}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          workingMode: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>Working mode</InputResultInfo>

                    <InputResultAttantion>
                      {feedback.workingMode}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="speakingSkills">
                      In order to further improve speaking skills
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="speakingSkills"
                      value={feedback.speakingSkills}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          speakingSkills: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>
                      In order to further improve speaking skills
                    </InputResultInfo>

                    <InputResultAttantion>
                      {feedback.speakingSkills}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="readingSkills">
                      In order to further develop reading skills
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="readingSkills"
                      value={feedback.readingSkills}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          readingSkills: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>
                      In order to further develop reading skills
                    </InputResultInfo>

                    <InputResultAttantion>
                      {feedback.readingSkills}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="listeningSkills">
                      Listening skills can be further developed by
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="listeningSkills"
                      value={feedback.listeningSkills}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          listeningSkills: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>
                      Listening skills can be further developed by
                    </InputResultInfo>

                    <InputResultAttantion>
                      {feedback.listeningSkills}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="writingSkills">
                      While speaking of writing skills
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="writingSkills"
                      value={feedback.writingSkills}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          writingSkills: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>
                      While speaking of writing skills
                    </InputResultInfo>

                    <InputResultAttantion>
                      {feedback.writingSkills}
                    </InputResultAttantion>
                  </InputResultWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="additionalInfo">
                      Additional information about the camper:
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="additionalInfo"
                      value={feedback.additionalInfo}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          additionalInfo: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <InputResultWrapper>
                    <InputResultInfo>
                      Additional information about the camper:
                    </InputResultInfo>

                    <InputResultAttantion>
                      {feedback.additionalInfo}
                    </InputResultAttantion>
                  </InputResultWrapper>
                </>
              )}
            </InnerFormWrapper>

            <ListItemFieldWrapper>
              <ListItemFormLabel htmlFor="campbookRecipientEmail">
                Change recipient email
              </ListItemFormLabel>
              <ListItemFormInput
                id="campbookRecipientEmail"
                value={campbookRecipientEmail}
                onChange={(e) => setCampbookRecipientEmail(e.target.value)}
              />
            </ListItemFieldWrapper>
            <InputResultWrapper>
              <InputResultInfo>The campbook will be send to </InputResultInfo>

              <InputResultAttantion>
                {campbookRecipientEmail}
              </InputResultAttantion>
            </InputResultWrapper>
            <CommonButtonFlexContainer>
              <CommonButtonPrimary
                type="button"
                onClick={() => handlePdfLoad(".campbook__pdf", country)}
              >
                Load PDF
              </CommonButtonPrimary>

              <CommonButtonPrimary type="button" onClick={handleCampbookSend}>
                Send PDF
              </CommonButtonPrimary>
            </CommonButtonFlexContainer>
            {isNotificationVisible && (
              <NotificationDanger>
                Please fill in all campbook fields
              </NotificationDanger>
            )}
          </>
        )}
      </PdfContainer>

      {isSendSuccess && (
        <NotificationSuccess>Email successfuly sent</NotificationSuccess>
      )}

      {isSendReject && (
        <NotificationDanger>
          Something went wrong, please try again
        </NotificationDanger>
      )}

      <Loader isLoading={isLoading} />
    </>
  );
};
