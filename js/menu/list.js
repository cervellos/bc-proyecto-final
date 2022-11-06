class FormList {
  inputs = null;
  form = null;
  button = null;
  inpustValid = [false, false, false, false, false, false, false];
  regExpValid = [
    /^.+$/, // regexp name
    /^.+$/, // regexp price
    /^[0-9]+$/, // regexp stock
    /^.+$/, // regexp mark
    /^.+$/, // regexp category
    /^.+$/, // regexp details
    /^.+$/, // regephotooto
  ];

  constructor(renderList, saveProduct) {
    // Referencias de las funciones
    this.inputs = document.querySelectorAll("main form input");
    this.form = document.querySelector("main form");
    this.button = document.querySelector("main form button");

    this.button.disabled = true;

    this.inputs.forEach((input, index) => {
      if (input.type != "checkbox") {
        input.addEventListener("input", () => {
          this.validity(input.value, this.regExpValidar[index], index);
          if (renderList)
            renderList(!this.someInputsValid(), productController.products);
        });
      }
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const product = this.readSendProduct();
      this.cleanForm();

      if (saveProduct) saveProduct(product);
    });
  }

  // Para comprobar la validez de los campos
  someInputsValid() {
    let validity =
      this.inpustValid[0] &&
      this.inpustValid[1] &&
      this.inpustValid[2] &&
      this.inpustValid[3] &&
      this.inpustValid[4] &&
      this.inpustValid[5] &&
      this.inpustValid[6];

    return !validity;
  }

  // Validar campos
  validity(value, validator, index) {
    //console.log(value, validator, index)

    if (!validator.test(value)) {
      this.setCustomValidityJS("Este campo no es válido", index);
      this.inpustValid[index] = false;
      this.button.disabled = true;
      return null; // break
    }

    this.inpustValid[index] = true;
    this.button.disabled = this.someInputsValid(); // boolea

    this.setCustomValidityJS("", index);
    return value;
  }

  // Mostrar u ocultar el mensaje
  setCustomValidityJS(messaje, index) {
    let divs = document.querySelectorAll("form div");
    divs[index].innerHTML = messaje;
    divs[index].style.display = messaje ? "block" : "none";
  }

  // Producto ingresado en el formulario
  readSendProduct() {
    return {
      name: this.inputs[0].value,
      price: this.inputs[1].value,
      stock: this.inputs[2].value,
      mark: this.inputs[3].value,
      category: this.inputs[4].value,
      details: this.inputs[5].value,
      photo: this.inputs[6].value,
      sending: this.inputs[7].checked,
    };
  }

  // Limpiamos los imputs del formulario
  cleanForm() {
    // borro todos los inputs
    this.inputs.forEach((input) => {
      if (input.type != "checkbox") input.value = "";
      else if (input.type == "checkbox") input.checked = false;
    });

    this.button.disabled = true;
    this.inpustValid = [false, false, false, false, false, false, false];
  }
}

// Rendereabamos la plantilla
const renderList = (valids, products) => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "/templates/list.hbs");
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      let templateHbs = xhr.response;

      let template = Handlebars.compile(templateHbs);

      // console.warn(productos)
      let html = template({ products, valids });
      document.getElementById("list-products").innerHTML = html;
    }
  });

  xhr.send();
};

/* ------------------------------------------------------- */
/* Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------- */
let formList = null;

async function initList() {
  console.warn("initList()");

  formList = new FormList(renderList, productController.saveProduct);

  const products = await productController.getProducts();
  renderList(null, products);
}
