const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth.middleware');
const {bruteforce} = require("../middleware/brute-force.middleware");

module.exports = app => {
    const keysController = require('../controllers/keys.controller');
    router.get('/', bruteforce.prevent, auth_middleware, keysController.connection);
    router.get('/user/public/:id', bruteforce.prevent, auth_middleware,  keysController.getUserPublicKey);
    router.get('/user/private/:id', bruteforce.prevent, auth_middleware,  keysController.getUserPrivateKey);
    router.post('/user', bruteforce.prevent, auth_middleware,  keysController.createUserKeys);
    router.patch('/user/:id', bruteforce.prevent, auth_middleware,  keysController.updateUserKeys);
    router.delete('/user/:id', bruteforce.prevent, auth_middleware,  keysController.deleteUserKeys);
    router.get('/election/public/:id', bruteforce.prevent, auth_middleware,  keysController.getElectionPublicKey);
    router.get('/election/private/:id', bruteforce.prevent, auth_middleware,  keysController.getElectionPrivateKey);
    router.post('/election', bruteforce.prevent, auth_middleware,  keysController.createElectionKeys);
    router.patch('/election/:id', bruteforce.prevent, auth_middleware,  keysController.updateElectionKeys);
    router.delete('/election/:id', bruteforce.prevent, auth_middleware,  keysController.deleteElectionKeys);
    app.use('/keys', router);
}