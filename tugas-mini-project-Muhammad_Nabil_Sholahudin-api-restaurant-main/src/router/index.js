const express = require("express")
const menuController = require("../controllers/menuController")
const categoryController = require("../controllers/categoryController")
const customersController = require("../controllers/customersController")
const orderController = require("../controllers/orderController")
const router = express.Router()

// TABLE MENU
router.get('/menus',menuController.getAll)
router.get('/menus/:id',menuController.getId)
router.post('/menus/create',menuController.create)
router.delete('/menus/delete',menuController.delete)
router.put('/menus/update',menuController.update)

// TABLE CATEGORY
router.get('/category',categoryController.getAll)
router.get('/category/:id',categoryController.getId)
router.post('/category/create',categoryController.create)
router.delete('/category/delete',categoryController.delete)
router.put('/category/update',categoryController.update)

// TABLE CUSTOMER
router.get('/customers',customersController.getAll)
router.get('/customers/:id',customersController.getId)
router.post('/customers/create',customersController.create)
router.delete('/customers/delete',customersController.delete)
router.put('/customers/update',customersController.update)

// TABLE ORDER
router.get('/orders',orderController.getAll)
router.post('/orders/create',orderController.create)


module.exports = router
