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

export const StudentPDF = ({
  student,
  locationsList,
  feedback,
  setFeedback,
}) => {
  const { country, parentEmail } = student;

  const [isCampbookVisible, setIsCampbookVisible] = useState(false);
  const [isVoucherVisible, setIsVoucherVisible] = useState(false);
  const [campbook, setCampbook] = useState(null);
  const [voucher, setVoucher] = useState(null);
  const [voucherRecipientEmail, setVoucherRecipientEmail] =
    useState(parentEmail);
  const [campbookRecipientEmail, setCampbookRecipientEmail] =
    useState(parentEmail);
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

    return !isEmptyFeedback;
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
                <voucher.Voucher
                  student={student}
                  locationsList={locationsList}
                />
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
                  feedback={feedback}
                  locationsList={locationsList}
                />
              </ClientPdf>
            </PdfWrapper>
            <ImageUploader
              stylesClasses="parent mt20 mb20"
              inputId="firstImageUpload"
              interimImageId="first-image-interim"
              resultImageId="mainPageImage"
              previewImageId="first-image-preview"
              requiredWidth={673}
              requiredHeight={517}
              imageName="main"
            />

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
                    <ListItemFormLabel htmlFor="group">Group</ListItemFormLabel>

                    <ListItemFormInput
                      id="group"
                      value={feedback.group ?? ""}
                      onChange={(e) =>
                        setFeedback((prevValue) => ({
                          ...prevValue,
                          group: e.target.value,
                        }))
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="materialsTaught">
                      Level of the materials taught
                    </ListItemFormLabel>

                    <ListItemFormInput
                      id="materialsTaught"
                      value={feedback.materialsTaught ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          materialsTaught: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="testResult">
                      Final test result
                    </ListItemFormLabel>

                    <ListItemFormInput
                      id="testResult"
                      value={feedback.finalTestResult ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          finalTestResult: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="topicsCovered">
                      Topics covered
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="topicsCovered"
                      value={feedback.topicsCovered ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          topicsCovered: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="workingMode">
                      Working mode
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="workingMode"
                      value={feedback.workingMode ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          workingMode: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="speakingSkills">
                      In order to further improve speaking skills
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="speakingSkills"
                      value={feedback.speaking ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          speaking: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="readingSkills">
                      In order to further develop reading skills
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="readingSkills"
                      value={feedback.reading ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          reading: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="listeningSkills">
                      Listening skills can be further developed by
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="listeningSkills"
                      value={feedback.listening ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          listening: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="writingSkills">
                      While speaking of writing skills
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="writingSkills"
                      value={feedback.speakingOfWriting ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          speakingOfWriting: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>

                  <ListItemFieldWrapper>
                    <ListItemFormLabel htmlFor="additionalInfo">
                      Additional information about the camper:
                    </ListItemFormLabel>

                    <ListItemFormTextarea
                      id="additionalInfo"
                      value={feedback.additionalInfo ?? ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          additionalInfo: e.target.value,
                        })
                      }
                    />
                  </ListItemFieldWrapper>
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
