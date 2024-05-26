const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')

//GET USER INFO
const getUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id: req.body.id})

        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        // hide password
        user.password = undefined

        res.status(200).send({
            success: true,
            message: 'User got successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500). send({
            success: false,
            message: 'Error in Get User API',
            error
        })
    }
}

//UPDATE USER
const updateUserController = async (req,res) => {
    try {
        //find user
        const user = await userModel.findById({_id: req.body.id})
        if(!user) {
            return res.status(404).send({
                success:false,
                message: 'User not found'
            })
        }

        //update
        const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        //save user
        await user.save()
        res.status(200).send({
            success: true,
            message: 'User updated successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Update User API',
            error
        })
    }
}

//UPDATE PASSWORD
const updatePasswordController = async (req,res) => {
    try {
        //find user
        const user = await userModel.findById({_id: req.body.id}) 

        //validation
        if(!user) {
            return res.status(4040).send({
                success: false,
                message: 'User not found'
            })
        }

        // get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: 'Please provide old and new password'
            })
        }

        //check or compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid old password'
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()

        res.status(200).send({
            success: true,
            message: 'Password updated'
        })
    } catch (error) {
        console.log(error) 
        return res.status(500).send({
            success: false,
            message: 'Error in Update Password API',
            error
        })
    }
}

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body
        if(!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
        }

        const user = await userModel.findOne({email, answer})
        if(!user) {
            return res.status(500).send({
                success: false,
                message: 'User not found or invalid answer'
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()

        res.status(200).send({
            success: true,
            message: 'Password reset successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Reset Password API',
            error
        })
    }
}

//DELETE USER
const deleteUserController = async (req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'Your account has been deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Delete Profile API',
            error
        })
    }
}

module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController }
