const groupController = require('./group.controller')();
const { mockRequest, mockResponse } = require('../mocks/req-res.mock');
const groupModel = require('../models/group.model');
const groupService = require('../services/group.service');

jest.mock('../services/group.service', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getGroup: async () => ({ id: 1, name: 'testGroup', permissions: ['test'] }),
            updateGroup: async () => ({ id: 1, name: 'testGroup', permissions: ['test'] }),
            deleteGroup: async () => ([{ id: 1, name: 'testGroup', permissions: ['test'] }]),
            createGroup: async () => ({ id: 1, name: 'testGroup', permissions: ['test'] }),
            getGroups: async () => ([{ id: 1, name: 'testGroup', permissions: ['test'] }])
        };
    });
});

describe('groupController', () => {
    const GroupService = new groupService(groupModel);

    test('should return group from groupService.getGroup', async () => {
        const req = mockRequest();
        req.body.id = 1;
        const res = mockResponse();

        await groupController.getGroup(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'testGroup', permissions: ['test'] });
    });

    test('should return groups list from groupService.deleteGroup', async () => {
        const req = mockRequest();
        req.body.id = 1;
        const res = mockResponse();

        await groupController.deleteGroup(req, res);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'testGroup', permissions: ['test'] }]);
    });

    test('should return groups list from groupService.getGroups', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await groupController.getGroups(req, res);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'testGroup', permissions: ['test'] }]);
    });
});

