export function showForm(btn) {
  const btnF = document.querySelector(".btn__contact");
  const input = document.querySelector("#firstInputEmail");
  const containerForm = document.querySelector(".form__container");

  if (input.value.trim() !== "") {
    btnF.removeAttribute("disabled");
  } else {
    btnF.setAttribute("disabled");
  }

  btn.addEventListener("click", (e) => {
    containerForm.classList.toggle("showForm");
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// TODA LA VALIDACION DEL FORMULARIO
let validationMessage = [];
export function validateForm() {
  validationMessage = [];
  let firstEmail = document.querySelector("#firstInputEmail");
  let email = document.querySelector("#email");
  let user = document.querySelector("#name");
  let textArea = document.querySelector("#textArea");

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////  SELECTORES DE ERROR
  const spanErrorFirstEmail = document.querySelector("#errorFirstEmail");
  const spanErrorEmail = document.querySelector("#errorEmail");
  const spanErrorName = document.querySelector("#errorName");
  const spanErrorText = document.querySelector("#errorTextArea");

  const validateFields = (field, validationType, errorField) => {
    const value = field.value.trim();

    switch (validationType) {
      case "email":
        try {
          // VALIDAR EL CAMPO DE CORREO ELECTRONICO
          if (!isValidEmail(value)) {
            throw new Error("Correo electronico no valido");
          } else {
            try {
              errorField.textContent = "";

              if (!ismatchMail(firstEmail, email)) {
                throw new Error("Los correos electronico no coinciden");
              }
            } catch (error) {
              errorField.classList.toggle("showError");
              errorField.textContent = error.message;
              validationMessage.push(error.message);

              email.value = "";
              firstEmail.value = "";
            }
          }
        } catch (error) {
          errorField.classList.toggle("showError");
          errorField.textContent = error.message;
          validationMessage.push(error.message);

          email.value = "";
          firstEmail.value = "";
        }

        break;
      case "name":
        try {
          errorField.textContent = "";
          if (!isValidName(value)) {
            throw new Error("Nombre de usuario no valido");
          }
        } catch (error) {
          errorField.classList.toggle("showError");
          errorField.textContent = error.message;
          validationMessage.push(error.message);

          user.value = "";
        }
        break;
      case "textArea":
        try {
          if (!isValidTextArea(value)) {
            throw new Error("error en el enviar mensaje");
          }
        } catch (error) {
          errorField.classList.toggle("showError");
          errorField.textContent = error.message;
          validationMessage.push(error.message);

          textArea.value = "";
        }
        break;
      default:
        break;
    }
  };

  validateFields(firstEmail, "email", spanErrorFirstEmail);
  validateFields(email, "email", spanErrorEmail);
  validateFields(user, "name", spanErrorName);
  validateFields(textArea, "textArea", spanErrorText);

  if (validationMessage.length === 0) {
    const conteinerExit = document.querySelector(".exito");
    const containerForm = document.querySelector(".form__container");
    conteinerExit.classList.add("show_exito");
    firstEmail.value = "";
    email.value = "";
    user.value = "";
    textArea.value = "";

    setTimeout(() => {
      conteinerExit.classList.remove("show_exito");
      containerForm.classList.remove("showForm");
      location.href = "http://127.0.0.1:5500/index.html";
      location.reload();
    }, 1000);
  } else {
    console.log("Hubo errores en la validación.");
    // Aquí puedes hacer algo para manejar los errores, como mostrarlos al usuario.
    // También puedes detener el envío del formulario si lo estás validando antes de enviarlo.
  }

  console.log(validationMessage);
}

const ismatchMail = (firstEmail, secondsEmail) => {
  if (firstEmail.value !== secondsEmail.value) {
    //throw new Error("Los correos no coinciden");
    return false;
  }
  return true;
};

const isValidEmail = (email) => {
  // FUNCION PARA VALIDAR EMAIL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (name) => {
  const userNamePattern = /^[A-Za-z]+$/;
  const userName = name.toLowerCase().replace(/\s/g, "");
  return userNamePattern.test(userName);
};

const isValidTextArea = (text) => {
  const textMss = text;
  let minLength = 10;
  let maxLength = 500;

  if (textMss.length <= minLength) {
    throw new Error("mensaje muy corto");
  }

  if (textMss.length >= maxLength) {
    throw new Error("mensaje muy largo");
  }
  return textMss;
};
//console.log(arrayError);
