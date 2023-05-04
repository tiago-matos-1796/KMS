const express = require('express');
const router = express.Router();

module.exports = app => {
    const keysController = require('../controllers/keys.controller');
    router.get('/user/public/:id', keysController.getUserPublicKey);
    router.get('/user/private/:id', keysController.getUserPrivateKey);
    router.post('/user', keysController.createUserKeys);
    router.patch('/user/:id', keysController.updateUserKeys);
    router.delete('/user/:id', keysController.deleteUserKeys);
    router.get('/election/public/:id', keysController.getElectionPublicKey);
    router.get('/election/private/:id', keysController.getElectionPrivateKey);
    router.post('/election', keysController.createElectionKeys);
    router.patch('/election/:id', keysController.updateElectionKeys);
    router.delete('/election/:id', keysController.deleteElectionKeys);
    app.use('/keys', router);
}