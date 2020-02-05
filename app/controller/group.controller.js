const express = require('express');

const groupModel = require('../models/group.model');
const userGroupModel = require('../models/userGroup.model');
const groupService = require('../services/group.service');
const router = express.Router();

const GroupService = new groupService(groupModel, userGroupModel);

router.route('/api/group/:id')
    .get((req, res) => {
        GroupService.getGroup(req.params.id)
            .then((group) => res.json(group))
            .catch((err) => res.json(err));
    })
    .put((req, res) => {
        GroupService.updateGroup(req.body, req.params.id)
            .then((group) => res.json(group))
            .catch((err) => res.json(err));
    })
    .delete((req, res) => {
        GroupService.deleteGroup(req.params.id)
            .then((group) => res.json(group))
            .catch((err) => res.json(err));
    });

router.route('/api/groups')
    .get((req, res) => {
        GroupService.getGroups()
            .then((groups) => res.json(groups))
            .catch((err) => res.json(err));
    })
    .post((req, res) => {
        const group = req.body;

        GroupService.createGroup(group)
            .then((groups) => res.json(groups))
            .catch((err) => res.json(err));
    });

router.route('/api/userGroup/:id')
    .post((req, res) => {
        GroupService.addUsersToGroup(req.params.id, req.body)
            .then((groups) => res.json(groups))
            .catch((err) => res.json(err));
    });

module.exports = router;
