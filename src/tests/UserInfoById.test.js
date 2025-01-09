const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

jest.mock('../models/userModel');

describe('getUserInfoById', () => {
    it('should return user info with status 200', async () => {
        const req = { params: { id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockUser = { user_id: 1, username: 'test', email: 'test@example.com', role_id: 1, role_name: 'Admin' };
        userModel.getUserInfoById.mockResolvedValue(mockUser);

        await userController.getUserInfoById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser });
    });

    it('should handle user not found and return status 404', async () => {
        const req = { params: { id: '999' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userModel.getUserInfoById.mockRejectedValue(new Error('User not found'));

        await userController.getUserInfoById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
    });
});