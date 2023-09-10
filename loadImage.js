const allImage = document.querySelectorAll(".loadImage");

const options = {
  root: null, // ESTABLECE QUE EL AREA DE OBSERVACION ES LA VENTANA GRAFICA
  rootMargin: "0px", // NO SE APLICAN MARGENES
  threshold: 0.1, // EL 10% DE LA IMAGEN DEBE SER VISIBLE PARA CARGARLA
};

export function imageObserver() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        const src = lazyImage.getAttribute("data-src");
        if (src) {
          lazyImage.src = src;
          lazyImage.removeAttribute("data-src");
          observer.unobserve(lazyImage);
          lazyImage.classList.add("fade-in");
        }
      }
    });
  }, options);

  allImage.forEach((image) => {
    imageObserver.observe(image);
  });
}
