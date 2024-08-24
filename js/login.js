const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const usernameErrorMsg = document.getElementById("username-errorMsg");
const passwordErrorMsg = document.getElementById("password-errorMsg");
const usernameBox = document.getElementById("username-box");
const passwordBox = document.getElementById("password-box");

function validateField(input, errorMsg, border) {
  let isValid = true;
  if (!input.value) {
    errorMsg.textContent = "This field is required";
    border.style.borderColor = "rgb(255, 0, 0)";
    isValid = false;
  } else {
    errorMsg.textContent = "";
    border.style.borderColor = "rgb(0, 255, 0)"; // Green border for valid input
  }
  console.log(`Validating ${input.id}: ${isValid ? "Valid" : "Invalid"}`);
  return isValid;
}

username.addEventListener("input", () =>
  validateField(username, usernameErrorMsg, usernameBox)
);
password.addEventListener("input", () =>
  validateField(password, passwordErrorMsg, passwordBox)
);

function goToAnotherFile() {
  window.location.href = "/html/voting_page.html";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form submitted");

  let isValid = true;

  isValid = validateField(username, usernameErrorMsg, usernameBox) && isValid;
  isValid = validateField(password, passwordErrorMsg, passwordBox) && isValid;

  console.log(`Form is ${isValid ? "valid" : "invalid"}`);

  if (isValid) {
    goToAnotherFile();
    // let storedData = JSON.parse(localStorage.getItem("userData"));

    // if (storedData) {
    //   console.log("User data retrieved", storedData);
    //   const user = storedData.find(
    //     (user) =>
    //       user.email === username.value && user.password === password.value
    //   );

    //   if (user) {
    //     console.log("Login successful!");
    //     // Redirect to the poll page or wherever you want to go
    //     window.location.href = "html\voting_page.html";
    //   } else {
    //     usernameErrorMsg.textContent = "Invalid email or password";
    //     passwordErrorMsg.textContent = "Invalid email or password";
    //     usernameBox.style.borderColor = "rgb(255, 0, 0)";
    //     passwordBox.style.borderColor = "rgb(255, 0, 0)";
    //   }
    // } else {
    //   console.log("No user data found.");
    //   usernameErrorMsg.textContent = "No users are registered";
    // }
  }
});

// ///////////////////////////////////////////////
// const validateUsername = function () {
//   if (!username.value) {
//     usernameErrorMsg.textContent = "This field is required";
//     usernameBox.style.borderColor = "rgb(255, 0, 0)";
//   } else {
//     usernameErrorMsg.textContent = "";
//     usernameBox.style.borderColor = "";
//   }
// };

// const validateEmail = function () {
//   if (!password.value) {
//     passwordErrorMsg.textContent = "This field is required";
//     passwordBox.style.borderColor = "rgb(255, 0, 0)";
//   } else {
//     passwordErrorMsg.textContent = "";
//     passwordBox.style.borderColor = "";
//   }
// };

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   validateUsername();
//   validateEmail();
// });

// btnLogin.addEventListener('click', function (wur) {
//   wur.preventDefault();

//   currentAccount = accounts.find(
//     acc => acc.userName === inputLoginUsername.value
//   );
//   console.log(currentAccount);
//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     // display UI and message
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(' ')[0]
//     }`;
//     containerApp.style.opacity = 100;

//     inputLoginUsername.value = inputLoginPin.value = '';
//     inputLoginUsername.blur();
//     inputLoginPin.blur();
//     // display movement

//     // Update UI
//     updateUI(currentAccount);
//   }
// });
