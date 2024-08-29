document.addEventListener("DOMContentLoaded", function () {
  const labelUserFirstName = document.getElementById("profile-name");
  const currentUserEmail = localStorage.getItem("currentUser");
  const storedData = JSON.parse(localStorage.getItem("userData")) || [];

  console.log(storedData);
  const currentUser = storedData.find(
    (user) => user.email === currentUserEmail
  );

  if (currentUser) {
    labelUserFirstName.textContent = `Hello, ${currentUser.firstName}!`;
  } else {
    labelUserFirstName.textContent = "Hello, Guest!";
  }
});
