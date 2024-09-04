const page_one_btn = document.querySelector("#page_one_btn");
const signin_signup = document.querySelector(".signin-signup");
const page_two_btn = document.querySelector("#page_two_btn");
const page_two_pre = document.querySelector("#page_two_pre");
const page_three_pre = document.querySelector("#page_three_pre");
const regester = document.querySelector("#regester");
const container = document.querySelector(".container");
const panels_container = document.querySelector(".panels-container");

// /////////////////////////////////////////////////////////////////////
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

  const isFnameValid = validateInput(
    Fname,
    fnameError,
    "First Name is required"
  );
  const isLnameValid = validateInput(
    Lname,
    lnameError,
    "Last Name is required"
  );

  if (!isFnameValid || !isLnameValid) {
    event.preventDefault();
  } else {
    // Save data to LocalStorage
    localStorage.setItem("firstName", Fname.value);
    localStorage.setItem("lastName", Lname.value);

    page_one_btn.addEventListener("click", () => {
      signin_signup.classList.add("done");
    });
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

  let isEmailValid = true;
  let isImageValid = true;

  if (!emailRegex.test(email.value)) {
    emailError.textContent = "A valid email is required";
    isEmailValid = false;
  } else {
    emailError.textContent = "";
  }

  // Validate image
  if (image.value === "") {
    imageError.textContent = "Image is required";
    isImageValid = false;
  } else {
    imageError.textContent = "";
  }

  // Prevent moving to the next page if inputs are invalid
  if (!isEmailValid || !isImageValid) {
    event.preventDefault();
  } else {
    // Save data to LocalStorage
    localStorage.setItem("email", email.value);

    page_two_btn.addEventListener("click", () => {
      signin_signup.classList.add("end_done");
    });
    page_three_pre.addEventListener("click", () => {
      signin_signup.classList.remove("end_done");
    });
  }
});

// Form 3 Validation
regester.addEventListener("click", (event) => {
  const password = document.querySelector("#password");
  const rePassword = document.querySelector("#re-password");
  const passwordError = document.querySelector("#password-error");
  const rePasswordError = document.querySelector("#re-password-error");

  const isPasswordValid =
    validateInput(
      password,
      passwordError,
      "Password must be at least 8 characters"
    ) && password.value.length >= 8;
  const isRePasswordValid =
    validateInput(rePassword, rePasswordError, "Passwords do not match") &&
    rePassword.value === password.value;

  if (!isPasswordValid || !isRePasswordValid) {
    event.preventDefault();
  } else {
    // Save data to LocalStorage
    localStorage.setItem("password", password.value);

    regester.addEventListener("click", () => {
      container.classList.add("sign_up_mode");
      panels_container.style.cssText = `left:-50%`;
      signin_signup.style.cssText = `left:-473px`;
    });
  }
});

// Form 4 Validation
const page_four_btn = document.querySelector("#page_four_btn");
page_four_btn.addEventListener("click", (event) => {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Get stored data
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  // Validate email and password
  const isEmailValid =
    emailRegex.test(email.value) &&
    validateInput(email, emailError, "A valid email is required");
  const isPasswordValid = validateInput(
    password,
    passwordError,
    "Password is required"
  );

  // Check if entered data matches the stored data
  const isDataMatching =
    email.value === storedEmail && password.value === storedPassword;

  if (!isEmailValid || !isPasswordValid || !isDataMatching) {
    // Prevent default action
    event.preventDefault();

    // Display errors if data does not match
    if (!isDataMatching) {
      emailError.textContent = "Incorrect email or password";
      passwordError.textContent = "Incorrect email or password";
    }
  } else {
    // Clear previous error messages if data is valid
    emailError.textContent = "";
    passwordError.textContent = "";

    // Redirect to the specified path
    window.location.href = "../Exam/Exam.html";
  }
});
