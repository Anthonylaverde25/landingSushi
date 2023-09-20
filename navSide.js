export function navSide() {
  const url = `image/iconos`;
  const sections = document.querySelectorAll(".section_");
  const modalNav = document.querySelector(".model__navSide");
  const itemsContainer = document.querySelector(".navSide__items");
  const main = document.querySelector("main");
  const options = {
    root: null, // ESTABLECE QUE EL AREA DE OBSERVACION ES LA VENTANA GRAFICA
    rootMargin: "0px", // NO SE APLICAN MARGENES
    threshold: 0.2, // EL 10% DE LA IMAGEN DEBE SER VISIBLE PARA CARGARLA
  };

  const handlerObserver = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        modalNav.style.display = "block";
      } else {
        modalNav.style.display = "none";
      }
    });
  };

  function updateNav() {
    if (innerWidth >= 1122) {
      const allSections = Array.from(sections).map((section) => {
        const nameSection = section.getAttribute("id");
        const dataTarget = section.getAttribute("id");

        return `
        <li class="navSide__item itemsNav" data-target="${dataTarget}">
        <span class="span__item">${nameSection}</span>
        <img
          class="img__navSide itemsNav"
          src="image/iconos/${dataTarget}.svg"
          alt=""
        />
        </li>       
        `;
      });

      itemsContainer.innerHTML = allSections.join("");

      const observer = new IntersectionObserver(handlerObserver, options);
      observer.observe(main);

      const i = document.querySelectorAll(".itemsNav");
      i.forEach((item) => {
        item.addEventListener("click", (e) => {
          console.log(e.target);
        });
      });
    } else {
      itemsContainer.innerHTML = " ";
    }
  }

  updateNav();
  window.addEventListener("resize", updateNav);
}
