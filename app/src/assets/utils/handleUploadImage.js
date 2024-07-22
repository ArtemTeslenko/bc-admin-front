export const handleUploadImage = (
  event,
  interimSelector,
  imageSelector,
  imagePreviewContainer,
  requiredWidth,
  requiredHeight
) => {
  const files = event.target.files;
  const interimContainer = document.getElementById(interimSelector);
  const imageContainer = document.getElementById(imageSelector);
  const previewContainer = document.getElementById(imagePreviewContainer);

  interimContainer.innerHTML = "";
  imageContainer.innerHTML = "";
  previewContainer.innerHTML = "";

  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const interimImage = document.createElement("img");
      const originalImage = document.createElement("img");
      const previewImage = document.createElement("img");

      interimImage.src = e.target.result;
      interimImage.style.position = "absolute";
      interimImage.style.display = "block";
      interimImage.style.width = "auto";
      interimImage.style.height = "auto";
      interimImage.style.opacity = "0";
      interimContainer.appendChild(interimImage);

      interimImage.onload = () => {
        const interimFactImage = document.querySelector(
          `#${interimSelector} > img`
        );
        const interimWidth = interimFactImage.offsetWidth;
        const interimHeight = interimFactImage.offsetHeight;

        const factSidesAccordance = interimWidth / interimHeight;
        const requiredSidesAccordance = requiredWidth / requiredHeight;

        originalImage.src = e.target.result;
        originalImage.style.display = "block";
        originalImage.style.width =
          factSidesAccordance > requiredSidesAccordance ? "auto" : "100%";
        originalImage.style.height =
          factSidesAccordance > requiredSidesAccordance ? "100%" : "auto";
        originalImage.style.objectFit = "cover";
        imageContainer.appendChild(originalImage);
        interimContainer.innerHTML = "";
      };

      previewImage.src = e.target.result;
      previewImage.style.display = "block";
      previewImage.style.width = "100%";
      previewImage.style.height = "100%";
      previewImage.style.objectFit = "cover";
      previewContainer.appendChild(previewImage);
    };
    reader.readAsDataURL(file);
  });
};
