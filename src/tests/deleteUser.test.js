const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

jest.mock('../models/userModel');

describe('deleteUser', () => {
    it('should delete user and return status 200', async () => {
        const req = { params: { user_id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userModel.deleteUser.mockResolvedValue();

        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User deleted successfully.',
        });
    });

    it('should return 400 if user_id is missing', async () => {
        const req = { params: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'user_id is required.',
        });
    });

    it('should return 400 if user_id is invalid', async () => {
        const req = { params: { user_id: 'invalid' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid user_id. It must be an integer.',
        });
    });

    it('should handle errors and return status 500', async () => {
        const req = { params: { user_id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userModel.deleteUser.mockRejectedValue(new Error('Database error'));

        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Database error',
        });
    });
});