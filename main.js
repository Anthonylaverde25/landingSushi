//import { validateForm } from "./validations.js";
import { validationForm } from "./validations.js";
import { imageObserver } from "./loadImage.js";
import { navigationsSections } from "./navigationSections.js";
//import { navSide } from "./navSide.js";

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
  closeCart = document.querySelector(".closetCart");
  containerCart = document.querySelector(".cart__container");
  containerProducts = document.querySelector(".cart__container-product");

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// SELECTORES PARA EL CAROUSEL
  containerSlider = document.querySelector(".slider__card");

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////// SELECIONAR EL TIPO
  diners = document.querySelectorAll(".number__diners");
  btnNumberOf = document.querySelector(".numberOf__container");

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// SELECTORES PARA FORM
  //showForm = document.querySelector(".submitForm");
  //buttonShow = document.querySelector(".btn__contact");
  //inputForm = document.querySelector("#firstInputEmail");

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////// SELECTORES PARA EL NAV
  navigationsItems = document.querySelectorAll(".items");
  filterValue = document.querySelectorAll(".number__dinersItem");

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////// SELECTORES PARA NAVEGAR POR LAS SECTIONS

  constructor() {
    imageObserver();
    this.setupCarousel();
    this.toggleMenu.addEventListener("click", this.toggle);
    this.buttonCart.addEventListener("click", this.cartToggle);
    this.renderCarousel(this.productStock);
    this.getLocalStore();
    this.diners.forEach((d) => {
      d.addEventListener("click", (e) => {
        let value = e.target.value;
        this.filterDiners(value);
      });
    });
    this.showNumberDiners(this.btnNumberOf);
    //this.handlerForm(this.showForm);
    //this.handlerShowForm(this.buttonShow, this.inputForm);
    this.nav(this.navigationsItems, this.filterValue);
    //navSide();
    navigationsSections();
    this.close();
    this.init();
    this.handlerForm();
  }

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// PRODUCTOS PARA SER RENDERIZADOS EN LAS CARD DEL CARRUSEL
  selectedProducts = []; // ARREGLO PARA LOS PRODUCTOS SELECIONADOS

  init = () => {
    if (this.selectedProducts.length === 0) {
      let contenedor = document.querySelector(".total__price");

      const contenedorEmpty = document.createElement("DIV");
      contenedorEmpty.classList.add("empty");
      const parrafo = document.createElement("P");
      parrafo.classList.add("parrafo__empty");
      parrafo.textContent = "Empty cart";
      contenedorEmpty.appendChild(parrafo);

      const contenedorCart = document.querySelector(".cart__container-product");

      contenedorCart.appendChild(contenedorEmpty);
    } else {
      this.quantity();
    }
  };

  quantity = () => {
    console.log("cantidad");
    let number = document.querySelector("#quantity");
    const totalQuantity = this.selectedProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );

    number.textContent = "";
    number.textContent = totalQuantity;
  };

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////// NAV

  nav = (items, values) => {
    values.forEach((value) => {
      value.addEventListener("mouseenter", (e) => {
        values.forEach((value) => {
          value.classList.remove("activeValue");
        });

        value.classList.add("activeValue");
      });
    });

    items.forEach((item) => {
      item.addEventListener("mouseenter", (e) => {
        items.forEach((item) => {
          item.classList.remove("activeNav");
        });

        item.classList.add("activeNav");
      });
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////// GET LOCAL STORE

  getLocalStore() {
    const storeProducts = JSON.parse(localStorage.getItem("cartProducts"));
    if (storeProducts && Array.isArray(storeProducts)) {
      storeProducts.forEach((productObject) => {
        this.selectedProducts.push(productObject);
        this.renderCart(this.selectedProducts);
      });
    }
  }

  productStock = [
    {
      nombre: "Sashimi de Salmón",
      descripcion:
        "Delicioso sashimi de salmón fresco cortado en finas láminas.",
      tipoPescado: "Salmón",
      image: "image/image/salmon-caviar.png",
      precio: 12.99,
      calorias: 150,
      diners: 2,
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
      diners: 3,

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
      diners: 3,

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
      diners: 4,

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
      diners: 2,
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
            <h4 class="card__diners>
            <span class="numberDiners">${product.diners} Diners for dishes</span>
            </h4>
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
        <div class="cart__product-current" >
          <img
            class="product__image "
            src="${product.image}"
            alt=""
          />
          <h4 class="product__name">${product.name}</h4>
          <img
            class="product__trash "
            data-product-name="${product.name}"
            src="image/iconos/trash.svg"
            alt=""
          />
          <div class = "quantityPlussAndRest">
          <i class="fa-solid fa-minus icon  icon-minus"></i>
          <i class="fa-solid fa-plus  icon   icon-pluss"></i>
          </div>
        </div>
    
        <div class="cart__product-price">
          <p>${product.name} <span class ="actuallyPrice">${
      product.price
    }</span> $ x <span class = "quantity"> ${
      product.quantity
    }</span>  = <span class = "totalPrice"> ${
      product.price * product.quantity
    }</span> 
     
    </p>
        </div>
      </div>
    `;
    return html;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// FUNCIONAMIENTO DE CARRUSEL

  setupCarousel() {
    const containerCarousel = document.querySelector(".carousel__container");
    const pointContainer = document.querySelector(".points"); // Contenedor estático
    const sliderCard = document.querySelector(".slider__card");

    const updateCarousel = () => {
      const screenWidth = window.innerWidth;
      let numPoints = 5;

      if (screenWidth >= 768) {
        numPoints = 4;
      }

      if (screenWidth >= 1122) {
        numPoints = 3;
      }

      // Lógica para actualizar los puntos aquí (similar a tu función updatePoints)
      pointContainer.innerHTML = ""; // Borra los puntos existentes

      for (let i = 0; i < numPoints; i++) {
        const li = document.createElement("li");
        li.className = "point";

        if (i === 0) {
          li.classList.add("active");
        }

        pointContainer.appendChild(li);
      }
    };

    // Agrega un listener para el evento resize
    updateCarousel();
    window.addEventListener("resize", updateCarousel);

    pointContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("point")) {
        const points = Array.from(pointContainer.querySelectorAll(".point"));
        const i = points.indexOf(e.target);
        let position = i * -20;
        sliderCard.style.transform = `translateX(${position}%)`;

        // Elimina la clase "active" de todos los puntos
        points.forEach((point) => {
          point.classList.remove("active");
        });

        // Establece la clase "active" en el punto clicado
        e.target.classList.add("active");
      }
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

  close = () => {
    this.overlay.addEventListener("click", (e) => {
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
    });

    this.closeCart.addEventListener("click", (e) => {
      this.containerCart.classList.toggle("hidde");
      this.containerCart.classList.toggle("showCart");
    });
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
        let dinersFor = card.querySelector(".numberDiners");
        let descriptionProduct = card.querySelector(
          "#descriptionProduct"
        ).textContent;
        let priceProduct = Number(
          card.querySelector("#priceProduct").textContent
        );

        //let quantity = 1;

        ////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////// CREANDO EL OBJETO CON LOS PRODUCTOS SELECIONADOS
        /*
        const selectedProduct = {
          name: nameProduct,
          image: imageProduct,
          description: descriptionProduct,
          diners: dinersFor,
          price: priceProduct,
          quantity: quantity,
        };*/

        const existingProduct = this.selectedProducts.find(
          (product) => product.name === nameProduct
        );

        if (existingProduct) {
          existingProduct.quantity++;
          //existingProduct.quantity = existingProduct.quantity + 1;
          //console.log(this.selectedProducts);
          //this.renderCart(this.selectedProducts);
        } else {
          const selectedProduct = {
            name: nameProduct,
            image: imageProduct,
            description: descriptionProduct,
            diners: dinersFor,
            price: priceProduct,
            quantity: 1,
          };

          this.selectedProducts.push(selectedProduct);
          // GUARDANDO EN EL ARREGLO selectedProducts LOS PRODUCTOS SELECIONADO EN EL PASO ANTERIOR selectedProduct (OBJETO)
          //this.selectedProducts.push(selectedProduct);
          //console.log(this.selectedProducts);
          //this.renderCart(this.selectedProducts);
        }

        this.renderCart(this.selectedProducts);

        localStorage.setItem(
          "cartProducts",
          JSON.stringify(this.selectedProducts)
        );
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// RENDER PARA EL CARRITO DE COMPRAS
  renderCart(products) {
    this.containerProducts.innerHTML = " ";
    this.currentTotal = 0;

    products.forEach((product) => {
      const html = this.cartHTML(product);

      this.containerProducts.insertAdjacentHTML("beforeend", html);
    });

    // ELIMINAR PRODUCTO
    let deleteProduct = document.querySelectorAll(".product__trash");
    deleteProduct.forEach((product) => {
      product.addEventListener("click", (e) => {
        const currentProduct = product.dataset.productName;
        this.deleteProduct(currentProduct);
        //console.log(currentProduct);
      });
    });

    if (!this.selectedProducts.length) {
      this.empty();
    }

    const totalPrice = products.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);

    const totalPriceHTML = `
    <div class="total__price">
    <span class ="total__account">Total Price = $ <span>${totalPrice}</span></span>
    <div class = "cart__actions">
    <button id="buy" type="button" class="btn btn-primary btn-lg">Buy</button></button>
    <button id="empty" type="button" class="btn btn-secondary btn-lg">Empty Cart</button>
    </div>
    </div>
    `;

    const totalPriceInsert = this.containerCart.querySelector(".total__price");
    if (totalPriceInsert) {
      totalPriceInsert.remove();
    }

    if (totalPrice > 0) {
      this.containerCart.insertAdjacentHTML("beforeend", totalPriceHTML);
      this.init();
    }

    //data-product-name="${product.name}"

    // AUMENTAR O DISMINUIR PRODUCTOS

    if (document.querySelector(".quantityPlussAndRest")) {
      const increaseButton = document.querySelectorAll(".icon-pluss");
      const decreaseButton = document.querySelectorAll(".icon-minus");

      let currentTotal = +document.querySelector(".total__account span")
        .textContent;

      increaseButton.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const productCurrent = e.target.closest(".cart__product");
          const quantityElement = productCurrent.querySelector(
            ".cart__product-price"
          );

          let price =
            +quantityElement.querySelector(".actuallyPrice").textContent;
          let total = +quantityElement.querySelector(".totalPrice").textContent;
          let cantidad =
            +quantityElement.querySelector(".quantity").textContent;

          cantidad = cantidad + 1;
          total = total + price;

          quantityElement.querySelector(".quantity").textContent =
            Math.round(cantidad);
          quantityElement.querySelector(".totalPrice").textContent =
            Math.round(total);

          currentTotal += price; // Actualizar el total
          updateTotal(productCurrent); // Actualizar el elemento de total
          this.quantity();
        });
      });

      decreaseButton.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const productCurrent = e.target.closest(".cart__product");
          const quantityElement = productCurrent.querySelector(
            ".cart__product-price"
          );

          let price =
            +quantityElement.querySelector(".actuallyPrice").textContent;
          let total = +quantityElement.querySelector(".totalPrice").textContent;
          let cantidad =
            +quantityElement.querySelector(".quantity").textContent;

          if (cantidad > 0) {
            cantidad = cantidad - 1;
            total = total - price;
            quantityElement.querySelector(".quantity").textContent =
              Math.round(cantidad);
            quantityElement.querySelector(".totalPrice").textContent =
              Math.round(total);

            currentTotal -= price; // Actualizar el total
            updateTotalRest(productCurrent); // Actualizar el elemento de total
            this.quantity();
          }
        });
      });

      let updateTotal = (product) => {
        if (document.querySelector(".total__account")) {
          const totalDiv = document.querySelector(".total__account");
          totalDiv.querySelector("span").textContent = Math.round(currentTotal);

          let currentProduct = product.querySelector(
            ".cart__product-current .product__name"
          ).textContent;

          // Actualiza la cantidad de productos en el arreglo this.selectedProducts
          this.selectedProducts.forEach((product) => {
            if (product.name === currentProduct) {
              product.quantity++;
            }
          });
          // Actualiza los datos en el localStorage
          localStorage.setItem(
            "cartProducts",
            JSON.stringify(this.selectedProducts)
          );
        }
      };

      let updateTotalRest = (product) => {
        if (document.querySelector(".total__account")) {
          const totalDiv = document.querySelector(".total__account");

          totalDiv.querySelector("span").textContent = Math.round(currentTotal);
          let containerProduct = product;

          let currentProduct = product.querySelector(
            ".cart__product-current .product__name"
          ).textContent;

          // ENCONTRAR EL INDICE AL DENTRO DEL ARREGLO DE LOS PRODUCTOS SELECCIONADOS DEL PRODUCTO ACTUAL
          // Encuentra el índice del producto en selectedProducts
          const productIndex = this.selectedProducts.findIndex(
            (product) => product.name === currentProduct
          );

          if (productIndex !== -1) {
            if (this.selectedProducts[productIndex].quantity > 0) {
              this.selectedProducts[productIndex].quantity--;

              if (this.selectedProducts[productIndex].quantity === 0) {
                // eliminar el producto del arreglo selectedProducts
                this.selectedProducts.splice(productIndex, 1);

                containerProduct.remove();
                console.log(this.selectedProducts);
                if (
                  document.querySelector(".total__price") &&
                  this.selectedProducts.length === 0
                ) {
                  let contenedor = document.querySelector(".total__price");
                  contenedor.remove();

                  const contenedorEmpty = document.createElement("DIV");
                  contenedorEmpty.classList.add("empty");
                  const parrafo = document.createElement("P");
                  parrafo.classList.add("parrafo__empty");
                  parrafo.textContent = "Empty cart";
                  contenedorEmpty.appendChild(parrafo);

                  const contenedorCart = document.querySelector(
                    ".cart__container-product"
                  );

                  contenedorCart.appendChild(contenedorEmpty);
                }
              }
            }
          }

          // Actualiza los datos en el localStorage
          localStorage.setItem(
            "cartProducts",
            JSON.stringify(this.selectedProducts)
          );

          console.log(productIndex);

          /*

          // Actualiza la cantidad de productos en el arreglo this.selectedProducts
          this.selectedProducts.forEach((product) => {
            if (product.name === currentProduct) {
              if (product.quantity > 0) {
                product.quantity--;

                if (product.quantity === 0) {
                  product.quantity = 0;
                  containerProduct.remove();

                  console.log(containerProduct);
                }
              } else {
                console.log("dsd");
              }
            }
          });
          // Actualiza los datos en el localStorage
          localStorage.setItem(
            "cartProducts",
            JSON.stringify(this.selectedProducts)
          );*/
        }
      };
    }

    if (document.querySelector("#empty")) {
      const emptyButton = document.querySelector("#empty");
      emptyButton.addEventListener("click", (e) => {
        localStorage.removeItem("cartProducts");
        this.selectedProducts = [];

        this.quantity();
        this.renderCart([]);

        if (!this.selectedProducts.length) {
          this.empty();
        }
      });
    }

    if (document.querySelector("#buy")) {
      const buy = document.querySelector("#buy");
      buy.addEventListener("click", this.comprar);
    }
  }

  comprar = () => {};

  empty = () => {
    let contenedor = document.querySelector(".total__price");
    contenedor.remove();

    const contenedorEmpty = document.createElement("DIV");
    contenedorEmpty.classList.add("empty");
    const parrafo = document.createElement("P");
    parrafo.classList.add("parrafo__empty");
    parrafo.textContent = "Empty cart";
    contenedorEmpty.appendChild(parrafo);

    const contenedorCart = document.querySelector(".cart__container-product");

    contenedorCart.appendChild(contenedorEmpty);
  };

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// ELIMINAR PRODUCTOS DEL CARRITO

  deleteProduct(product) {
    const findProductIndex = this.selectedProducts.findIndex(
      (productSelected) => productSelected.name === product
    );

    if (findProductIndex !== -1) {
      let spliceIndex = this.selectedProducts.splice(findProductIndex, 1);
      this.quantity();
      this.renderCart(this.selectedProducts);
      console.log(this.selectedProducts);
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(this.selectedProducts)
      );
    } else {
      console.log("producto no encontrado");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// SELECCIONAR POR NUMERO DE COMENZALES [2,3,4]

  filterDiners(number = null) {
    let matchingProducts = this.productStock.filter(
      (product) => product.diners === number
    );

    let nonMatchingProducts = this.productStock.filter(
      (product) => product.diners !== number
    );

    let filterProducts = matchingProducts.concat(nonMatchingProducts);

    this.renderCarousel(filterProducts);
  }

  showNumberDiners = (btn) => {
    const numberDiners = document.querySelector(".diners");
    btn.addEventListener("click", (e) => {
      numberDiners.classList.toggle("opacity");
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////// FORMULARIO DE VALIDACION

  handlerForm = () => {
    const form = document.querySelector(".form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validationForm();
    });
  };
}

const newApp = new app();
