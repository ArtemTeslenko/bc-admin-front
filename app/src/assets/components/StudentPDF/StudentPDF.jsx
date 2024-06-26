import axios from "axios";
import { useState, useEffect } from "react";
import html2pdf from "html-to-pdf-js";
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
} from "@/assets/styles";
import { PdfWrapper } from "@/assets/components/StudentPDF";
import { arrowStyles } from "@/assets/utils";

export const StudentPDF = ({ location }) => {
  const [isCampbookVisible, setIsCampbookVisible] = useState(false);
  const [isVoucherVisible, setIsVoucherVisible] = useState(false);
  const [campbook, setCampbook] = useState(null);
  const [voucher, setVoucher] = useState(null);

  useEffect(() => {
    if (location) {
      const firstLetter = location.charAt(0).toUpperCase();
      const formatedLocation = firstLetter + location.slice(1);

      import(`../Campbooks/${formatedLocation}Campbook.jsx`).then((result) =>
        setCampbook(result)
      );
      import(`../Vouchers/${formatedLocation}Voucher.jsx`).then((result) =>
        setVoucher(result)
      );
    }
  }, []);

  function handlePdfLoad(selector) {
    const pdfContainer = document.querySelector(selector);
    html2pdf().from(pdfContainer).save();
  }

  function handlePdfSend(selector) {
    const pdfContainer = document.querySelector(selector);
    html2pdf()
      .from(pdfContainer)
      .toPdf()
      .output("blob")
      .then((pdfBlob) => {
        const formData = new FormData();
        formData.append("pdf", pdfBlob, "document.pdf");
        formData.append("correspondent", "artem.teslenko.w126@gmail.com");
        formData.append("emailSubject", "Test email");

        axios
          .post("api/email", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => console.log(response))
          .catch((err) => console.log(console.log(err)));
      });
  }

  function handleUploadImage(event, imageSelector) {
    const files = event.target.files;
    const imageContainer = document.getElementById(imageSelector);

    imageContainer.innerHTML = "";

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement("img");

        img.src = e.target.result;
        img.style.display = "block";
        img.style.width = "auto";
        img.style.height = "100%";
        // img.style.objectFit = "cover";
        imageContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <>
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
          <PdfWrapper>
            <ClientPdf className="campbook__pdf">
              <campbook.LondonCampbook name="Name Surname" />
            </ClientPdf>

            <CommonButtonFlexContainer>
              <CommonButtonPrimary
                type="button"
                onClick={() => handlePdfLoad(".campbook__pdf")}
              >
                Load PDF
              </CommonButtonPrimary>

              <CommonButtonPrimary
                type="button"
                onClick={() => handlePdfSend(".campbook__pdf")}
              >
                Send PDF
              </CommonButtonPrimary>
            </CommonButtonFlexContainer>
          </PdfWrapper>
        )}
      </PdfContainer>

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
          <PdfWrapper>
            <ClientPdf className="voucher__pdf">
              <voucher.LondonVoucher name="Name Surname" />
            </ClientPdf>

            <input
              type="file"
              id="firstImageUpload"
              accept="image/*"
              multiple
              onChange={(event) =>
                handleUploadImage(event, "firstImageContainer")
              }
            />

            <input
              type="file"
              id="secondImageUpload"
              accept="image/*"
              multiple
              onChange={(event) =>
                handleUploadImage(event, "secondImageContainer")
              }
            />

            <CommonButtonFlexContainer>
              <CommonButtonPrimary
                type="button"
                onClick={() => handlePdfLoad(".voucher__pdf")}
              >
                Load PDF
              </CommonButtonPrimary>

              <CommonButtonPrimary
                type="button"
                onClick={() => handlePdfSend(".voucher__pdf")}
              >
                Send PDF
              </CommonButtonPrimary>
            </CommonButtonFlexContainer>
          </PdfWrapper>
        )}
      </PdfContainer>
    </>
  );
};
