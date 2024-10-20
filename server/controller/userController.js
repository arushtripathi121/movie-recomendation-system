const User = require("../models/user");

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Email and password are required.'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                errorMessage: 'User not found.'
            });
        }

        const userData = {
            email: user.email,
        };

        return res.status(200).json({
            success: true,
            message: 'User logged in.',
            data: userData
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            errorMessage: 'Internal server error.'
        });
    }
};

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Email and password are required.'
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                success: false,
                message: 'User already exists.'
            });
        }

        user = await User.create({ email, password });

        const userData = {
            email: user.email,
        };

        return res.status(201).json({
            success: true,
            message: 'User signed up successfully.',
            data: userData
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            errorMessage: 'Internal server error.'
        });
    }
};
