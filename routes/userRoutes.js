const express = require('express')
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
 
const router = express.Router()

//routes
//GET USER || GET
router.get('/getUSer', authMiddleware, getUserController) 

//UPDATE PROFILE
router.put('/updateUser', authMiddleware, updateUserController) 

//UPDATE PASSWORD
router.post('/updatePassword', authMiddleware, updatePasswordController) 

//RESET PASSWORD
router.post('/resetPassword', authMiddleware, resetPasswordController)

//DELETE USER
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)

module.exports = router