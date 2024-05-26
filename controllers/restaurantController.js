const restaurantModel = require('../models/restaurantModel')

//CREATE RESTAURANT
const createRestaurantController = async (req, res) => {
    try {
        const {title, imageUrl, foods, time, pickUp, delivery, isOpen, logoUrl, rating, ratingCount, code, coords} = req.body
        
        //validation
        if(!title || !coords) {
            return res.status(500).send({
                success: false,
                message: 'Please provide title and address'
            })
        }

        //create
        const newRestaurant = new restaurantModel({title, imageUrl, foods, time, pickUp, delivery, isOpen, logoUrl, rating, ratingCount, code, coords})

        await newRestaurant.save()

        res.status(201).send({
            success: true,
            message: 'New restaurant created successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Create Restaurant API',
            error
        })
    }
}

//GET RESTAURANTS
const getRestaurantsController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({});
        if(!restaurants) {
            return res.status(404).send({
                success: false,
                message: 'No restaurants available'
            })
        }

        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success: false,
            message: 'Error in Get Restaurants API',
            error
        })
    }
}

//GET RESTAURANTS BY ID
const getRestaurantsByIdController = async (req,res) => {
    try {
        const restaurantId = req.params.id
        if(!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'Please provide Restaurant Id'
            })
        }

        //find
        const restaurant = await restaurantModel.findById(restaurantId)
        if(!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'No restaurant found'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Restaurant found',
            restaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get Restaurants By Id API',
            error
        })
    }
}

//DELETE RESTAURANT 
const deleteResaturantController = async (req,res) => {
    try{
        const restaurantId = req.params.id
        if(!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'Please provide Restaurant Id'
            })
        }

        //find and delete
        await restaurantModel.findByIdAndDelete(restaurantId)
        return res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully'
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Delete Restaurant API',
            error
        })
    }
}

module.exports = { createRestaurantController, getRestaurantsController, getRestaurantsByIdController, deleteResaturantController }