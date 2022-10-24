class FormularioAlta {
  //Declaraciones de Variables y funciones globales
  inputs = null;
  form = null;
  button = null;
  camposValidos = null;

  regExpValidar = [
    /^.+$/, // regexp nombre
    /^.+$/, // regexp precio
    /^[0-9]+$/, // regexp stock
    /^.+$/, // regexp marca
    /^.+$/, // regexp categoria
    /^.+$/, // regexp detalles
    /^.+$/, // regexp foto
  ];

  constructor() {
    /**TODO: recibe 2 parametros */
    inputs.forEach((input, index) => {
      inputs = document.querySelectorAll("main form input");
      form = document.querySelector("main form");
      button = document.querySelector("main form button");
      camposValidos = [false, false, false, false, false, false, false];
      button.disabled = true;

      if (input.type != "checkbox") {
        input.addEventListener("input", () => {
          validar(input.value, regExpValidar[index], index);
        });
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      //guardarProducto()
    });

    obtenerProductos();
  }
}
