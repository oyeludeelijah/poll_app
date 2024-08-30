const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailErrorMsg = document.getElementById("email-errorMsg");
const passwordErrorMsg = document.getElementById("password-errorMsg");
const generalErrorMsg = document.getElementById("general-error-msg");
const emailBox = document.getElementById("email-box");
const passwordBox = document.getElementById("password-box");

// Hardcoded admin credentials
const adminCredentials = {
  email: "admin@example.com",
  password: "admin123",
};

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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  isValid = validateField(email, emailErrorMsg, emailBox) && isValid;
  isValid = validateField(password, passwordErrorMsg, passwordBox) && isValid;

  if (isValid) {
    if (
      email.value === adminCredentials.email &&
      password.value === adminCredentials.password
    ) {
      console.log("Admin login successful!");

      localStorage.setItem("currentUser", email.value);
      localStorage.setItem("isAdmin", "true"); // Mark as admin

      // Redirect to the admin dashboard
      window.location.href = "/html/admin_dashboard.html";
    } else {
      generalErrorMsg.textContent = "Invalid email or password";
      emailBox.style.borderColor = "rgb(255, 0, 0)";
      passwordBox.style.borderColor = "rgb(255, 0, 0)";
    }
  }
});
