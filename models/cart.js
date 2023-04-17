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
      //.toFixed(2) convert number to string
      // need to convert back to number +(+productPrice).toFixed(2)
      cart.totalPrice = +(cart.totalPrice + +productPrice).toFixed(2);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static delCartProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      const cartProduct = updatedCart.product.find((prod) => prod.id === id);
      console.log(cartProduct)
      const productQty = cartProduct.qty;
      updatedCart.product = updatedCart.product.filter(
        (prods) => prods.id !== id
      );
      updatedCart.totalPrice =
      // updatedCart.totalPrice - +(productPrice * productQty).toFixed(2);
      updatedCart.totalPrice - (productPrice * productQty);
      
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);

      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
