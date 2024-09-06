const resultsTextElement = document.getElementById("results-text");
const congratsElement = document.getElementById("congrats");

// Retrieve the user name and result from Local Storage
const userData = JSON.parse(localStorage.getItem("userData"));
const userName = userData.userName;
const result = userData.result;
const maxResult = userData.maxResult;
let percentage = parseInt(result) / parseInt(maxResult);

// Update the HTML elements with the retrieved data
resultsTextElement.textContent = `You Scored: ${result}/${maxResult}`;

if (percentage == 1) {
  document.getElementById("retake").classList.add("hidden");
  congratsElement.textContent = `FULL MARK, YOU ARE AMAZING, ${userName}!`;
  // Apply the rainbow effect for full mark
  resultsTextElement.classList.add("rainbow-text");
  congratsElement.classList.add("rainbow-text");

  // Trigger confetti animation
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
  });
} else if (percentage > 0.7) {
  congratsElement.textContent = `Welldone, ${userName}!`;
} else if (percentage > 0.5) {
  congratsElement.textContent = `Good, ${userName}!`;
} else {
  congratsElement.textContent = `You can do better, ${userName}!`;
}

document.getElementById("retake").addEventListener("click", function () {
  window.location.replace("../Exam/Exam.html");
});

// // Prevent going back unless retake why doesnt it work?
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1); // Prevent going back
};

//UNCOMMENT THIS BEFORE DELIVERING THE PROJECT
// CHECK IF USER LOGGED IN OR NOT, IF NOT REDIRECTS TO SIGNUP PAGE
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  if (
    sessionStorage.getItem("loggedIn") === null ||
    sessionStorage.getItem("loggedIn") === "false"
  ) {
    window.location.replace("../Signin And signup/index.html"); // Redirect to login page if not logged in
  }
});
