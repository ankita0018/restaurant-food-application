const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createRestaurantController, getRestaurantsController, getRestaurantsByIdController, deleteResaturantController } = require('../controllers/restaurantController')
 
const router = express.Router()

//routes
//CREATE RESTAURANT || POST
router.post('/create', authMiddleware, createRestaurantController)

//GET RESTAURANTS || GET
router.get('/getRestaurants', getRestaurantsController)

//GET RESTAURANTS BY ID || GET
router.get('/getRestaurantsById/:id', getRestaurantsByIdController)

//DELETE RESTAURANT || DELETE
router.delete('/delete/:id', authMiddleware, deleteResaturantController)

module.exports = router