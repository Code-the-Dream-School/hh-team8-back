const express = require('express');
const { loginUser } = require('../services/authService');
const { forgotPassword, resetPassword } = require('../controllers/authController');


const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password_hash } = req.body;

  try {
    if (!username || !password_hash) {
      return res.status(400).json({ 
                    success: false,
                    message: "Email and password are required."});
    }

    const { userLogin, token } = await loginUser(username, password_hash);

    res.status(200).json({ userLogin, token });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ 
        success: false,
        message: error.message});
  }
});

router.post('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    try {
      // Delete the session from the database  
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  });

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;