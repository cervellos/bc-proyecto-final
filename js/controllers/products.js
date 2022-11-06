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

    renderList(null, this.products);
  }

  async updateProducto(id) {
    console.log("actualizarProducto", id);

    const product = formList.readProductsend();
    formList.cleanForm();

    const productUpdate = await productService.updateProductoService(
      id,
      product
    );
    // console.log(productUpdate)

    const index = this.products.findIndex(
      (product) => product.id == productUpdate.id
    );
    this.products.splice(index, 1, productUpdate);

    renderList(null, this.products);
  }

  async deleteProduct(id) {
    console.log("borrarProducto", id);

    let productDelete = await productService.deleteProductService(id);

    const index = this.products.findIndex(
      (product) => product.id == productDelete.id
    );
    this.products.splice(index, 1);

    renderList(null, this.products);
  }
}

const productController = new ProductController();
