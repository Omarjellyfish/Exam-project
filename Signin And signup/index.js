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

  // Check if user is already logged in
  if (sessionStorage.getItem("loggedIn")) {
    window.location.href = "../Exam/Exam.html";
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

  // Form 3 Validation
  regester.addEventListener("click", (event) => {
    const password = document.querySelector("#password");
    const rePassword = document.querySelector("#re-password");
    const passwordError = document.querySelector("#password-error");
    const rePasswordError = document.querySelector("#re-password-error");

    // Validate password length
    const isPasswordValid =
      validateInput(
        password,
        passwordError,
        "Password must be at least 8 characters"
      ) && password.value.length >= 8;

    // Validate if passwords match
    const isRePasswordValid =
      validateInput(rePassword, rePasswordError, "Passwords do not match") &&
      rePassword.value === password.value;

    // Display appropriate error messages
    if (!isPasswordValid) {
      passwordError.textContent = "Password must be at least 8 characters";
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
