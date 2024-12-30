const { PrismaClient } = require('@prisma/client');
const prismaValidationMiddleware = require('../middlewares/prismaValidationMiddleware');

const prisma = new PrismaClient();

// Apply the middleware
prisma.$use(prismaValidationMiddleware);

module.exports = prisma;