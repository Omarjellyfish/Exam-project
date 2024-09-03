class Exam {
  //questions => [...{Qs,Cs,As}] array of objects/dictionaries Cs=>array
  //Qs,As=>Text
  constructor(userName, questions, userImage_path) {
    this.userName = userName;
    this.questions = questions;
    this.currentQuestion = 0;
    this.userAnswers = [""] * this.questions.length; //array of text
    this.result = 0;
    this.maxResult = this.questions[1].length;
    this.timeLimit(100, this.stopExam);
    this.markedQuestion = [];
    this.displayuser();
    this.userImage_path = userImage_path;
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
    let curQ = this.questions[this.currentQuestion]["question"];
    console.log(curQ);
    //updating html display logic
    // choices = this.questions[this.currentQuestion][options];
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
    this.markedQuestion.append(this.currentQuestion);
    //display logic here
  }
  selectAnswer() {
    ans = document.getElementById("selection_id").innerText;
    this.userAnswers[this.currentQuestion] = ans;
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

// // Function to display a question and its options
// function displayQuestion(index) {
//   let currentQuestion = examQuestions[index];
//   console.log(currentQuestion.question);
//   currentQuestion.options.forEach((option, i) => {
//     console.log(`${i + 1}. ${option}`);
//   });
// }

// // Function to check if the selected answer is correct
// function checkAnswer(index, selectedOption) {
//   let currentQuestion = examQuestions[index];
//   return currentQuestion.correctAnswer === selectedOption;
// }

// // Example of usage
// displayQuestion(0); // Displays the first question and its options
// let userAnswer = 2; // Let's say the user selects the third option
// if (checkAnswer(0, userAnswer - 1)) {
//   console.log("Correct!");
// } else {
//   console.log("Wrong answer.");
// }

user = new Exam("omarkandil", examQuestions);
const next_btn = document.getElementById("next");
const prev_btn = document.getElementById("prev");
next_btn.addEventListener("click", () => {
  user.getNextQuestion();
});
prev_btn.addEventListener("click", () => {
  user.getPrevQuestion();
});
