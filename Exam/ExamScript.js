class Exam {
  //questions => [...{Qs,Cs,As}] array of objects/dictionaries Cs=>array
  //Qs,As=>Text
  constructor(userName, questions, userImage_path) {
    this.userName = userName;
    this.questions = questions;
    this.currentQuestion = 0;
    this.userAnswers = new Array(this.questions.length); //array of text
    console.log(this.userAnswers, "hello from useranswers");
    this.result = 0;
    this.maxResult = this.questions[1].length;
    this.timeLimit(100, this.stopExam);
    this.markedQuestion = new Set();
    this.userImage_path = userImage_path;
    this.displayuser();
    this.displayQuestion();
  }
  displayuser() {
    //display logic
    document.getElementById("userName").innerText = this.userName;
    console.log(this.userImage_path);
    document.getElementById("userImage").src = this.userImage_path;
  }
  getNextQuestion() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion += 1;
      this.displayQuestion();
    }
  }
  getPrevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion -= 1;
      this.displayQuestion();
    }
  }
  displayQuestion() {
    if (this.currentQuestion == this.questions.length - 1) {
      document.getElementById("next").classList.add("hidden");
    } else {
      document.getElementById("next").classList.remove("hidden");
    }
    if (this.currentQuestion == 0) {
      document.getElementById("prev").classList.add("hidden");
    } else {
      document.getElementById("prev").classList.remove("hidden");
    }
    console.log(this.currentQuestion);
    const curQ = this.questions[this.currentQuestion]["question"];
    console.log(curQ);

    // Update question and choices
    document.getElementById("Q").innerText = `Question ${
      this.currentQuestion + 1
    }`;
    document.getElementById("Q-text").innerText = curQ;
    document.getElementById("a1").innerText =
      this.questions[this.currentQuestion]["options"][0];
    document.getElementById("a2").innerText =
      this.questions[this.currentQuestion]["options"][1];
    document.getElementById("a3").innerText =
      this.questions[this.currentQuestion]["options"][2];
    document.getElementById("a4").innerText =
      this.questions[this.currentQuestion]["options"][3];

    // Highlight the selected answer
    const selectedAnswer = this.userAnswers[this.currentQuestion];
    const allButtons = document.querySelectorAll("#answers .ans");
    allButtons.forEach((button) => {
      if (button.innerText === selectedAnswer) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  calculateResult() {
    this.result = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.userAnswers[i] == this.questions[i]["correctAnswer"]) {
        this.result += 1;
      }
    }
  }
  //stops exam display result
  stopExam() {
    this.displayResult();
  }

  displayResult() {
    this.calculateResult();
    //display this.result go to score page
    console.log(this.result);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        result: this.result,
        userName: this.userName,
      })
    );

    // Optionally, navigate to the score page
    window.location.href = "../Score/score.html";
  }

  timeLimit(timeoutSeconds) {
    const endTime = new Date().getTime() + timeoutSeconds * 1000;

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(endTime - currentTime, 0); // Ensure non-negative time

      // Calculate minutes and seconds
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      // Format time to display as MM:SS
      const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      // Display the time on the webpage
      document.getElementById("timer").innerText = formattedTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        this.stopExam();
        document.getElementById("timer").innerText = "0:00"; // Ensure it shows 0:00 when time is up
      }
    }, 250); // Adjusting the interval to 250ms for more frequent updates
  }

  addMarkedQuestion() {
    const flaggedQuestionsContainer =
      document.getElementById("flagged-questions");
    const existingSection = document.getElementById(
      `question-${this.currentQuestion}`
    );

    if (this.markedQuestion.has(this.currentQuestion)) {
      // Unflag: remove the section
      this.markedQuestion.delete(this.currentQuestion);
      if (existingSection) {
        flaggedQuestionsContainer.removeChild(existingSection);
      }
    } else {
      // Flag: add the question to the set and create a new section
      this.markedQuestion.add(this.currentQuestion);

      // Create a new section element
      const newSection = document.createElement("button");
      newSection.className = "flagged-q";
      newSection.id = `question-${this.currentQuestion}`; // Unique ID
      newSection.innerText = `Question ${this.currentQuestion + 1}`;
      newSection.addEventListener("click", () => {
        const text = newSection.innerText;
        this.currentQuestion = parseInt(text.match(/\d+/)[0] - 1, 10); //regex to get number
        this.displayQuestion();
      });

      // Append the new section to the flagged questions container
      flaggedQuestionsContainer.appendChild(newSection);
    }
  }
  selectAnswer(ans_id) {
    const ans = document.getElementById(ans_id);

    // Save the answer for the current question
    this.userAnswers[this.currentQuestion] = ans.innerText;
    console.log(this.userAnswers);

    // Remove 'selected' class from all answer buttons
    const allButtons = document.querySelectorAll("#answers .ans");
    allButtons.forEach((button) => button.classList.remove("selected"));

    // Add 'selected' class to the clicked button
    ans.classList.add("selected");
  }
}

//all this should be moved into an independent file

//start===>) make this into an independtent file called Question fetching and organizing
// Creating a function to fetch teh questions and parse
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

//  ===>) this the end of what should be another class/independent file?

//main file to run the code and import all the required modules
//get started
const getStarted = document.getElementById("getStarted");
getStarted.addEventListener("click", () => {
  loadExamQuestions().then((examQs) => {
    if (examQs) {
      // Initialize your Exam object with the fetched questions
      shuffleArray(examQs);
      user = new Exam("omarkandil", examQs, "userImage.jpg"); //get username and userImage using local storage or pathing?
      document.getElementById("landing-page").classList.add("hidden");
      document.getElementById("exam").classList.remove("hidden");
    }
  });
});

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  user.stopExam();
});

const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const a4 = document.getElementById("a4");

a1.addEventListener("click", () => {
  user.selectAnswer("a1");
});
a2.addEventListener("click", () => {
  user.selectAnswer("a2");
});
a3.addEventListener("click", () => {
  user.selectAnswer("a3");
});
a4.addEventListener("click", () => {
  user.selectAnswer("a4");
});

const next_btn = document.getElementById("next");
const prev_btn = document.getElementById("prev");
const flag_btn = document.getElementById("mark");
next_btn.addEventListener("click", () => {
  user.getNextQuestion();
});

prev_btn.addEventListener("click", () => {
  user.getPrevQuestion();
});

flag_btn.addEventListener("click", () => {
  user.addMarkedQuestion();
});
