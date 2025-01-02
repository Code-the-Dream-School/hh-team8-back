const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prismaClient');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET// you will find the key .env file
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // you will find the key .env file

// Generate JWT Token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// User Login
const loginUser = async (username, password_hash) => {
  // Find user by email
  const user = await prisma.users.findUnique({ where: { username } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken(user);
  const userLogin = {
    id: user.user_id,
    username: user.username, 
    email: user.email,
    role: user.role_id
  };

  return { userLogin, token };
};

module.exports = { loginUser };