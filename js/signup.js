const form = document.getElementById("form");
const inputFirstName = document.getElementById("first_name-input");
const inputLastName = document.getElementById("last_name-input");
const inputEmail = document.getElementById("email-input");
const inputAge = document.getElementById("age-input");
const inputPassword = document.getElementById("password-input");

const firstNameBorder = document.querySelector(".first-name_cont_border");
const lastNameBorder = document.querySelector(".last-name_cont_border");
const emailBorder = document.querySelector(".email_cont_border");
const ageBorder = document.querySelector(".age_cont_border");
const passwordBorder = document.querySelector(".password_cont_border");

const firstNameErrorMsg = document.getElementById("first_name-errorMsg");
const lastNameErrorMsg = document.getElementById("last_name-errorMsg");
const emailErrorMsg = document.getElementById("email-errorMsg");
const ageErrorMsg = document.getElementById("age-errorMsg");
const passwordErrorMsg = document.getElementById("password-errorMsg");

const signUpContainer = document.getElementById("sign-up-container");
const successContainer = document.getElementById("success-container");

// Array to store form data
let formDataArray = [];

function successMessage() {
  signUpContainer.style.filter = "blur(3px)";
  successContainer.classList.remove("hidden");

  setTimeout(() => {
    goToAnotherFile();
  }, 3000);
}

function isEmailTaken(email) {
  return formDataArray.some((user) => user.email === email);
}

function validateField(input, errorMsg, border, validationFn) {
  let isValid = true;
  if (!input.value) {
    errorMsg.textContent = "This field is required";
    border.style.borderColor = "rgb(255, 0, 0)";
    isValid = false;
  } else if (validationFn && !validationFn(input.value)) {
    isValid = false;
  } else {
    errorMsg.textContent = "";
    border.style.borderColor = "rgb(0, 255, 0)"; // Green border for valid input
  }
  return isValid;
}

function validateEmail() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!inputEmail.value.match(emailPattern)) {
    emailErrorMsg.textContent = "Please enter a valid email address";
    emailBorder.style.borderColor = "rgb(255, 0, 0)";
    return false;
  }
  if (isEmailTaken(inputEmail.value)) {
    emailErrorMsg.textContent = "This email is already registered";
    emailBorder.style.borderColor = "rgb(255, 0, 0)";
    return false;
  }
  emailErrorMsg.textContent = "";
  emailBorder.style.borderColor = "rgb(0, 255, 0)";
  return true;
}

function validateAge(age) {
  if (isNaN(age) || age < 18 || age > 120) {
    ageErrorMsg.textContent = "Please enter a valid age between 18 and 120";
    ageBorder.style.borderColor = "rgb(255, 0, 0)";
    return false;
  }
  ageErrorMsg.textContent = "";
  ageBorder.style.borderColor = "rgb(0, 255, 0)";
  return true;
}

function validatePassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*]/.test(password);
  const isValidLength = password.length >= 5;

  if (!isValidLength) {
    passwordErrorMsg.textContent =
      "Password must be at least 5 characters long";
  } else if (!hasUpperCase) {
    passwordErrorMsg.textContent =
      "Password must include at least one uppercase letter";
  } else if (!hasLowerCase) {
    passwordErrorMsg.textContent =
      "Password must include at least one lowercase letter";
  } else if (!hasNumbers) {
    passwordErrorMsg.textContent = "Password must include at least one number";
  } else if (!hasSymbols) {
    passwordErrorMsg.textContent =
      "Password must include at least one special character";
  } else {
    passwordErrorMsg.textContent = "";
    passwordBorder.style.borderColor = "rgb(0, 255, 0)";
    return true;
  }

  passwordBorder.style.borderColor = "rgb(255, 0, 0)";
  return false;
}

// Add input event listeners for real-time validation
inputFirstName.addEventListener("input", () =>
  validateField(inputFirstName, firstNameErrorMsg, firstNameBorder)
);
inputLastName.addEventListener("input", () =>
  validateField(inputLastName, lastNameErrorMsg, lastNameBorder)
);
inputEmail.addEventListener("input", validateEmail);
inputAge.addEventListener("input", () =>
  validateField(inputAge, ageErrorMsg, ageBorder, validateAge)
);
inputPassword.addEventListener("input", () =>
  validateField(
    inputPassword,
    passwordErrorMsg,
    passwordBorder,
    validatePassword
  )
);

function goToAnotherFile() {
  window.location.href = "/html/login.html";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  isValid =
    validateField(inputFirstName, firstNameErrorMsg, firstNameBorder) &&
    isValid;
  isValid =
    validateField(inputLastName, lastNameErrorMsg, lastNameBorder) && isValid;
  isValid =
    validateField(inputEmail, emailErrorMsg, emailBorder, validateEmail) &&
    isValid;
  isValid =
    validateField(inputAge, ageErrorMsg, ageBorder, validateAge) && isValid;
  isValid =
    validateField(
      inputPassword,
      passwordErrorMsg,
      passwordBorder,
      validatePassword
    ) && isValid;

  if (isValid) {
    if (isEmailTaken(inputEmail.value)) {
      emailErrorMsg.textContent = "This email is already registered";
      emailBorder.style.borderColor = "rgb(255, 0, 0)";
    } else {
      const formData = {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        email: inputEmail.value,
        age: inputAge.value,
        password: inputPassword.value,
      };

      formDataArray.push(formData);
      localStorage.setItem("userData", JSON.stringify(formDataArray));

      form.reset();
      [
        firstNameBorder,
        lastNameBorder,
        emailBorder,
        ageBorder,
        passwordBorder,
      ].forEach((border) => {
        border.style.borderColor = "";
      });

      // console.log("Registration successful!");
      successMessage();
    }
  }
});
