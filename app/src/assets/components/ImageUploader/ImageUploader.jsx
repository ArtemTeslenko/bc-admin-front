import { IoImageOutline, IoCloudUploadOutline } from "react-icons/io5";
import {
  CommonUploaderWrapper,
  CommonUploaderActionWrapper,
  CommonUploaderInput,
  CommonUploaderButton,
  CommonUploaderPreview,
  CommonUploaderInterim,
} from "@/assets/styles";
import { handleUploadImage } from "@/assets/utils";

export const ImageUploader = ({
  stylesClasses,
  inputId,
  interimImageId,
  resultImageId,
  previewImageId,
  requiredWidth,
  requiredHeight,
  imageName,
}) => {
  function handleUploadButtonClick(e) {
    e.target.closest(".parent").querySelector("input").click();
  }

  return (
    <CommonUploaderWrapper className={stylesClasses}>
      <CommonUploaderActionWrapper>
        <CommonUploaderInput
          type="file"
          id={inputId}
          accept="image/*"
          multiple
          onChange={(event) =>
            handleUploadImage(
              event,
              interimImageId,
              resultImageId,
              previewImageId,
              requiredWidth,
              requiredHeight
            )
          }
        />
        <CommonUploaderButton type="button" onClick={handleUploadButtonClick}>
          Load {imageName} image{" "}
          <IoCloudUploadOutline className="uploader__icon" />
        </CommonUploaderButton>
      </CommonUploaderActionWrapper>

      <CommonUploaderPreview id={previewImageId}>
        <IoImageOutline style={{ width: "90px", height: "60px" }} />
      </CommonUploaderPreview>

      <CommonUploaderInterim id={interimImageId} />
    </CommonUploaderWrapper>
  );
};
