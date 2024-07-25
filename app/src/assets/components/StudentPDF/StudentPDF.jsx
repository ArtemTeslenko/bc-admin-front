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
} from "@/assets/styles";
import {
  PdfWrapper,
  InputResultWrapper,
  InputResultInfo,
  InputResultAttantion,
  Notification,
} from "@/assets/components/StudentPDF";
import { arrowStyles, handlePdfSend, handlePdfLoad } from "@/assets/utils";
import { ImageUploader } from "@/assets/components/ImageUploader";

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
  const [feedback, setFeedback] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

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

  function handleCampbookSend() {
    const isCampbookValid = validateCampbook();

    if (!isCampbookValid) {
      setIsNotificationVisible(true);
      return;
    }
    handlePdfSend(".campbook__pdf", campbookRecipientEmail, country);
  }

  function validateCampbook() {
    if (
      !photosUrl.trim() ||
      !teacherName.trim() ||
      !tutorName.trim() ||
      !feedback.trim()
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
                onClick={() => handlePdfLoad(".voucher__pdf")}
              >
                Load PDF
              </CommonButtonPrimary>

              <CommonButtonPrimary
                type="button"
                onClick={() =>
                  handlePdfSend(".voucher__pdf", voucherRecipientEmail, country)
                }
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

            <ListItemFieldWrapper>
              <ListItemFormLabel htmlFor="feedback">
                Put feedback
              </ListItemFormLabel>
              <ListItemFormTextarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </ListItemFieldWrapper>

            <InputResultWrapper>
              <InputResultInfo>The feedback </InputResultInfo>

              <InputResultAttantion>{feedback}</InputResultAttantion>
            </InputResultWrapper>

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
                onClick={() => handlePdfLoad(".campbook__pdf")}
              >
                Load PDF
              </CommonButtonPrimary>

              <CommonButtonPrimary type="button" onClick={handleCampbookSend}>
                Send PDF
              </CommonButtonPrimary>
            </CommonButtonFlexContainer>

            {isNotificationVisible && (
              <Notification>Please fill in all campbook fields</Notification>
            )}
          </>
        )}
      </PdfContainer>
    </>
  );
};
