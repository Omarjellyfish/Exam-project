// Get the elements from the HTML
const resultsTextElement = document.getElementById("results-text");
const congratsElement = document.getElementById("congrats");

// Retrieve the user name and result from Local Storage
const savedData = JSON.parse(localStorage.getItem("userData"));
const userName = savedData.userName;
const result = savedData.result;

// Update the HTML elements with the retrieved data
resultsTextElement.textContent += ` ${result}`;
congratsElement.textContent = `Congratulations, ${userName}!`;
