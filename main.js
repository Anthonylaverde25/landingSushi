const grande = document.querySelector(".slider__card");
const punto = document.querySelectorAll(".point");

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////// FUNCIONAMIENTO DE CARRUSEL

punto.forEach((cadaPunto, i) => {
  cadaPunto.addEventListener("click", (e) => {
    let posicion = i;
    let operacion = posicion * -20;

    grande.style.transform = `translateX(${operacion}%)`;

    punto.forEach((cadaPunto, i) => {
      cadaPunto.classList.remove("activo");
    });
    punto[i].classList.add("activo");
  });
});

console.log(window.innerWidth);
