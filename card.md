<div class="dishes__carousel-container">
            <img
              class="arrow arrow_left"
              src="image/iconos/angle-left-solid.svg"
              alt=""
            />

            <div class="carousel">
              <div class="card">
                <img
                  src="imagen.jpg"
                  class="card-img-top"
                  alt="Imagen de ejemplo"
                />
                <div class="card-body">
                  <h5 class="card-title">Título de la Tarjeta</h5>
                  <p class="card-text">
                    Descripción corta de la tarjeta. Puedes añadir más detalles
                    aquí.
                  </p>
                  <a href="#" class="btn">Leer más</a>
                </div>
              </div>

              <div class="card">
                <img
                  src="imagen.jpg"
                  class="card-img-top"
                  alt="Imagen de ejemplo"
                />
                <div class="card-body">
                  <h5 class="card-title">Título de la Tarjeta</h5>
                  <p class="card-text">
                    Descripción corta de la tarjeta. Puedes añadir más detalles
                    aquí.
                  </p>
                  <a href="#" class="btn">Leer más</a>
                </div>
              </div>

              <div class="card">
                <img
                  src="imagen.jpg"
                  class="card-img-top"
                  alt="Imagen de ejemplo"
                />
                <div class="card-body">
                  <h5 class="card-title">Título de la Tarjeta</h5>
                  <p class="card-text">
                    Descripción corta de la tarjeta. Puedes añadir más detalles
                    aquí.
                  </p>
                  <a href="#" class="btn">Leer más</a>
                </div>
              </div>
            </div>

/\*

/_
sections.forEach((secction) => {
if (!secction.classList.contains("activeItem")) {
const navItems = Array.from(sections).map((secction) => {
const p = secction.getAttribute("id");
console.log(p);
});
}
});_/
}

/\*

const navItems = Array.from(sections).map((secction) => {

    if (!secction.classList.contains("activeItem")) {
      const dataTarget = secction.getAttribute("id");
      const secctionTitle = secction.getAttribute("id");

      return `
      <li class="navSide__item itemsNav" data-target="${dataTarget}">
        <span class="span__item">${secctionTitle}</span>
        <img
          class="img__navSide"
          src="${url}/${dataTarget}.svg"
          alt=""
        />
      </li>
      `;
    } else {
      return;
    }*/

//});

//itemsContainer.innerHTML = navItems;

/\*
const navItems = Array.from(sections).map((section) => {
const dataTarget = section.getAttribute("id");
const sectionTitle = section.getAttribute("id");

    return `

    <li class="navSide__item itemsNav" data-target="${dataTarget}">
      <span class="span__item">${sectionTitle}</span>
      <img
        class="img__navSide"
        src="${url}/${dataTarget}.svg"
        alt=""
      />
    </li>

`;
});

itemsContainer.innerHTML = `${navItems}`;
console.log(navItems);\*/
//}

/\*

export function modalNavSide() {
const updateNavSide = () => {
const sections = document.querySelectorAll("section");
const navSide = document.querySelector(".model**navSide");
const itemsNav = document.querySelector(".navSide**items");
let deletedChildren = false;

    // Marcar la sección actual como activa
    sections.forEach((section) => {
      const bounding = section.getBoundingClientRect();
      if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Generar la lista de elementos de navegación dinámicamente
    const navItems = Array.from(sections).map((section) => {
      if (!section.classList.contains("active")) {
        const dataTarget = section.getAttribute("id");
        const sectionContent = section.querySelector(".span__item")?.textContent || "";
        const sectionImageSrc = section.querySelector(".img__navSide")?.getAttribute("src") || "";
        return `
          <li class="navSide__item itemsNav" data-target="${dataTarget}">
            <span class="span__item">${sectionContent}</span>
            <img class="img__navSide" src="${sectionImageSrc}" alt="" />
          </li>
        `;
      }
      return ""; // No incluir la sección actual en el menú
    });

    // Actualizar los elementos de navegación
    itemsNav.innerHTML = navItems.join("");

    const btn = navSide.querySelectorAll(".navSide__item");
    btn.forEach((b) => {
      b.addEventListener("click", (e) => {
        let target = b.getAttribute("data-target");
        const section = document.querySelector(`#${target}`);

        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    const observeNav = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && innerWidth > 1122) {
          navSide.style.display = "block";
        } else {
          navSide.style.display = "none";
        }
      });
    }, options);

    observeNav.observe(main);

    const observeContact = new IntersectionObserver((entries) => {
      const numberChild = itemsNav.children.length;
      entries.forEach((entry) => {
        if (numberChild >= 5 && !deletedChildren) {
          itemsNav.removeChild(itemsNav.lastElementChild);
          itemsNav.removeChild(itemsNav.lastElementChild);
          deletedChildren = true;
        }
      });
    }, options);

    observeContact.observe(contact);

};

if (window.innerWidth >= 1122) {
window.addEventListener("load", updateNavSide);
window.addEventListener("resize", updateNavSide);
}

updateNavSide();

\*/
