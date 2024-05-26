const categoryModel = require('../models/categoryModel')

//CREATE CATEGORY
const createCategoryController = async (req,res) => {
    try{
        const {title, imageUrl} = req.body
        if(!title || !imageUrl) {
            return res.status(500).send({
                success: false,
                message: 'Please provide category title and image'
            })
        }

        const newCategory = new categoryModel({title, imageUrl})
        await newCategory.save()
        res.status(201).send({
            success: true,
            message: 'New Category created',
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Create Category API',
            error
        })
    }
}

//GET ALL CATEGORIES
const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if(!categories) {
            return res.status(404).send({
                success: false,
                message: 'No categories found'
            })
        }

        res.status(200).send({
            success: true,
            totalCategories: categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error in Get All Categories API',
            error
        })
    }
}

//UPDATE CATEGORY
const updateCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const {title, imageUrl} = req.body
        const updateCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true})

        if(!updateCategory) {
            return res.status(500).send({
                success: false,
                message: 'No such category found'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Category updated successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).sed({
            success: false,
            message: 'Error in Update Category API',
            error
        })
    }
}

//DELETE CATEGORY
const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(500).send({
                success: false,
                message: 'Please provide Category ID'
            })
        }
        const category = await categoryModel.findById(id)
        if(!category) {
            return res.status(500).send({
                success: false,
                message: 'No such category found'
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Delete Category API',
            error
        })
    }
}

module.exports = { createCategoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController }