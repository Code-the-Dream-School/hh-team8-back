const express = require('express');
const { loginUser } = require('../services/authService');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password_hash } = req.body;

  try {
    if (!username || !password_hash) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { userLogin, token } = await loginUser(username, password_hash);

    res.status(200).json({ userLogin, token });
  } catch (error) {
    next(error); // Pass error to error handler
  }
});

module.exports = router;