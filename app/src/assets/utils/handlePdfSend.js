import axios from "axios";
import html2pdf from "html-to-pdf-js";

export const handlePdfSend = (selector, recipient) => {
  const pdfContainer = document.querySelector(selector);
  const options = {
    margin: selector === ".voucher__pdf" ? [0, 0, -0.01, 0] : 0,
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
};
