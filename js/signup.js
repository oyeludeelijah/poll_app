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
  signUpContainer.style.filter = "blur(4px)";
  successContainer.classList.remove("hidden");
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
  // console.log(`Validating ${input.id}: ${isValid ? "Valid" : "Invalid"}`);
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
  emailBorder.style.borderColor = "rgb(0, 255, 0)"; // Green border for valid email
  return true;
}

function validateAge(age) {
  if (isNaN(age) || age < 18 || age > 120) {
    ageErrorMsg.textContent = "Please enter a valid age between 18 and 120";
    ageBorder.style.borderColor = "rgb(255, 0, 0)";
    return false;
  }
  ageErrorMsg.textContent = "";
  ageBorder.style.borderColor = "rgb(0, 255, 0)"; // Green border for valid age
  return true;
}

function validatePassword(password) {
  if (password.length < 8) {
    passwordErrorMsg.textContent =
      "Password must be at least 8 characters long";
    passwordBorder.style.borderColor = "rgb(255, 0, 0)";
    return false;
  }
  passwordErrorMsg.textContent = "";
  passwordBorder.style.borderColor = "rgb(0, 255, 0)"; // Green border for valid password
  return true;
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
  // console.log("Form submitted");

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

  // console.log(`Form is ${isValid ? "valid" : "invalid"}`);

  if (isValid) {
    if (isEmailTaken(inputEmail.value)) {
      emailErrorMsg.textContent = "This email is already registered";
      emailBorder.style.borderColor = "rgb(255, 0, 0)";
      // console.log("Registration failed: Email already exists");
    } else {
      // console.log("Form is valid, submitting...");

      // Collect form data and store in array
      const formData = {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        email: inputEmail.value,
        age: inputAge.value,
        password: inputPassword.value,
      };

      // Push the data to the formDataArray
      formDataArray.push(formData);
      console.log("Form data stored in array:", formDataArray);

      // Store the updated formDataArray in localStorage
      localStorage.setItem("userData", JSON.stringify(formDataArray));

      // Check if the data is correctly stored in localStorage
      console.log(
        "Data stored in localStorage:",
        localStorage.getItem("userData")
      );

      // Clear form fields after successful submission
      form.reset();

      // Reset border colors
      [
        firstNameBorder,
        lastNameBorder,
        emailBorder,
        ageBorder,
        passwordBorder,
      ].forEach((border) => {
        border.style.borderColor = "";
      });

      console.log("Registration successful!");
      goToAnotherFile();
    }
  }
});
