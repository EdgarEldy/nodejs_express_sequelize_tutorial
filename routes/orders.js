var express = require("express");
var router = express.Router();
const db = require("../models");

const Customer = db.Customer;
const Product = db.Product;
const Category = db.Category;

// Initialize Order Model
const Order = db.Order;

//Get orders/index page with customers and products data
router.get("/orders", async function (req, res, next) {
    const orders = await Order.findAll({
        include: [
            {
                model: Customer,
                required: true
            },
            {
                model: Product,
                required: true
            }]
    });
    res.render("orders/index", {
        orders: orders,
    });
});

// Get orders/add view with customers and categories
router.get("/orders/add", async function (req, res, next) {

    // Get categories
    const customers = await Customer.findAll();

    // Get categories
    const categories = await Category.findAll();

    res.render("orders/add", {
        customers: customers,
        categories: categories
    });
});

// Get products related to a category
router.get('/orders/getProducts/:cat_id', async (req, res, next) => {
    const cat_id = req.params.cat_id;
    const products = await Product.findAll({
        include: [{
            model: Category,
            required: true
        }],
        where: {
            category_id: cat_id
        }
    });
    res.send(products);
});

module.exports = router;