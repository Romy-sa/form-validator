const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
  e.preventDefault();
    isRequired([username, email, password, password2]);
    validateEmail(email);
});

//      ERROR
function error(field,message) {
  field.parentElement.classList.add("error");
  field.parentElement.lastElementChild.textContent = message;
}

//   SUCCESS
function success(field){
  field.parentElement.classList.add("success");
  field.parentElement.classList.remove("error");
}

//    IS REQUIRED
function isRequired(inputsArr) {
  inputsArr.forEach(element => {
    if(element.value.trim() === ``){
      error(element, `${getFieldName(element)} is required`);
    } else {
      checkLength(inputsArr,[3, null, 6, 6]);
      checkMatchingPasswords(password,password2);
    } 
  });
}

//    GET FIELD NAME
function getFieldName(field){
  return field.id.charAt(0).toUpperCase() + field.id.slice(1);
}

//    CHECK LENGTH
function checkLength(fields, lenghts){
  fields.forEach((element,index) => {
    lenghts.forEach((e,i) => {
      if(index === i){
        if(element.value.trim().length < e){
          error(element, `${getFieldName(element)} must be at least ${e} characters`);
        } else {
          success(element);
        }
      }
    });
  });
}


//      Validate Email
function validateEmail(email) {
  if (email.value === ``){
    error(email, `${getFieldName(email)} is required`);
  } else {
      const re = String(email.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (re){
      success(email);
    } else {
      error(email,`Invalid email address`);
    }
  }

}


function checkMatchingPasswords(password,password2){
  if(password.value !== password2.value) {
    error(password2,`passwords do not match`);
  } else {
    success(password);
    success(password2);
  }
}
