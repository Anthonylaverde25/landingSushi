class app {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// SELECTORES PARA EL CAROUSEL
  points = document.querySelectorAll(".point");
  sliderCard = document.querySelector(".slider__card");

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// SELECTORES PARA EL MENU TOGGLE
  toggleMenu = document.querySelector(".toggle__menu");
  navMobile = document.querySelector(".navigation__items");
  overlay = document.querySelector(".overlay");
  srcMenu = document.querySelector(".toggle__menu-img");
  isCloset = true;

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// SELECTORES PARA EL CARRITO DE COMPRAS
  buttonCart = document.querySelector(".cart");
  containerCart = document.querySelector(".cart__container");
  containerProducts = document.querySelector(".cart__container-product");

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// SELECTORES PARA EL CAROUSEL
  containerSlider = document.querySelector(".slider__card");

  constructor() {
    this.setupCarousel();
    this.toggleMenu.addEventListener("click", this.toggle);
    this.buttonCart.addEventListener("click", this.cartToggle);
    this.renderCarousel(this.productStock);
  }

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// PRODUCTOS PARA SER RENDERIZADOS EN LAS CARD DEL CARRUSEL
  selectedProducts = []; // ARREGLO PARA LOS PRODUCTOS SELECIONADOS

  productStock = [
    {
      nombre: "Sashimi de Salmón",
      descripcion:
        "Delicioso sashimi de salmón fresco cortado en finas láminas.",
      tipoPescado: "Salmón",
      image: "image/image/salmon-caviar.png",
      precio: 12.99,
      calorias: 150,
      ingredientes: [
        "Salmón fresco",
        "Wasabi",
        "Jengibre encurtido",
        "Salsa de soja",
      ],
    },
    {
      nombre: "Nigiri de Atún",
      descripcion:
        "Nigiri de atún rojo fresco sobre una base de arroz de sushi.",
      tipoPescado: "Atún",
      image: "image/image/tuna-sushi.png",
      precio: 14.99,
      calorias: 120,
      ingredientes: ["Atún rojo", "Arroz de sushi", "Wasabi", "Salsa de soja"],
    },
    {
      nombre: "Maki de Aguacate y Pepino",
      descripcion:
        "Maki de aguacate y pepino envuelto en alga nori y arroz de sushi.",
      tipoPescado: "Ninguno (vegetariano)",
      image: "image/image/preview.png",

      precio: 9.99,
      calorias: 100,
      ingredientes: ["Aguacate", "Pepino", "Alga nori", "Arroz de sushi"],
    },
    {
      nombre: "Temaki de Langostino",
      descripcion:
        "Temaki de langostino crujiente con aguacate y mayonesa picante.",
      tipoPescado: "Langostino",
      image: "image/image/sushi-roll-7558101-6169048.png",
      precio: 13.99,
      calorias: 180,
      ingredientes: [
        "Langostino crujiente",
        "Aguacate",
        "Alga nori",
        "Mayonesa picante",
      ],
    },
    {
      nombre: "Uramaki de Anguila",
      descripcion:
        "Uramaki de anguila glaseada con aguacate y pepino por dentro.",
      tipoPescado: "Anguila",
      image: "image/image/SalmornCheese.png",
      precio: 15.99,
      calorias: 160,
      ingredientes: ["Anguila glaseada", "Aguacate", "Pepino", "Alga nori"],
    },
  ];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////  HTML PARA EL CARRUSEL

  carouselHTML(product) {
    const html = `
      <div class="cardProduct">
        <div class="card">
          <img
            class="card-img-top"
            id="imageProduct"
            src="${product.image}"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title" id="nameProduct">${product.nombre} </h5>
            <p class="card-text" id="descriptionProduct">
              ${product.descripcion}
            </p>
            <h5 class="card__price">
              price = <span id="priceProduct">${product.precio}</span> $
            </h5>
            <a class="btn btn-primary" id="add">add to cart</a>
          </div>
        </div>
      </div>
    `;

    return html;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////  HTML PARA EL CARRITO DE COMPRAS

  cartHTML(product) {
    const html = `
      <div class="cart__product">
        <div class="cart__product-current">
          <img
            class="product__image"
            src="${product.image}"
            alt=""
          />
          <h4 class="product__name">${product.name}</h4>
          <img
            class="product__trash"
            src="image/iconos/trash-solid.svg"
            alt=""
          />
        </div>
    
        <div class="cart__product-price">
          <p>${product.name} ${product.price} $ x ${product.quantity} = ${
      product.price * product.quantity
    } </p>
        </div>
      </div>
    `;
    return html;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// FUNCIONAMIENTO DE CARRUSEL
  setupCarousel() {
    this.points.forEach((p, i) => {
      p.addEventListener("click", (e) => {
        let position = i;
        let operation = position * -20;

        this.sliderCard.style.transform = `translateX(${operation}%)`;
        this.points.forEach((p) => {
          p.classList.remove("active");
        });
        p.classList.add("active");
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// FUNCIONAMIENTO DEl MENU TOGGLE
  toggle = () => {
    if (this.isCloset) {
      this.srcMenu.src = "image/iconos/icons8-x-48.png"; // Cambiar a la imagen de cierre
      this.overlay.classList.toggle("hidde");
      this.overlay.classList.toggle("show");
      this.navMobile.classList.toggle("hidde");
      this.navMobile.classList.toggle("show");

      this.isCloset = false;
    } else {
      this.srcMenu.src = "image/iconos/icons8-menú-48.png"; // Cambiar a la imagen de hamburguesa
      this.overlay.classList.toggle("hidde");
      this.overlay.classList.toggle("show");
      this.navMobile.classList.toggle("hidde");
      this.navMobile.classList.toggle("show");

      this.isCloset = true;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// FUNCIONAMIENTO PARA ABRIR EL CARRITO DE COMPRAS

  cartToggle = () => {
    this.containerCart.classList.toggle("hidde");
    this.containerCart.classList.toggle("showCart");
  };

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// RENDER PARA EL CAROUSEL
  renderCarousel(products) {
    this.containerSlider.innerHTML = "";
    for (let product of products) {
      const html = this.carouselHTML(product);
      this.containerSlider.insertAdjacentHTML("beforeend", html);
      //console.log(product);
    }

    // JUSTO DESPUES DE RENDERIZAR LAS TARJETAS. TODO LOS ELEMENTOS DE ELLA QUE NECESITE
    const btnAdd = document.querySelectorAll("#add");
    btnAdd.forEach((button) => {
      button.addEventListener("click", (e) => {
        let card = button.closest(".card");
        let nameProduct = card.querySelector("#nameProduct").textContent;
        let imageProduct = card.querySelector("#imageProduct").src;
        let descriptionProduct = card.querySelector(
          "#descriptionProduct"
        ).textContent;
        let priceProduct = Number(
          card.querySelector("#priceProduct").textContent
        );
        let quantity = 1;

        ////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////// CREANDO EL OBJETO CON LOS PRODUCTOS SELECIONADOS

        const selectedProduct = {
          name: nameProduct,
          image: imageProduct,
          description: descriptionProduct,
          price: priceProduct,
          quantity: quantity,
        };

        const existingProduct = this.selectedProducts.find(
          (product) => product.name === nameProduct
        );

        if (existingProduct) {
          existingProduct.quantity = existingProduct.quantity + 1;
          //console.log(this.selectedProducts);
          this.renderCart(this.selectedProducts);
        } else {
          // GUARDANDO EN EL ARREGLO selectedProducts LOS PRODUCTOS SELECIONADO EN EL PASO ANTERIOR selectedProduct (OBJETO)
          this.selectedProducts.push(selectedProduct);
          //console.log(this.selectedProducts);
          this.renderCart(this.selectedProducts);
        }
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// RENDER PARA EL CARRITO DE COMPRAS
  renderCart(products) {
    this.containerProducts.innerHTML = " ";
    products.forEach((product) => {
      const html = this.cartHTML(product);
      this.containerProducts.insertAdjacentHTML("beforeend", html);
    });
    console.log(products);
  }
}

const newApp = new app();
