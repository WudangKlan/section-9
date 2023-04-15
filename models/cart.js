const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch the previous Cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { product: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => find existing product
      // const existingProduct = cart.product.find((prod) => prod.id === id);
      const existingProductIndex = cart.product.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.product[existingProductIndex];
      let updatedProduct;

      // Add new Product / increase qty
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.product = [...cart.product];
        cart.product[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.product = [...cart.product, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
