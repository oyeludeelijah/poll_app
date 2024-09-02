const addMedia = document.getElementById("addMedia");
const fileInput = document.getElementById("fileInput");
const uploadedImgs = document.getElementById("uploadedImgs");
const addAnswer = document.getElementById("addAnswer");
const answersContainer = document.getElementById("answersContainer");
const submitBtn = document.getElementById("submit-btn");
const questionInput = document.getElementById("question_type");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

let uploadedImages = [];

addMedia.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function (event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("uploaded-img-container");

        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("uploaded-img");

        const removeBtn = document.createElement("div");
        removeBtn.classList.add("remove-img");
        removeBtn.innerHTML = "×";
        removeBtn.addEventListener("click", function () {
          uploadedImgs.removeChild(imgContainer);
          uploadedImages = uploadedImages.filter(
            (image) => image !== e.target.result
          );
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(removeBtn);
        uploadedImgs.appendChild(imgContainer);

        uploadedImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
});

addAnswer.addEventListener("click", function () {
  const newAnswer = document.createElement("div");
  newAnswer.classList.add("answer");
  newAnswer.contentEditable = true;
  newAnswer.textContent = "";
  answersContainer.insertBefore(newAnswer, addAnswer);

  newAnswer.focus();

  newAnswer.addEventListener("blur", function () {
    if (newAnswer.textContent.trim() === "") {
      answersContainer.removeChild(newAnswer);
    }
  });
});

submitBtn.addEventListener("click", function () {
  const topic = questionInput.value.trim();
  const answerOptions = Array.from(answersContainer.children)
    .filter((child) => child.id !== "addAnswer")
    .map((answer) => answer.textContent.trim());

  if (topic === "") {
    showMessage("Please enter a question topic.", "error");
    return;
  }

  if (uploadedImages.length === 0) {
    showMessage("Please upload at least one image.", "error");
    return;
  }

  if (answerOptions.length < 2) {
    showMessage("Please add at least two answer options.", "error");
    return;
  }

  if (answerOptions.some((option) => option === "")) {
    showMessage("Please fill in all answer options.", "error");
    return;
  }

  const pollData = {
    topic: topic,
    images: uploadedImages,
    answers: answerOptions,
  };

  try {
    localStorage.setItem("pollData", JSON.stringify(pollData));
    showMessage("Poll data saved successfully!", "success");

    // Reset the form
    questionInput.value = "";
    uploadedImgs.innerHTML = "";
    uploadedImages = [];
    Array.from(answersContainer.children)
      .filter((child) => child.id !== "addAnswer")
      .forEach((answer) => answersContainer.removeChild(answer));

    // Navigate to the admin dashboard after a short delay
    setTimeout(() => {
      window.location.href = "/html/admin_dashboard.html";
    }, 1000); // 1 second delay to allow the success message to be seen
  } catch (error) {
    showMessage("Error saving poll data: " + error.message, "error");
  }
});

function showMessage(message, type) {
  const messageElement = type === "error" ? errorMessage : successMessage;
  const otherMessageElement = type === "error" ? successMessage : errorMessage;

  messageElement.textContent = message;
  messageElement.style.display = "block";
  otherMessageElement.style.display = "none";

  // Clear the message after 5 seconds
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.style.display = "none";
  }, 5000);
}
