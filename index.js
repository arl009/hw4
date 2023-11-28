const form_errors = [];
const date = new Date();

const form = document.getElementById("myForm");
form.noValidate = true
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const commentsInput = document.getElementById("comments");
const nameError = document.getElementById("nameError");
const nameInfo = document.getElementById("nameInfo");
const emailError = document.getElementById("emailError");
const emailInfo = document.getElementById("emailInfo");
const commentsError = document.getElementById("commentsError");
const commentsInfo = document.getElementById("commentsInfo");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear any existing messages
  nameError.textContent = "";
  nameInfo.textContent = "";
  emailError.textContent = "";
  emailInfo.textContent = "";
  commentsError.textContent = "";
  nameInput.setCustomValidity("");
  emailInput.setCustomValidity("");
  commentsInput.setCustomValidity("");

  let formIsValid = true;

  // Check the validity of the email field
  if (!nameInput.checkValidity()) {
    if (nameInput.value.length == 0) {
      nameInput.setCustomValidity("Enter a username");
    } else {
      nameInput.setCustomValidity("Invalid username");
    }
    nameError.textContent = nameInput.validationMessage;
    const currTime = new Date().getTime();
    var time = new Date(currTime);
    form_errors.push([nameInput.validationMessage, time.toString()]);
    event.preventDefault();
    formIsValid = false;
  }
  if (!emailInput.checkValidity()) {
    if (emailInput.value.length == 0) {
      emailInput.setCustomValidity("Enter an email");
    } else {
      emailInput.setCustomValidity("Invalid email address");
    }
    emailError.textContent = emailInput.validationMessage;
    const currTime = new Date().getTime();
    var time = new Date(currTime);
    form_errors.push([emailInput.validationMessage, time.toString()]);
    event.preventDefault();
    formIsValid = false;
  }
  if (!commentsInput.checkValidity()) {
    if (commentsInput.value.length < 10) {
      commentsInput.setCustomValidity("Comment not long enough");
    } else {
      commentsInput.setCustomValidity("Invalid comment");
    }
    commentsError.textContent = commentsInput.validationMessage;
    const currTime = new Date().getTime();
    var time = new Date(currTime);
    form_errors.push([commentsInput.validationMessage, time.toString()]);
    event.preventDefault();
    formIsValid = false;
  }
  if (formIsValid) {
    const formErrorsField = document.createElement("input");
    formErrorsField.type = "hidden";
    formErrorsField.name = "form_errors";
    formErrorsField.value = JSON.stringify(form_errors);
    form.appendChild(formErrorsField);
    form.submit();
    while (form_errors.length > 0) {
      form_errors.pop();
    }
  }
});

let commentTimer = null;

commentsInput.addEventListener("input", function () {
  const maxLength = commentsInput.getAttribute("maxlength");
  const commentRegex = /^[\w\s.,!?']+$/;

  if (commentsInput.value.length != 0) {
    if (!commentRegex.test(commentsInput.value)) {
      // Flash the input field
      commentsError.classList.remove("flash-error");
      commentsError.classList.add("flash-error");

      function resetTimeout() {
        window.clearTimeout(commentTimer);

        commentTimer = window.setTimeout(function () {
          commentsError.classList.remove("flash-error");
          commentsError.textContent = "";
        }, 1000);
      }

      // Show error message
      commentsError.textContent = "Illegal character detected!";

      resetTimeout();

      // Prevent the illegal character from being input
      // This will remove the last character entered
      commentsInput.value = commentsInput.value.slice(0, -1);
    }
  }
  const currentLength = commentsInput.value.length;
  const remaining = maxLength - currentLength;

  commentsInfo.textContent = remaining + " characters remaining";

  if (remaining <= 20) {
    commentsInfo.classList.add("warn");
  } else {
    commentsInfo.classList.remove("warn");
  }
  if (remaining <= 0) {
    commentsInfo.classList.remove("warn");
    commentsInfo.classList.add("error");
  } else {
    commentsInfo.classList.remove("error");
  }
});

nameInput.addEventListener("input", function () {
  const maxLength = nameInput.getAttribute("maxlength");
  const nameRegex = /^[A-Za-z\s]+$/;

  if (nameInput.value.length != 0) {
    if (!nameRegex.test(nameInput.value)) {
      // Flash the input field
      nameError.classList.remove("flash-error");
      void nameError.offsetWidth;
      nameError.classList.add("flash-error");

      nameError.textContent = "Illegal character detected!";

      nameInput.value = nameInput.value.slice(0, -1);
    }
  }
});

emailInput.addEventListener("input", function () {
  const maxLength = emailInput.getAttribute("maxlength");
  const emailRegex = /^[\w\s.@']+$/;

  if (emailInput.value.length != 0) {
    if (!emailRegex.test(emailInput.value)) {
      nameError.classList.remove("flash-error");
      void nameError.offsetWidth;
      nameError.classList.add("flash-error");

      emailError.textContent = "Illegal character detected!";

      resetTimeout();

      emailInput.value = emailInput.value.slice(0, -1);
    }
  }
});

nameInput.addEventListener("blur", function () {
  nameError.textContent = "";
  nameInfo.textContent = "";

  nameInput.setCustomValidity("");

  if (!nameInput.checkValidity()) {
    if (nameInput.value.length == 0) {
      nameInput.setCustomValidity("Enter a username");
    } else {
      nameInput.setCustomValidity("Invalid username");
    }
    nameError.textContent = nameInput.validationMessage;
    const currTime = new Date().getTime();
    var time = new Date(currTime);
    form_errors.push([nameInput.validationMessage, time.toString()]);
  }
});

emailInput.addEventListener("blur", function () {
  emailError.textContent = "";
  emailInfo.textContent = "";

  emailInput.setCustomValidity("");

  if (!emailInput.checkValidity()) {
    if (emailInput.value.length == 0) {
      emailInput.setCustomValidity("Enter an email");
    } else {
      emailInput.setCustomValidity("Invalid email address");
    }
    emailError.textContent = emailInput.validationMessage;
    const currTime = new Date().getTime();
    var time = new Date(currTime);
    form_errors.push([emailInput.validationMessage, time.toString()]);
  }
});

commentsInput.addEventListener("blur", function () {
  commentsError.textContent = "";

  commentsInput.setCustomValidity("");

  if (!commentsInput.checkValidity()) {
    if (commentsInput.value.length < 10) {
      commentsInput.setCustomValidity("Comment not long enough");
    } else {
      commentsInput.setCustomValidity("Invalid comment");
    }
    commentsError.textContent = commentsInput.validationMessage;
    const currTime = new Date().getTime();
    var time = new Date(currTime);
    form_errors.push([commentsInput.validationMessage, time.toString()]);
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  const body = document.body;
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Function to toggle theme
  const toggleTheme = () => {
    body.classList.toggle("dark-theme");
    const theme = body.classList.contains("dark-theme") ? "dark-theme" : "";
    localStorage.setItem("theme", theme);
    themeToggleBtn.textContent = theme === "dark-theme" ? "🌜" : "🌞";
  };

  // Initialize theme on load
  const savedTheme = localStorage.getItem("theme");
  console.log(savedTheme);
  if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggleBtn.textContent =  "🌜";
  }

  // Event listener for the button
  themeToggleBtn.addEventListener("click", toggleTheme);
});
