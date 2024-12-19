const userModel = require('../models/userModel');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.getAllUsers();
            res.status(200).json({ success: true, data: users });
            console.log('Fetching all users...');
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = parseInt(req.params.id, 10); // Ensure the ID is a number
            const user = await userModel.getUserById(userId);
            res.status(200).json({ success: true, data: user });
            console.log(`Fetching user with ID: ${userId}`);
        } catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    },
    addUser: async (req, res) => {
        try {
            const { username, email, password_hash } = req.body;
            if (!username || !email || !password_hash) {
                return res.status(400).json({
                    success: false,
                    message: "Username, email, and password_hash are required.",
                });
            }
            const newUser = await userModel.addUser({ username, email, password_hash });
            res.status(201).json({ success: true, data: newUser });
            console.log('New user added:', newUser);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};

module.exports = userController;