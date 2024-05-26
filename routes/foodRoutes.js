const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodControllers");
const adminMiddleware = require("../middlewares/adminMiddleware");


const router = express.Router();

//routes
//CREATE FOOD
router.post("/createFood", authMiddleware, createFoodController);

//GET ALL FOOD
router.get("/getAllFood", getAllFoodsController);

//GET SINGLE FOOD
router.get("/getSingleFood/:id", getSingleFoodController);

//GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByResturantController);

//UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

//DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController );

//CHANGE ORDER STATUS
router.post("/changeOrderStatus/:id", authMiddleware, adminMiddleware, orderStatusController );

module.exports = router;