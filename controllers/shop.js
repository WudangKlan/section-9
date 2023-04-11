const Product = require("../models/product");

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

exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/cart", {
      prods: products,
      pageTitle: "Cart",
      path: "/cart",
    });
  });
};

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
