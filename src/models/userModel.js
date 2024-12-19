const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userModel = {
    getAllUsers: async () => {
        try {
            console.log("Fetching users from database...");
            const users = await prisma.users.findMany(); // Corrected model name
            console.log("Users fetched:", users);
            return users;
        } catch (error) {
            console.error("Error while fetching users:", error);
            throw new Error(`Failed to retrieve users: ${error.message}`);
        }
    },
    getUserById: async (id) => {
        try {
            console.log(`Fetching user with ID: ${id}`);
            const user = await prisma.users.findUnique({
                where: { user_id: id },
            });
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            console.log("User fetched:", user);
            return user;
        } catch (error) {
            console.error("Error while fetching user by ID:", error);
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
    },
    addUser: async (userData) => {
        try {
            console.log("Adding new user to the database...");
            const newUser = await prisma.users.create({
                data: userData,
            });
            console.log("New user added:", newUser);
            return newUser;
        } catch (error) {
            console.error("Error while adding new user:", error);
            throw new Error(`Failed to add user: ${error.message}`);
        }
    },
};

module.exports = userModel;