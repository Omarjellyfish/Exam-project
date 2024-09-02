class Exam {
  //questions => [[Qs],[As]], username as identifier
  constructor(userName, questions) {
    this.userName = userName;
    this.questions = questions;
    this.currentQuestion = 0;
    this.userAnswers = [];
    this.result = 0;
    this.maxResult = this.questions[1].length;
    this.timeLimit(100, this.stopExam);
    this.markedQuestion = [];
    this.displayuser();
  }
  displayuser() {
    //display logic
    this.userName;
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
    curQ = this.questions[currentQuestion];
    //updating html display logic
    document.getElementById("Q-text").innerHTML = curQ;
  }

  calculateResult() {
    for (let i = 0; i < this.questions[1].length; i++) {
      if (this.userAnswers[i] == questions[1][i]) {
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
    const startTime = new Date().getTime();

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= timeoutSeconds * 1000) {
        clearInterval(interval);
        this.stopExam();
      }
    }, 100); // Adjust the interval as needed for accuracy
  }

  addMarkedQuestion() {
    this.markedQuestion.append(this.currentQuestion);
    //display logic here
  }
}
let user = new Exam("om", []);
const database = json();

//use this design later
// Array to hold all the questions, answers, and the correct answer
let examQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2, // index of the correct answer in the options array
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
  {
    question: "Which of these is a fruit?",
    options: ["Carrot", "Potato", "Apple", "Broccoli"],
    correctAnswer: 2,
  },
];

// Function to display a question and its options
function displayQuestion(index) {
  let currentQuestion = examQuestions[index];
  console.log(currentQuestion.question);
  currentQuestion.options.forEach((option, i) => {
    console.log(`${i + 1}. ${option}`);
  });
}

// Function to check if the selected answer is correct
function checkAnswer(index, selectedOption) {
  let currentQuestion = examQuestions[index];
  return currentQuestion.correctAnswer === selectedOption;
}

// Example of usage
displayQuestion(0); // Displays the first question and its options
let userAnswer = 2; // Let's say the user selects the third option
if (checkAnswer(0, userAnswer - 1)) {
  console.log("Correct!");
} else {
  console.log("Wrong answer.");
}
