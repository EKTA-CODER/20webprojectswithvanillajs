const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const username = document.querySelector("#username");

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.add("success");
};

const isValidEmail = (input) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|in|biz|info|mobi|name|aero|jobs|museum)\b/;
  if (re.test(String(input).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
};

const getFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);

const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.trim().length < min) {
    showError(input, `${getFieldName(input)} must atleast be ${min} characters`);
  } else {
    showSuccess(input);
  }
};

const passwordsMatch = (input1, input2) => {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input1, `Passwords do not match`);
    showError(input2, `Passwords do not match`);
  }
};
//Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 12);
  checkLength(password, 8, 25);
  isValidEmail(email);
  passwordsMatch(password, password2);
});
