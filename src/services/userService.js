const prisma = require('../prisma/prismaClient');

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

module.exports = {
  createUser,
};