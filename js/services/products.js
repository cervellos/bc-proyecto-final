class ProductService extends Http {
  URL_PRODUCTS = "https://633ccbeff2b0e623dc67cf47.mockapi.io/productos";

  async getProductService() {
    let product = await http.get(this.URL_PRODUCTS);
    return product;
  }

  async saveProductService() {
    let saveProduct = await http.post(this.URL_PRODUCTS);
    return saveProduct;
  }

  async updateProductService() {
    let updateProduct = await http.put(this.URL_PRODUCTS);
    return updateProduct;
  }

  async deleteProductService() {
    let deleteProduct = await http.del(this.URL_PRODUCTS);
    return deleteProduct;
  }
}
const productosService = new ProductService();
