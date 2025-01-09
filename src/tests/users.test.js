const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

jest.mock('../models/userModel');

describe('getAllUsers', () => {
    it('should return all users with status 200', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        
        const mockUsers = [{ user_id: 1, username: 'test', email: 'test@example.com' }];
        userModel.getAllUsers.mockResolvedValue(mockUsers);

        await userController.getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUsers });
    });

    it('should handle errors and return status 500', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userModel.getAllUsers.mockRejectedValue(new Error('Database error'));

        await userController.getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Database error' });
    });
});