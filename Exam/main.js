import Exam from "../modules/ExamClass.js";
import {
  loadExamQuestions,
  shuffleArray,
  displayErrorPage,
} from "../modules/dataFetching.js";
// Declare user globally
let user; // Will hold the Exam object later

// Event listener to start the exam when "getStarted" is clicked
const getStarted = document.getElementById("getStarted");
getStarted.addEventListener("click", () => {
  loadExamQuestions(displayErrorPage).then((examQs) => {
    if (examQs) {
      shuffleArray(examQs);
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");
      const userName = `${firstName} ${lastName}`;
      const userImage = localStorage.getItem("userImage");

      // Initialize the Exam object
      user = new Exam(userName, examQs, userImage);
      console.log(user); //keep this for getting fullmark in exam as well as showing structure
      // Prevent going back
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1); // Prevent going back
      };
      document.getElementById("landing-page").classList.add("hidden");
      document.getElementById("examContainer").classList.remove("hidden");
    }
  });
});

// Add event listeners, but first ensure "user" is initialized(was not able to use button)
const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  if (user) {
    user.stopExam();
  } else {
    console.error("User is not defined yet!");
  }
});

const next_btn = document.getElementById("next");
next_btn.addEventListener("click", () => {
  if (user) {
    user.getNextQuestion();
  } else {
    console.error("User is not defined yet!");
  }
});

const prev_btn = document.getElementById("prev");
prev_btn.addEventListener("click", () => {
  if (user) {
    user.getPrevQuestion();
  } else {
    console.error("User is not defined yet!");
  }
});

const flag_btn = document.getElementById("mark");
flag_btn.addEventListener("click", () => {
  if (user) {
    user.addMarkedQuestion();
  } else {
    console.error("User is not defined yet!");
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  sessionStorage.setItem("loggedIn", "false");
  window.location.href = "../SignIn And signup/index.html";
});

// Answer choices event listeners
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const a4 = document.getElementById("a4");

a1.addEventListener("click", () => {
  if (user) {
    user.selectAnswer("a1");
  } else {
    console.error("User is not defined yet!");
  }
});

a2.addEventListener("click", () => {
  if (user) {
    user.selectAnswer("a2");
  } else {
    console.error("User is not defined yet!");
  }
});

a3.addEventListener("click", () => {
  if (user) {
    user.selectAnswer("a3");
  } else {
    console.error("User is not defined yet!");
  }
});

a4.addEventListener("click", () => {
  if (user) {
    user.selectAnswer("a4");
  } else {
    console.error("User is not defined yet!");
  }
});

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
// // Prevent going back unless retake url followed by ? casue problems
// window.history.pushState(null, null, window.location.href);
// window.onpopstate = function () {
//   window.history.go(1); // Prevent going back
// };
