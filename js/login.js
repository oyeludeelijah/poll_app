const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailErrorMsg = document.getElementById("email-errorMsg");
const passwordErrorMsg = document.getElementById("password-errorMsg");
const generalErrorMsg = document.getElementById("general-error-msg");
const emailBox = document.getElementById("email-box");
const passwordBox = document.getElementById("password-box");

let storedData = JSON.parse(localStorage.getItem("userData"));

console.log(storedData);
function validateField(input, errorMsg, border) {
  let isValid = true;
  if (!input.value) {
    errorMsg.textContent = "This field is required";
    border.style.borderColor = "rgb(255, 0, 0)";
    isValid = false;
  } else {
    errorMsg.textContent = "";
    border.style.borderColor = "rgb(0, 255, 0)";
  }
  console.log(`Validating ${input.id}: ${isValid ? "Valid" : "Invalid"}`);
  return isValid;
}

email.addEventListener("input", () =>
  validateField(email, emailErrorMsg, emailBox)
);
password.addEventListener("input", () =>
  validateField(password, passwordErrorMsg, passwordBox)
);

function goToAnotherFile() {
  window.location.href = "/html/voting_page.html";
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  isValid = validateField(email, emailErrorMsg, emailBox) && isValid;
  isValid = validateField(password, passwordErrorMsg, passwordBox) && isValid;

  if (isValid) {
    if (storedData) {
      const user = storedData.find(
        (user) => user.email === email.value && user.password === password.value
      );

      if (user) {
        console.log("Login successful!");
        // Store the current user's email in localStorage
        localStorage.setItem("currentUser", user.email);

        // Redirect to the home page
        window.location.href = "/html/home_page.html";
      } else {
        generalErrorMsg.textContent = "Invalid email or password";
        emailBox.style.borderColor = "rgb(255, 0, 0)";
        passwordBox.style.borderColor = "rgb(255, 0, 0)";
      }
    } else {
      emailErrorMsg.textContent = "No users are registered";
    }
  }
});
