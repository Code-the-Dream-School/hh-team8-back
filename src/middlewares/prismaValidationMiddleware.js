const userSchema = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const prismaValidationMiddleware = async (params, next) => {

  if (params.model === 'users' && params.action === 'create') {

    const userInput = params.args.data;
    // Validate input data
    const { error } = userSchema.validate(userInput);
    if (error) {
      throw new Error(`Validation Error: ${error.message}`);
    }
  }

  // Intercept User model actions
  if (params.model === 'users') {

    if (params.action === 'create' || params.action === 'update') {
      const userInput = params.args.data;

      if (userInput && userInput.password_hash) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        userInput.password_hash = await bcrypt.hash(userInput.password_hash, salt);
      }
    }
  }

  return next(params);
};

module.exports = prismaValidationMiddleware;