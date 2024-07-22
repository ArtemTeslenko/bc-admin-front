import html2pdf from "html-to-pdf-js";

export const handlePdfLoad = (selector) => {
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

  html2pdf().from(pdfContainer).set(options).save();
};
