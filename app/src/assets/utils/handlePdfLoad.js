import html2pdf from "html-to-pdf-js";

export const handlePdfLoad = (selector, country) => {
  const isVoucher = selector === ".voucher__pdf";
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
    .get("pdf")
    .then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();

      if (isVoucher && totalPages > 1) {
        pdf.deletePage(2);
      }

      if (!isVoucher && country === "ua" && totalPages > 6) {
        pdf.deletePage(7);
      }

      if (!isVoucher && country === "pl" && totalPages > 5) {
        pdf.deletePage(6);
      }

      return pdf;
    })
    .save();
};
