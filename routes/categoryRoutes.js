const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createCategoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryControllers')

const router = express.Router()

//routes
//CREATE CATEGORY || POST
router.post('/createCategory', authMiddleware, createCategoryController)

//GET ALL CATEGORIES || GET
router.get('/getAllCategories', getAllCategoriesController)

//UPDATE CATEGORY || PUT
router.put('/updateCategory/:id', authMiddleware, updateCategoryController)

//DELETE CATEGORY || DELETE
router.delete('/deleteCategory/:id', authMiddleware, deleteCategoryController)

module.exports = router