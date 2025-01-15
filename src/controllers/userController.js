const { createUser } = require('../services/userService');
const userModel = require('../models/userModel');
const {getLoggedInUserId, checkUserRoleAdmin}  = require('../services/userService');
const { exist } = require('joi');

const userController = {

    createUserController: async (req, res) => {
        try {
          const user = await createUser(req.body);
          res.status(201).json(user);
        } catch (error) {
          console.log(error)
          res.status(400).json({ error: error.message });
        }
      }, 

    getAllUsers: async (req, res) => {

        const checkIfAdmin = await checkUserRoleAdmin(req); // checking for user role if admin will return true. 
   
        if(checkIfAdmin) { // if the user is with admin will return see the user list
            try {
                const users = await userModel.getAllUsers();
              return  res.status(200).json({ success: true, data: users });
            } catch (error) {
              return  res.status(500).json({ success: false, message: error.message });
            }
        }else {

            return res.status(500).json({ success: false, message: "Only admin can view the user list" });
        }
        
    },

    getUserInfoById: async (req, res) => {
        try {
            const userId = parseInt(req.params.id, 10); 
            const user = await userModel.getUserInfoById(userId);
            res.status(200).json({ success: true, data: user });
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
            await userModel.addUser({ username, email, password_hash });
            res.status(201).json({ success: true,  message: "New user was added successfully.",});
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getUserByCredentials: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Username and password are required.",
                });
            }

            const user = await userModel.getUserByUsername(username);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid username or password.",
                });
            }

            if (user.password_hash !== password) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password.",
                });
            }

            res.status(200).json({
                success: true,
                message: "User authenticated successfully.",
                data: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Authentication failed: ${error.message}`,
            });
        }
    },

    updateUserRole: async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({
                    success: false,
                    message: "user_id is a required parameter.",
                });
            }
    
            const parsedUserId = parseInt(user_id, 10); 

            if (isNaN(parsedUserId)) {
                return res.status(400).json({
                    success: false,
                    message: "user_id must be a valid integer.",
                });
            }

            const updatedRole = await userModel.updateUserRole(parsedUserId, 3);
    
            res.status(200).json({
                success: true,
                message: "User role updated successfully.",
                data: updatedRole,
            });
        } catch (error) {
          return  res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    deleteUser: async (req, res) => {

        const checkIfAdmin = await checkUserRoleAdmin(req); // checking for user role if admin will return true. 
        const checkLoggedInUser = await getLoggedInUserId(req);

        // console.log(checkIfAdmin, checkLoggedInUser)

        try {
            const { user_id } = req.params;
    
            if (!user_id) {
                return res.status(400).json({
                    success: false,
                    message: "user_id is required.",
                });
            }
    
            const userId = parseInt(user_id, 10);
    
            if (isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user_id. It must be an integer.",
                });
            }


            if(checkIfAdmin || checkLoggedInUser == userId) {
                await userModel.deleteUser(userId);
                return res.status(200).json({
                    success: true,
                    message: "User deleted successfully.",
                });

            } else  {
                return res.status(403).json({ success: false, message: "Please contact admin to delete the user. " });
            }
                
        } catch (error) {
           return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};

module.exports = userController;
