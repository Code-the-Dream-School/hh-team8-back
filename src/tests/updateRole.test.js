const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

jest.mock('../models/userModel');

describe('updateUserRole', () => {
    it('should update user role and return status 200', async () => {
        const req = { body: { user_id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockUpdatedRole = { user_id: 1, role_id: 3 };
        userModel.updateUserRole.mockResolvedValue(mockUpdatedRole);

        await userController.updateUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User role updated successfully.',
            data: mockUpdatedRole,
        });
    });

    it('should return 400 if user_id is missing', async () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await userController.updateUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'user_id is a required parameter.',
        });
    });

    it('should return 400 if user_id is invalid', async () => {
        const req = { body: { user_id: 'invalid' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await userController.updateUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'user_id must be a valid integer.',
        });
    });

    it('should handle errors and return status 500', async () => {
        const req = { body: { user_id: '1' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userModel.updateUserRole.mockRejectedValue(new Error('Database error'));

        await userController.updateUserRole(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Database error',
        });
    });
});
