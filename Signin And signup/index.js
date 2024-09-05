document.addEventListener("DOMContentLoaded", () => {
  const page_one_btn = document.querySelector("#page_one_btn");
  const signin_signup = document.querySelector(".signin-signup");
  const page_two_btn = document.querySelector("#page_two_btn");
  const page_two_pre = document.querySelector("#page_two_pre");
  const page_three_pre = document.querySelector("#page_three_pre");
  const regester = document.querySelector("#regester");
  const container = document.querySelector(".container");
  const panels_container = document.querySelector(".panels-container");
  const pageFourBtn = document.querySelector("#page_four_btn");

  const login_btn = document.querySelector("#login-btn");
  login_btn.addEventListener("click", () => {
    container.classList.add("sign_up_mode");
    panels_container.style.cssText = `left: -50%`;
    signin_signup.style.cssText = `left: -473px`;
  });

  // Check if user is already logged in
  if (sessionStorage.getItem("loggedIn") === "true") {
    window.location.replace("../Exam/Exam.html");
  }

  // Function to validate input fields
  function validateInput(input, errorElement, errorMessage) {
    if (!input.value.trim()) {
      errorElement.textContent = errorMessage;
      return false;
    } else {
      errorElement.textContent = "";
      return true;
    }
  }

  // Form 1 Validation
  page_one_btn.addEventListener("click", (event) => {
    const Fname = document.querySelector("#Fname");
    const Lname = document.querySelector("#Lname");
    const fnameError = document.querySelector("#fname-error");
    const lnameError = document.querySelector("#lname-error");

    // Function to validate that input contains only text
    function validateTextInput(input, errorElement, errorMessage) {
      const textRegex = /^[A-Za-z\s]+$/;
      if (!input.value.trim()) {
        errorElement.textContent = "This field is required";
        return false;
      } else if (!textRegex.test(input.value.trim())) {
        errorElement.textContent = errorMessage;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    }

    const isFnameValid = validateTextInput(
      Fname,
      fnameError,
      "First Name must contain only letters"
    );
    const isLnameValid = validateTextInput(
      Lname,
      lnameError,
      "Last Name must contain only letters"
    );

    if (!isFnameValid || !isLnameValid) {
      event.preventDefault();
    } else {
      // Save data to LocalStorage
      localStorage.setItem("firstName", Fname.value);
      localStorage.setItem("lastName", Lname.value);

      signin_signup.classList.add("done");
      page_two_pre.addEventListener("click", () => {
        signin_signup.classList.remove("done");
      });
    }
  });

  // Form 2 Validation
  page_two_btn.addEventListener("click", (event) => {
    const email = document.querySelector("#email");
    const image = document.querySelector("#image");
    const emailError = document.querySelector("#email-error");
    const imageError = document.querySelector("#image-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = emailRegex.test(email.value);
    const isImageValid = image.value.trim() !== "";

    if (!isEmailValid) {
      emailError.textContent = "A valid email is required";
    } else {
      emailError.textContent = "";
    }

    if (!isImageValid) {
      imageError.textContent = "Image is required";
    } else {
      imageError.textContent = "";
    }

    // Prevent moving to the next page if inputs are invalid
    if (!isEmailValid || !isImageValid) {
      event.preventDefault();
    } else {
      // Save data to LocalStorage
      localStorage.setItem("email", email.value);

      signin_signup.classList.add("end_done");
      page_three_pre.addEventListener("click", () => {
        signin_signup.classList.remove("end_done");
      });
    }
  });
  const signup_btn = document.querySelector("#signup-btn");
  signup_btn.addEventListener("click", () => {
    container.classList.remove("sign_up_mode");
    panels_container.style.cssText = `left: 50%`;
    signin_signup.style.cssText = `left: 44px`;
  });

  // Form 3 Validation
  regester.addEventListener("click", (event) => {
    const password = document.querySelector("#password");
    const rePassword = document.querySelector("#re-password");
    const passwordError = document.querySelector("#password-error");
    const rePasswordError = document.querySelector("#re-password-error");

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Validate password using the regex
    const isPasswordValid = passwordRegex.test(password.value);
    const isRePasswordValid =
      validateInput(rePassword, rePasswordError, "Passwords do not match") &&
      rePassword.value === password.value;

    // Display appropriate error messages
    if (!isPasswordValid) {
      passwordError.textContent =
        "Password must be at least 8 characters, include 1 special character, 1 number, 1 capital letter, and 1 small letter";
    } else {
      passwordError.textContent = "";
    }

    if (!isRePasswordValid) {
      rePasswordError.textContent = "Passwords do not match";
    } else {
      rePasswordError.textContent = "";
    }

    // Prevent form submission if validation fails
    if (!isPasswordValid || !isRePasswordValid) {
      event.preventDefault();
    } else {
      // Save data to LocalStorage
      localStorage.setItem("password", password.value);

      // Transition to the next page
      container.classList.add("sign_up_mode");
      panels_container.style.cssText = `left: -50%`;
      signin_signup.style.cssText = `left: -473px`;
    }
  });

  // Form 4 Validation
  pageFourBtn.addEventListener("click", (event) => {
    const emailInput = document.querySelector("#email-log");
    const passwordInput = document.querySelector("#password-log");
    const emailError = document.querySelector("#email-error-log");
    const passwordError = document.querySelector("#password-error-log");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    const isEmailValid = emailRegex.test(emailInput.value);
    if (!isEmailValid) {
      emailError.textContent = "A valid email is required";
    } else {
      emailError.textContent = "";
    }

    // Validate password
    const isPasswordValid = validateInput(
      passwordInput,
      passwordError,
      "Password is required"
    );

    // Check credentials in LocalStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (isEmailValid && isPasswordValid) {
      if (
        emailInput.value === storedEmail &&
        passwordInput.value === storedPassword
      ) {
        // User is authenticated
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "../Exam/Exam.html";
      } else {
        // Authentication failed
        emailError.textContent = "Invalid email or password";
        passwordError.textContent = "Invalid email or password";
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  });
});

//خلي الكود ده عندك عايزين نظبطه, هو ده المفروض بتشيك ع اليوزر نيم و الباسوورد لو هما صح من الفايل يعمل لوج انت عادي
// const fs = require('fs');

// // Read the JSON file
// const data = JSON.parse(fs.readFileSync('userData.json', 'utf8'));

// // Function to check if the username and password match
// function authenticateUser(username, password) {
//   const user = data.users[username];

//   if (user && user.password === password) {
//     return true; // Authentication successful
//   } else {
//     return false; // Authentication failed
//   }
// }

// // Example usage
// const providedUsername = "username1";
// const providedPassword = "Omar@1234";

// if (authenticateUser(providedUsername, providedPassword)) {
//   console.log("Authentication successful!");
// } else {
//   console.log("Authentication failed.");
// }

const signup_btn = document.querySelector("#signup-btn");
signup_btn.addEventListener("click", () => {
  container.classList.remove("sign_up_mode");
  panels_container.style.cssText = `left: 50%`;
  signin_signup.style.cssText = `left: 44px`;
});

// Function to convert image to Base64 and store it in local storage
function saveImageToLocalStorage() {
  const fileInput = document.getElementById("image");

  // Listen for file selection
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Read file as Data URL (Base64)
      reader.readAsDataURL(file);

      reader.onload = function (e) {
        const base64Image = e.target.result;

        // Store the base64 string in local storage
        localStorage.setItem("userImage", base64Image);
        console.log("Image saved in local storage!");
      };

      reader.onerror = function () {
        console.log("Error reading file!");
      };
    } else {
      console.log("No file selected!");
    }
  });
}

// Call the function to set up the event listener
saveImageToLocalStorage();
