// Get the elements from the HTML
const resultsTextElement = document.getElementById("results-text");
const congratsElement = document.getElementById("congrats");

// Retrieve the user name and result from Local Storage
const userData = JSON.parse(localStorage.getItem("userData"));
const userName = userData.userName;
const result = userData.result;

// Update the HTML elements with the retrieved data
//add style for each case of marks
resultsTextElement.textContent += ` ${result}`;
if (result == 10) {
  congratsElement.textContent = `FULL MARK, YOU ARE AMAZING, ${userName}!`;
} else if (result > 7) {
  congratsElement.textContent = `Welldone, ${userName}!`;
} else if (result > 5) {
  congratsElement.textContent = `Good, ${userName}!`;
} else {
  congratsElement.textContent = `You can do better, ${userName}!`;
}
document.getElementById("retake").addEventListener("click", function () {
  window.location.href = "../Exam/Exam.html";
});
//preventing going back unless retake
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1); // Prevent going back
};
