document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  const userName = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const check = document.getElementById("agree");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
  });

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  };

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.remove("error");
    inputControl.classList.add("success");
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidName = (userName) => {
    const re = /^[а-яА-ЯёЁa-zA-Z]+ [а-яА-ЯёЁa-zA-Z]+ ?[а-яА-ЯёЁa-zA-Z]+$/;
    return re.test(String(userName).toLowerCase());
  };

  const isValidPhone = (phone) => {
    const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    return re.test(String(phone).toLowerCase());
  };

  const validateInputs = () => {
    const nameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const isChecked = check.checked;

    if (email === "") {
      setError(email, "Необходим email");
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Введен неверный email");
    } else {
      setSuccess(email);
    }

    if (userName === "") {
      setError(userName, "Необходимо ФИО");
    } else if (!isValidName(nameValue)) {
      setError(userName, "Введено неверное ФИО");
    } else {
      setSuccess(userName);
    }

    if (phone === "") {
      setError(phone, "Необходим номер телефона");
    } else if (!isValidPhone(phoneValue)) {
      setError(phone, "Введен неверный номер телефона");
    } else {
      setSuccess(phone);
    }

    if (!isChecked) {
      setError(check, "Необходимо согласие");
    } else {
      setSuccess(check);
    }

    if (
      isValidEmail(emailValue) &&
      isValidName(nameValue) &&
      isValidPhone(phoneValue) &&
      isChecked
    ) {
      sendFormDataToServer();
    }
  };
});