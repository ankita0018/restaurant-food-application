const foodModel = require('../models/foodModel')
const orderModel = require('../models/orderModel')

//CREATE FOOD
const createFoodController = async (req, res) => {
  try{
    const {title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating} = req.body
    if(!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all the details'
      })
    }

    const newFood = new foodModel({title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating})

    await newFood.save()
    res.status(201).send({
      success: true,
      message: 'New food item created',
      newFood
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Create Food API'
    })
  }
}

//GET ALL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({})
    if(!foods) {
      return res.status(404).send({
        success: false,
        message: 'No food items'
      })
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods
    })
  } catch (error) {
    console.log(error) 
    res.status(500).send({
      success: false,
      message: 'Error in Get All Food API',
      error
    })
  }
}

const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id 
    if(!foodId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide Id'
      })
    }
    const food = await foodModel.findById(foodId)
    if(!food) {
      return res.status(404).send({
        success: false,
        message: 'No such food exists'
      })
    }
    res.status(200).send({
      success: true,
      food
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Get Single Food API',
      error
    })
  }
}

//GET FOOD BY RESTAURANT
const getFoodByResturantController = async (req, res) => {
  try{
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide Restaurant Id",
      });
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({  
        success: false,
        message: "No food at this restaurant",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food based on restaurant",
      food,
    })
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get SIngle Food API",
      error,
    })
  }
}

//UPDATE FOOD
const updateFoodController = async (req, res) => {
  try{
    const foodId = req.params.id
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food Id",
      });
    }
    const food = await foodModel.findById(foodId)
    if(!food) {
      return res.status(404).send({
        success: false,
        message: "No Food with this Id found",
      })
    }
    const { title, description, price, imageUrl, foodTags, catgeory, code, isAvailabe, restaurant, rating } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate (foodId, { title, description, price, imageUrl, foodTags, catgeory, code, isAvailabe, restaurant, rating }, {new:true})
    res.status(200).send({
      success: true,
      message: 'Food item is updated successfully'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Update Food API",
      error,
    })
  }
}

//DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide Food Id",
      })
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with Id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error nn Delete Food APi",
      error,
    })
  }
}

//PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const {cart} = req.body
    if(!cart) {
      return res.status(500).send({
        success: false,
        message: 'Please add to food cart and choose a payment method'
      })
    }

    //calculate total
    let total = 0
    cart.map( (index) => 
      total+=index.price
    )

    const newOrder = new orderModel({
      foods:cart, 
      payment: total, 
      buyer: req.body.id
    })

    await newOrder.save()
    res.status(201).send({
      success: true,
      message: ' Order placed successfully',
      newOrder
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in Place Order API",
      error,
    })
  } 
}

//CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid order Id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
      order
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Change Order Status API",
      error,
    })
  }
}

module.exports = { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController }