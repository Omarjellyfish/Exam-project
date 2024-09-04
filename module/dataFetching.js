async function loadExamQuestions() {
  try {
    const response = await fetch("../Database/examQuestion.json"); // Path to your JSON file
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const examQs = await response.json(); // Parse JSON data
    return examQs;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    displayErrorPage();
  }
}

// Function to display the error page
function displayErrorPage() {
  // Create the error page content
  const errorPage = document.createElement("div");
  errorPage.id = "error-page";
  errorPage.innerHTML = `
      <h1>Error</h1>
      <h2>Sorry, we couldn't load the exam questions. Please try again later.</h2>
    `;

  // Append the error page content to the body
  document.body.appendChild(errorPage);

  // Optionally, hide other content
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("exam").classList.add("hidden");
}

// Function to shuffle an array using Fisher-Yates algorithm thanks gpt
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
