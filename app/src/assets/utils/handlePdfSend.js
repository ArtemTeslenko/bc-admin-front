import axios from "axios";
import html2pdf from "html-to-pdf-js";
import { emailContent } from "@/assets/constants";

export const handlePdfSend = (
  selector,
  recipient,
  country,
  setIsSendSuccess,
  setIsSendReject,
  setIsLoading
) => {
  const isVoucher = selector === ".voucher__pdf";
  const emailContentText = isVoucher
    ? emailContent.voucher[country]
    : emailContent.campbook[country];
  const emailSubject = isVoucher
    ? "British Camp Voucher"
    : "British Camp Campbook";
  const pdfContainer = document.querySelector(selector);
  const options = {
    margin: isVoucher ? [0, 0, -0.01, 0] : 0,
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
      enableLinks: true,
    },
    pagebreak: {
      avoid: [".page"],
      mode: ["css"],
    },
  };

  html2pdf()
    .from(pdfContainer)
    .set(options)
    .toPdf()
    .output("blob")
    .then((pdfBlob) => {
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "document.pdf");
      formData.append("correspondent", recipient);
      formData.append("emailSubject", emailSubject);
      formData.append("emailContent", emailContentText);

      axios
        .post("api/email", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsSendSuccess(true);
          }
        })
        .catch((error) => setIsSendReject(true))
        .finally(setIsLoading(false));
    });
};
