const userController = require('./user.controller')();
const { mockRequest, mockResponse } = require('../mocks/req-res.mock');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');

jest.mock('../services/user.service', () => {
    return jest.fn().mockImplementation(() => {
        return {
            login: async () => ({ token: 'testToken' }),
            getUser: async () => ({ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false }),
            updateUser: async () => ({ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false }),
            deleteUser: async () => ([{ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false }]),
            createUser: async () => ({ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false }),
            getUsers: async () => ([{ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false }])
        };
    });
});

describe('userController', () => {
    const UserService = new userService(userModel);

    test('should return token from UserService.login', async () => {
        const req = mockRequest();
        req.body.login = 'testUser';
        req.body.password = 'testPassword';
        const res = mockResponse();

        await userController.login(req, res);
        expect(res.json).toHaveBeenCalledWith({ token: 'testToken' });
    });

    test('should return user from UserService.getUser', async () => {
        const req = mockRequest();
        req.body.id = 1;
        const res = mockResponse();

        await userController.getUser(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false });
    });

    test('should return users list from UserService.deleteUser', async () => {
        const req = mockRequest();
        req.body.id = 1;
        const res = mockResponse();

        await userController.deleteUser(req, res);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false }]);
    });

    test('should return users list from UserService.getUsers', async () => {
        const req = mockRequest();
        const res = mockResponse();
        jest.spyOn(UserService, 'getUsers');

        await userController.getUsers(req, res);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, login: 'test', password: 'test', age: 18, isDeleted: false }]);
        // expect(UserService.getUsers).toHaveBeenCalled(); // TODO: How to spy if service method has been called?
    });
});

