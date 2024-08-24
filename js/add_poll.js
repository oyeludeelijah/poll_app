const addMedia = document.getElementById("addMedia");
const fileInput = document.getElementById("fileInput");

addMedia.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});
