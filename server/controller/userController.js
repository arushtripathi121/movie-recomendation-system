const User = require("../models/user");

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                errorMessage: 'Try again'
            })
        }

        const user = await User.find({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                errorMessage: 'User not found'
            })
        }

        const userData = {
            email: user.email,
        }

        return res.status(200).json({
            success: true,
            message: 'User logged in',
            data: userData
        })
    }
    catch (e) {
        return res.status(404).json({
            success: false,
            errorMessage: 'internal server error'
        })
    }
}


const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                errorMessage: 'Try again'
            })
        }

        let user = await User.find({ email });

        let userData;

        if (user) {

            userData = {
                email: user.email
            }

            return res.status(200).json({
                success: true,
                message: 'User logged in',
                data: userData
            })
        }


        user = await User.create({email, password});

        userData = {
            email: user.email,
        }

        return res.status(200).json({
            success: true,
            message: 'User logged in',
            data: userData
        })
    }
    catch (e) {
        return res.status(404).json({
            success: false,
            errorMessage: 'internal server error'
        })
    }
}