const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

jest.mock('../models/userModel');

describe('addUser', () => {
    it('should add a user and return status 201', async () => {
        const req = { body: { username: 'test', email: 'test@example.com', password_hash: 'hash' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userModel.addUser.mockResolvedValue();

        await userController.addUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'New user was added successfully.',
        });
    });

    it('should handle missing fields and return status 400', async () => {
        const req = { body: { email: 'test@example.com' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await userController.addUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Username, email, and password_hash are required.',
        });
    });
});
