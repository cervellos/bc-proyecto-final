class ProductController extends ProductModel {
  constructor() {
    super();
    this.saveProduct = this.saveProduct.bind(this);
  }

  async getProducts() {
    this.products = await productService.getProductsService();
    return this.products;
  }

  async saveProduct(product) {
    const productSave = await productService.saveProductService(product);
    //console.log(productSave)

    this.products.push(productSave);

    renderTablaAlta(null, this.products);
  }

  async updateProducto(id) {
    console.log("actualizarProducto", id);

    const product = formList.readProductsend();
    formList.cleanForm();

    const productoActualizado = await productService.actualizarProductoService(
      id,
      product
    );
    // console.log(productoActualizado)

    const index = this.products.findIndex(
      (product) => product.id == productoActualizado.id
    );
    this.products.splice(index, 1, productoActualizado);

    renderTablaAlta(null, this.products);
  }

  async borrarProducto(id) {
    console.log("borrarProducto", id);

    let productoBorrado = await productService.borrarProductoService(id);

    const index = this.products.findIndex(
      (product) => product.id == productoBorrado.id
    );
    this.products.splice(index, 1);

    renderTablaAlta(null, this.products);
  }
}

const productController = new ProductController();
