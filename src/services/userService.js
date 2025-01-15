const { number } = require('joi');
const prisma = require('../prisma/prismaClient');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET// you will find the key .env file

const createUser = async (userData) => {
  try {
    const user = await prisma.users.create({
      data: userData,
    });
    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      // Unique constraint error
      throw new Error(`Field ${error.meta.target} must be unique`);
    } else {
      // Log the error and rethrow it
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

const checkUserRoleAdmin = async (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      const user_id = decoded.user_id
      const loggedInUser = await prisma.users.findUnique({
        where: { user_id: Number(user_id) }, // Convert ID to a number if it's an integer field
        include: {
          user_role: {
            include : {
              roles: true
            }
          }
        }
      })
      
      if(loggedInUser.user_role[0].roles.role_id === 4)
      {
        return true;
      }else {
        return false;
      }
  } catch (err) {
      return false;
  }
}

const getLoggedInUserId = async (req) => {

  const token = req.headers.authorization?.split(' ')[1];

  try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      const user_id = decoded.user_id
      // Return the decoded token payload

      return user_id;
  } catch (err) {
      // Handle specific errors
      if (err.name === 'TokenExpiredError') {
          console.error('Token has expired.');
          return { valid: false, message: 'Token expired' };
      } else if (err.name === 'JsonWebTokenError') {
          console.error('Invalid token.');
          return { valid: false, message: 'Invalid token' };
      } else {
          console.error('Token validation failed:', err.message);
          return { valid: false, message: 'Token validation failed' };
      }
  }
 
}

const checkProjectOwner = async (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { project_id } = req.params; 

  try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      const user_id = decoded.user_id
      // Return the decoded token payload

      const project = await prisma.projects.findUnique({
        where: { project_id: Number(project_id) }, // Convert ID to a number if it's an integer field
        include: {
          users: true
        }
      })
      if(project.created_by == user_id) {
        return true;
      }else {
        return false;
      }

  } catch (err) {
      // Handle specific errors
      return false;
     
  }
}

module.exports = {
  createUser,
  getLoggedInUserId,
  checkUserRoleAdmin,
  checkProjectOwner
};