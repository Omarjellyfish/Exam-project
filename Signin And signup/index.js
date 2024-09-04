const page_one_btn = document.querySelector("#page_one_btn");

const signin_signup = document.querySelector(".signin-signup");
const page_two_btn = document.querySelector("#page_two_btn");
const page_two_pre = document.querySelector("#page_two_pre");
const page_three_pre = document.querySelector("#page_three_pre");
const regester = document.querySelector("#regester");
const container = document.querySelector(".container");
const panels_container = document.querySelector(".panels-container");

page_one_btn.addEventListener("click", () => {
  signin_signup.classList.add("done");
});
page_two_pre.addEventListener("click", () => {
  signin_signup.classList.remove("done");
});
page_two_btn.addEventListener("click", () => {
  signin_signup.classList.add("end_done");
});
page_three_pre.addEventListener("click", () => {
  signin_signup.classList.remove("end_done");
});

regester.addEventListener("click", () => {
  container.classList.add("sign_up_mode");
  panels_container.style.cssText = `left:-50%`;
  signin_signup.style.cssText = `left:-473px`;
});
// --------------------------------------------------
// const email = document.querySelector("#email");
// const password = document.querySelector("#password");
// const emailError = document.querySelector("#email-error");
// const passwordError = document.querySelector("#password-error");
//   const emailRegex =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!emailRegex.test(email.value) || !email.value) {
//       emailError.textContent = "You must enter a valid email";
//       emailError.style.display = "block";
//     }

//     if (password.value.length < 8) {
//       passwordError.textContent = "Password must be at least 8 characters long";
//       passwordError.style.display = "block";
//     }
// &&
// emailRegex.test(email.value) &&
// password.value.length >= 8
// --------------------------------------------------
// const form_1 = document.querySelector("#form-1");
// form_1.addEventListener("click", (event) => {
//   event.preventDefault();
//   const Fname = document.querySelector("#Fname");
//   const Lname = document.querySelector("#Lname");
//   const fnameError = document.querySelector("#fname-error");
//   const lnameError = document.querySelector("#lname-error");

//   fnameError.style.display = "none";
//   lnameError.style.display = "none";
//   emailError.style.display = "none";
//   passwordError.style.display = "none";

//   if (!Fname.value) {
//     fnameError.textContent = "First name is required";
//     fnameError.style.display = "block";
//   }

//   if (!Lname.value) {
//     lnameError.textContent = "Last name is required";
//     lnameError.style.display = "block";
//   }

//   if (Fname.value && Lname.value) {
//     localStorage.setItem(
//       "userData",
//       JSON.stringify({
//         firstName: Fname.value,
//         lastName: Lname.value,
//       })
//     );
//   }
// });

// -------------------------------------------------
