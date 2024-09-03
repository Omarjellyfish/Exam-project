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
