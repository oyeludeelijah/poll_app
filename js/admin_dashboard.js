// Simulated data - replace with actual data fetching logic
let polls = [
  // { id: 1, question: "Favorite color?", status: "Active", votes: 150 },
  // {
  //   id: 2,
  //   question: "Best programming language?",
  //   status: "Closed",
  //   votes: 300,
  // },
  // {
  //   id: 3,
  //   question: "Preferred work environment?",
  //   status: "Active",
  //   votes: 75,
  // },
];

const users = [
  { id: 1, username: "john_doe", email: "john@example.com" },
  { id: 2, username: "jane_smith", email: "jane@example.com" },
];

// Function to load poll data from localStorage
function loadPollDataFromLocalStorage() {
  const storedPollData = localStorage.getItem("pollData");
  if (storedPollData) {
    const newPoll = JSON.parse(storedPollData);
    const newPollObject = {
      id: polls.length + 1,
      question: newPoll.topic,
      status: "Active",
      votes: 0,
      images: newPoll.images,
      answers: newPoll.answers,
    };
    polls.unshift(newPollObject);
    localStorage.removeItem("pollData"); // Clear the stored data after adding it to the polls array
  }
}

// Function to populate polls table
function populatePollsTable() {
  const tableBody = document.getElementById("polls-table-body");
  tableBody.innerHTML = "";
  polls.forEach((poll) => {
    const row = `
      <tr>
        <td>${poll.question}</td>
        <td>${poll.status}</td>
        <td>
          <button onclick="editPoll(${poll.id})">Edit</button>
          <button onclick="deletePoll(${poll.id})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Function to populate users table
function populateUsersTable() {
  const tableBody = document.getElementById("users-table-body");
  tableBody.innerHTML = "";
  users.forEach((user) => {
    const row = `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Function to update overall stats
function updateOverallStats() {
  document.getElementById("total-polls").textContent = polls.length;
  document.getElementById("total-users").textContent = users.length;
  document.getElementById("total-votes").textContent = polls.reduce(
    (sum, poll) => sum + poll.votes,
    0
  );
}

// Function to display individual poll stats
function displayIndividualPollStats() {
  const statsContainer = document.getElementById("individual-poll-stats");
  statsContainer.innerHTML = "";
  polls.forEach((poll) => {
    const pollStats = `
      <div class="poll-stats">
        <h3>${poll.question}</h3>
        <p>Status: ${poll.status}</p>
        <p>Total Votes: ${poll.votes}</p>
        ${poll.images ? `<p>Number of Images: ${poll.images.length}</p>` : ""}
        ${
          poll.answers ? `<p>Number of Answers: ${poll.answers.length}</p>` : ""
        }
      </div>
    `;
    statsContainer.innerHTML += pollStats;
  });
}

// Initialize the dashboard
function initDashboard() {
  loadPollDataFromLocalStorage();
  populatePollsTable();
  populateUsersTable();
  updateOverallStats();
  displayIndividualPollStats();
}

// Call initDashboard when the page loads
window.onload = initDashboard;

// Placeholder functions for edit and delete actions
function editPoll(id) {
  console.log(`Editing poll with id ${id}`);
}

function deletePoll(id) {
  console.log(`Deleting poll with id ${id}`);
}

function editUser(id) {
  console.log(`Editing user with id ${id}`);
}

function deleteUser(id) {
  console.log(`Deleting user with id ${id}`);
}
