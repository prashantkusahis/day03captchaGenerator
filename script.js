const captchaTextBox = document.querySelector(".captcha_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captcha_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

//Variable to store generated captcha
let captchaText = null;

//Function to geneate Captcha
const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toLocaleUpperCase() : char
  );
  captchaText = changeString.join(" ");
  captchaTextBox.value = captchaText;
};

const refreshBtnClick = () => {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  //Toggle submit button disable class based on captcha input field.
  submitButton.classList.toggle("disabled", !captchaInputBox.value);
  if (!captchaInputBox.value) message.classList.remove("active");
};

//Function to validate the entered captcha
const submitBtnClick = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");
  message.classList.add("active");

  //Check if the entered captcha text is correct or not
  if (captchaInputBox.value === captchaText) {
    message.innerText = "Entered captcha is correct!";
    message.style.color = "#222620";
  } else {
    message.innerText = "Entered captcha is not correct!";
    message.style.color = "#FF2525";
  }
};

//Add event listeners for the refresh button, captchaInputBox
refreshButton.addEventListener("click", refreshBtnClick);
// captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
captchaInputBox.addEventListener("keyup", (event) => {
  captchaKeyUpValidate();
  if (event.key === "Enter") {
    submitBtnClick();
  }
});
submitButton.addEventListener("click", submitBtnClick);

//Generate a captcha when the page loads
generateCaptcha();
