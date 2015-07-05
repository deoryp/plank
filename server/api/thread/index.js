'use strict';

var express = require('express');
var controller = require('./thread.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get(   '/:topic/',    auth.isAuthenticated(), controller.index);
router.get(   '/:topic/:id', auth.isAuthenticated(), controller.show);
router.post(  '/:topic/',    auth.isAuthenticated(), controller.create);
router.put(   '/:topic/:id', auth.isAuthenticated(), controller.update);
router.patch( '/:topic/:id', auth.isAuthenticated(), controller.update);
router.delete('/:topic/:id', auth.isAuthenticated(), controller.destroy);

router.post(  '/:topic/:id/reply',          auth.isAuthenticated(), controller.createReply);
router.put(   '/:topic/:id/reply/:replyId', auth.isAuthenticated(), controller.updateReply);
router.patch( '/:topic/:id/reply/:replyId', auth.isAuthenticated(), controller.updateReply);
router.delete('/:topic/:id/reply/:replyId', auth.isAuthenticated(), controller.destroyReply);

module.exports = router;