const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

// /products/12313
router.get("/products/:productId", shopController.getProduct);

router.get("/cart-json", shopController.getCartJson);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/delete-cart-item",shopController.delCartItem);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
