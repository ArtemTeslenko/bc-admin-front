import { useState, useEffect } from "react";
import html2pdf from "html-to-pdf-js";
import { LoadStudentPdf } from "@/assets/components/StudentPDF";

export const StudentPDF = ({ location }) => {
  const [isCampbookVisible, setIsCampbookVisible] = useState(false);
  const [campbook, setCampbook] = useState(null);

  useEffect(() => {
    location &&
      import(`../Campbooks/${location}Campbook.jsx`).then((result) =>
        setCampbook(result)
      );
  }, []);

  function handlePdfLoad() {
    const pdfContainer = document.querySelector(".pdfContainer");
    html2pdf().from(pdfContainer).save();
  }

  return (
    <div>
      <LoadStudentPdf
        type="button"
        onClick={() => setIsCampbookVisible(!isCampbookVisible)}
      >
        Show PDF
      </LoadStudentPdf>

      <div className="pdfContainer">
        {campbook && isCampbookVisible && (
          <campbook.LondonCampbook name="Name Surname" />
        )}
      </div>

      <LoadStudentPdf type="button" onClick={handlePdfLoad}>
        Load PDF
      </LoadStudentPdf>
    </div>
  );
};
