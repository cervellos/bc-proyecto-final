var elemSectionCarrito = document.getElementsByClassName("section-carrito")[0]; //TODO
class main {
  //AJAX
  async ajax(url, metodo = "get") {
    try {
      const respuesta = await fetch(url, { method: metodo });
      const resultado = await respuesta.text();
      return resultado;
    } catch (err) {
      console.error(err);
    }
  }

  getNombreArchivo(id) {
    return "views/" + id + ".html";
  }

  marcarLink(id) {
    const links = document.querySelectorAll("header nav a");
    links.forEach((link) => {
      if (link.id === id) link.classList.add("active");
      else link.classList.remove("active");
    });
  }

  initJS(id) {
    if( id === 'alta' ) {
        initAlta()
    }
    else if( id === 'inicio' ) {
        initInicio()
    }
    else if( id === 'nosotros' ) {
        initNosotros()
    }
    else if( id === 'contacto' ) {
        initContacto()
    }
}
}
