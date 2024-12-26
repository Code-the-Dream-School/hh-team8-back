const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userModel = {
    getAllUsers: async () => {
        try {
            const users = await prisma.users.findMany({
                select: {
                    user_id: true,
                    username: true,
                    email: true,
                },
            });
            return users;
        } catch (error) {
            throw new Error(`Failed to retrieve users: ${error.message}`);
        }
    },

    getUserInfoById: async (id) => {
        try {
            const userInfo = await prisma.$queryRaw`
                SELECT 
                    u.user_id, 
                    u.username, 
                    u.email, 
                    ur.role_id, 
                    r.role_name
                FROM 
                    users u
                INNER JOIN 
                    user_role ur ON u.user_id = ur.user_id
                INNER JOIN 
                    roles r ON ur.role_id = r.role_id
                WHERE 
                    u.user_id = ${id}`;
    
            if (!userInfo.length) {
                throw new Error(`User with ID ${id} not found`);
            }
            return userInfo[0]; 
        } catch (error) {
            console.error("Error while fetching user by ID:", error);
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
    },

    addUser: async (userData) => {
        try {
            const newUser = await prisma.users.create({
                data: userData,
            });
            const userRole = await prisma.user_role.create({
                data: {
                    user_id: newUser.user_id, 
                    role_id: 2,              
                },
            });
            return { newUser, userRole };
        } catch (error) {
            console.error("Error while adding new user:", error);
            throw new Error(`Failed to add user: ${error.message}`);
        }
    },    

    getUserByUsername: async (username) => {
        try {
            const user = await prisma.users.findUnique({
                where: { username },
            });
            if (!user) {
                throw new Error(`User with username ${username} not found.`);
            }
            return user;
        } catch (error) {
            console.error("Error while fetching user by username:", error);
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
    },  

    updateUserRole: async (userId, newRoleId) => {
        try {
            const existingUserRole = await prisma.user_role.findFirst({
                where: { user_id: userId },
            });
    
            if (!existingUserRole) {
                throw new Error(`User with ID ${userId} does not have an assigned role.`);
            }
            const updatedUserRole = await prisma.user_role.update({
                where: {
                    user_id_role_id: { user_id: userId, role_id: existingUserRole.role_id },
                },
                data: { role_id: newRoleId },
            });
            return updatedUserRole;
        } catch (error) {
            console.error("Error while updating user role:", error);
            throw new Error(`Failed to update user role: ${error.message}`);
        }
    },

    deleteUser: async (userId) => {
        try {
            await prisma.user_role.deleteMany({
                where: { user_id: userId },
            });
            const deletedUser = await prisma.users.delete({
                where: { user_id: userId },
            });
            return deletedUser;
        } catch (error) {
            console.error("Error while deleting user:", error);
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    },

};

module.exports = userModel;