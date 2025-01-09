const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

jest.mock('../models/userModel');

describe('getUserByCredentials', () => {
    it('should authenticate user and return status 200', async () => {
        const req = { body: { username: 'testuser', password: 'testpassword' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockUser = { user_id: 1, username: 'testuser', email: 'testuser@example.com', password_hash: 'testpassword' };
        userModel.getUserByUsername.mockResolvedValue(mockUser);

        await userController.getUserByCredentials(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'User authenticated successfully.',
            data: {
                user_id: mockUser.user_id,
                username: mockUser.username,
                email: mockUser.email,
            },
        });
    });

    it('should return 400 if username or password is missing', async () => {
        const req = { body: { username: 'testuser' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await userController.getUserByCredentials(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Username and password are required.',
        });
    });

    it('should return 404 if user is not found', async () => {
        const req = { body: { username: 'unknown', password: 'password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        userModel.getUserByUsername.mockResolvedValue(null);

        await userController.getUserByCredentials(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid username or password.',
        });
    });

    it('should return 401 if password is incorrect', async () => {
        const req = { body: { username: 'testuser', password: 'wrongpassword' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockUser = { user_id: 1, username: 'testuser', email: 'testuser@example.com', password_hash: 'testpassword' };
        userModel.getUserByUsername.mockResolvedValue(mockUser);

        await userController.getUserByCredentials(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid username or password.',
        });
    });
});