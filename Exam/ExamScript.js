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
    this.displayuser();
    this.userImage_path = userImage_path;
    this.displayQuestion();
  }
  displayuser() {
    //display logic
    document.getElementById("userName").innerText = this.userName;
    document.getElementById("userImage").src = this.userImage_path;
  }
  getNextQuestion() {
    this.currentQuestion += 1;
    this.displayQuestion();
  }
  getPrevQuestion() {
    this.currentQuestion -= 1;
    this.displayQuestion();
  }
  displayQuestion() {
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
    for (let i = 0; i < this.questions.length; i++) {
      if (this.userAnswers[i] == this.questions[i][correctAnswer]) {
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
    //display this.result
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

//use this design later
// Array to hold all the questions, answers, and the correct answer
let examQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris", // index of the correct answer in the options array
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "Which of these is a fruit?",
    options: ["Carrot", "Potato", "Apple", "Broccoli"],
    correctAnswer: "Apple",
  },
];

user = new Exam("omarkandil", examQuestions);

const next_btn = document.getElementById("next");
const prev_btn = document.getElementById("prev");
const flag_btn = document.getElementById("mark");

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

next_btn.addEventListener("click", () => {
  user.getNextQuestion();
});

prev_btn.addEventListener("click", () => {
  user.getPrevQuestion();
});

flag_btn.addEventListener("click", () => {
  user.addMarkedQuestion();
});
