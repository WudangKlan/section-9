const Product = require("../models/product");
const Cart = require("../models/cart");
const path = require("path");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "product list",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getCartJson = (req, res, next) => {
  res.sendFile(
    path.join(path.dirname(require.main.filename), "data", "cart.json")
  );
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cartData) => {
    Product.fetchAll((products) => {
      const cart = [];
      for (let product of products) {
        const data = cartData.product.find((prod) => prod.id === product.id);
        if (data) {
          cart.push({ cartProducts: product, qty: data.qty });
        }
      }
      // res.send({ message: cart });
      // res.end();

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Cart Items",
        products: cart,
      });
    });
  });
  //   Product.fetchAll((products) => {
  //     for (product of products) {
  //       product.find(product =>)
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Cart Items",
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/");
};

exports.delCartItem = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    const productPrice = product.price
    Cart.delCartProduct(prodId,productPrice);
    res.redirect('/cart')
  });
}

exports.getOrders = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/orders", {
      prods: products,
      pageTitle: "Your Orders",
      path: "/orders",
    });
  });
};

exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/checkout", {
      prods: products,
      pageTitle: "Checkout",
      path: "/checkout",
    });
  });
};
