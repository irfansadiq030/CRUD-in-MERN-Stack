const userModel = require('../models/userModel')

exports.saveUser = async (req, resp, next) => {
    try {

        const { name, email, img } = req.body;

        const user = await userModel.create({
            name, email, img
        })

        if (!user) {
            return resp.status(424).json({
                success: false,
                message: 'User not saved'
            })
        }

        return resp.status(201).json({
            success: true,
            message: 'User Saved Successfully'
        })

    } catch (error) {

        if (error.code === 11000) {
            return resp.status(400).json({
                success: false,
                message: "Email Already Exists"
            })
        }

        return resp.status(400).json({
            success: false,
            message: error.message
        })

    }

}

// Get All Users

exports.getUsers = async (req, resp, next) => {
    try {

        const user = await userModel.find();

        if (!user) {
            return resp.status(404).json({
                success: false,
                message: "Users not Found"
            })
        }

        return resp.status(200).json({
            success: false,
            user
        })

    } catch (error) {
        return resp.status(400).json({
            success: false,
            message: error.message
        })
    }

}

// Update User By ID
exports.getSingleUser = async (req, resp, next) => {

    const user = await userModel.findById(req.params.id);

    if (!user) {
        return resp.status(404).json({
            success: false,
            message: "Users not Found"
        })
    }

    return resp.status(200).json({
        success: true,
        user
    })
}

// Delete User

exports.deleteUser = async (req, resp, next) => {

    const user = await userModel.findById(req.params.id);
    if (!user) {
        return resp.status(404).json({
            success: false,
            message: "Users not Found"
        })
    }

    const result = await userModel.deleteOne({_id:req.params.id})
    resp.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })

}