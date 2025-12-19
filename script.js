const form = document.querySelector(".form");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");
const submit = document.querySelector(".submit");

//  Show error message
function showError(input, message) {
  const fieldControl = input.parentElement;
  fieldControl.className = 'form-control error';
  const error = fieldControl.querySelector("small");
  error.innerText = message;
}

//  Show success outline
function showSuccess(input) {
  const fieldControl = input.parentElement;
  fieldControl.className = 'form-control success';
}

//  Check required inputs
function checkRequired(array) {
  array.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.id} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//  Check minimum & maximum length of input
function checkLength(input,min,max) {
  if(input.value.length < min) {
    showError(input, `${input.id} should be at least ${min} characters`);
  } else if(input.value.length > max) {
    showError(input, `${input.id} should be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

//  Check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

//  Check matching of passwords
function checkPasswordsMatch(password, password2) {
  if(password.value.trim() !== password2.value.trim()) {
    showError(password2, `Passwords do not match`);
  }
}
 
// Listen for form submission
form.addEventListener("submit", (e) => {
  checkRequired([username,email,password,password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  e.preventDefault();
});