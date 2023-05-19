const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth.middleware');

module.exports = app => {
    const keysController = require('../controllers/keys.controller');
    router.get('/', auth_middleware, keysController.connection);
    router.get('/user/public/:id', auth_middleware,  keysController.getUserPublicKey);
    router.get('/user/private/:id', auth_middleware,  keysController.getUserPrivateKey);
    router.post('/user', auth_middleware,  keysController.createUserKeys);
    router.patch('/user/:id', auth_middleware,  keysController.updateUserKeys);
    router.delete('/user/:id', auth_middleware,  keysController.deleteUserKeys);
    router.get('/election/public/:id', auth_middleware,  keysController.getElectionPublicKey);
    router.get('/election/private/:id', auth_middleware,  keysController.getElectionPrivateKey);
    router.post('/election', auth_middleware,  keysController.createElectionKeys);
    router.patch('/election/:id', auth_middleware,  keysController.updateElectionKeys);
    router.delete('/election/:id', auth_middleware,  keysController.deleteElectionKeys);
    app.use('/keys', router);
}