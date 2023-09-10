export function navigationsSections() {
  const navigationItems = document.querySelectorAll(".itemsNav");

  navigationItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const targetId = item.getAttribute("data-target");
      const targetSection = document.querySelector(`#${targetId}`); // Usar las comillas invertidas (`) para interpolar el ID

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        this.navMobile.classList.toggle("hidde");
        this.overlay.classList.toggle("hidde");
      }
    });
  });
}
