let email = document.querySelector("#email");
let user = document.querySelector("#name");
let textArea = document.querySelector("#textArea");

let message = {
  error: [],
  success: [],
};

export function validationForm() {
  console.log("desde formulario");
  message = {
    error: [],
    success: [],
  };
  validateFields();
}

const validateFields = () => {
  console.log("validando...");
  validatingUser();
  validatingEmail();
  validatingTextArea();

  if (!message.error.length) {
    successMessage();
  }

  // si el arreglo de los mensajes de error esta vacio indica que se pasaron todas las validaciones
};

const successMessage = () => {
  const sibling = document.querySelector("form .submitForm");

  const successDiv = document.createElement("DIV");
  successDiv.classList.add("success__message");

  const message = document.createElement("P");
  message.classList.add("message");
  message.textContent = "Su mensaje fue sido enviando exitosamente";

  successDiv.appendChild(message);
  sibling.parentNode.insertBefore(successDiv, sibling);

  setTimeout(() => {
    if (successDiv) {
      successDiv.remove();
    }
  }, 3000);

  resetValues();
};

const resetValues = () => {
  email.value = "";
  user.value = "";
  textArea.value = "";
};

const validatingUser = () => {
  let currentUser = user.value.trim().toLowerCase();
  if (currentUser === "") {
    message.error.push("nombre de usuario no valido, intente nuevamente");

    const errorField = document.querySelector("#errorName");
    showError(errorField);

    setTimeout(() => {
      clearFieldError(user);
    }, 4000);
  } else {
    const messageArray = "nombre de usuario no valido, intente nuevamente";

    success(messageArray, "Usuario validado correctamente");
  }
};

const validatingEmail = () => {
  let currenEmail = sanitizar(email.value);
  if (!currenEmail) {
    message.error.push("Correo electronico no valido, intente nuevamente");
    email.value = "";

    const errorField = document.querySelector("#errorEmail");
    showError(errorField);

    setTimeout(() => {
      clearFieldError(email);
    }, 4000);
  } else {
    const messageArray = "Correo electronico no valido, intente nuevamente";
    success(messageArray, "Correo Electronico validado correctamente");
  }
};

const validatingTextArea = () => {
  const messageText = textArea.value;
  const minLength = 10;
  const maxLength = 50;

  const errorField = document.querySelector("#errorTextArea");

  if (messageText.length < minLength) {
    message.error.push(`Su mensaje debe ser mayor a ${minLength} caracteres`);
    showError(errorField);

    setTimeout(() => {
      clearFieldError(textArea);
    }, 4000);
  } else if (messageText.length > maxLength) {
    message.error.push(`Su mensaje debe ser menor a ${maxLength} caracteres`);
    showError(errorField);

    setTimeout(() => {
      clearFieldError(textArea);
    }, 3000);
  } else {
    const messageArray_min = `Su mensaje debe ser mayor a ${minLength} caracteres`;
    const messageArray_max = `Su mensaje debe ser menor a ${maxLength} caracteres`;

    let messageArray = [messageArray_min, messageArray_max];

    success(messageArray, "mensaje validado correctamente");
  }
};

const success = (messageIndex, successMessage) => {
  if (message.error.length > 1) {
    if (Array.isArray(messageIndex)) {
      messageIndex.forEach((CurrentMessage) => {
        const index = message.error.indexOf(CurrentMessage);
        if (index !== -1) {
          message.error.splice(index, 1);
        }
      });

      message.success.push(successMessage);
    } else {
      const index = message.error.indexOf(messageIndex);

      if (index !== -1) {
        message.error.splice(index, 1);
      }
      message.success.push(successMessage);
    }
  }

  console.log(message);
};

const sanitizar = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const showError = (errorField) => {
  const errors = message.error;
  errors.forEach((error) => {
    errorField.textContent = error;
  });

  errorField.style.display = "block";
};

const clearFieldError = (field) => {
  const errorMessage = (field.nextElementSibling.style.display = "none");
};

// probando mapa

const Latitud = 34.601651;
const Longitud = 58.383909;

var map = L.map("map").setView([-Latitud, -Longitud], 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([-Latitud, -Longitud])
  .addTo(map)
  .bindPopup(`<p class="ubication">Encuentranos en Buenos aires</p>`)
  .openPopup();
