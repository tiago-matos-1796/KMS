const db = require('../models');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const {KMSDecrypt, KMSEncrypt} = require("../services/encryption.service")

async function connection(req, res, next) {
    return res.status(200).json(`Connected to KMS, running on port ${process.env.PORT}`);
}
async function getUserPublicKey(req, res, next) {
    const id = req.params.id;
    try {
        const check = await db.signature.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        const key = await db.signature.findById(id);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Sign public key for id:${id} fetched`,
            type: 'SELECT',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).json(KMSEncrypt(JSON.stringify({key: key.public_key})));
    } catch (err) {
        throw err;
    }
}

async function getUserPrivateKey(req, res, next) {
    const id = req.params.id;
    try {
        const check = await db.signature.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        const key = await db.signature.findById(id);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Sign private key for id:${id} fetched`,
            type: 'SELECT',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).json(KMSEncrypt(JSON.stringify({key: key.private_key, iv: key.iv})));
    } catch (err) {
        throw err;
    }
}

async function getElectionPublicKey(req, res, next) {
    const id = req.params.id;
    try {
        const check = await db.election.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        const key = await db.election.findById(id);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Election public key for id:${id} fetched`,
            type: 'SELECT',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).json(KMSEncrypt(JSON.stringify({key: key.public_key})));
    } catch (err) {
        throw err;
    }
}

async function getElectionPrivateKey(req, res, next) {
    const id = req.params.id;
    try {
        const check = await db.election.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        const key = await db.election.findById(id);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Election private key for id:${id} fetched`,
            type: 'SELECT',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).json(KMSEncrypt(JSON.stringify({key: key.private_key, iv: key.iv})));
    } catch (err) {
        throw err;
    }
}

async function createUserKeys(req, res, next) {
    const body = req.body;
    try {
        const decrypted = JSON.parse(KMSDecrypt(body));
        const check = await db.signature.exists({_id: decrypted._id});
        if(check) {
            return next(createError(400, `Duplicate key`));
        }
        const userKey = new db.signature(decrypted);
        userKey.save(userKey);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: 'Signature key inserted',
            type: 'INSERT',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(201).send("Created");
    } catch (err) {
        throw err;
    }
}

async function createElectionKeys(req, res, next) {
    const body = req.body;
    try {
        const decrypted = JSON.parse(KMSDecrypt(body));
        const check = await db.election.exists({_id: decrypted._id});
        if(check) {
            return next(createError(400, `Duplicate key`));
        }
        const electionKey = new db.election(decrypted);
        electionKey.save(electionKey);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: 'Election key inserted',
            type: 'INSERT',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(201).send("Created");
    } catch (err) {
        throw err;
    }
}

async function updateUserKeys(req, res, next) {
    const id = req.params.id;
    const body = req.body;
    try {
        const decrypted = JSON.parse(KMSDecrypt(body));
        const check = await db.signature.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        const key = await db.signature.findByIdAndUpdate(id, decrypted);
        key.save(key);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Signature keys for id:${id} updated`,
            type: 'UPDATE',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).send("Updated");
    } catch (err) {
        throw err;
    }
}

async function updateElectionKeys(req, res, next) {
    const id = req.params.id;
    const body = req.body;
    try {
        const decrypted = JSON.parse(KMSDecrypt(body));
        const check = await db.election.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        const key = await db.election.findByIdAndUpdate(id, decrypted);
        key.save(key);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Election keys for id:${id} updated`,
            type: 'UPDATE',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).send("Updated");
    } catch (err) {
        throw err;
    }
}

async function deleteUserKeys(req, res, next) {
    const id = req.params.id;
    try {
        const check = await db.signature.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        await db.signature.findByIdAndRemove(id);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Signature keys for id:${id} deleted`,
            type: 'DELETE',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).send("Deleted");
    } catch (err) {
        throw err;
    }
}

async function deleteElectionKeys(req, res, next) {
    const id = req.params.id;
    try {
        const check = await db.election.exists({_id: id});
        if(!check) {
            return next(createError(404, `Key not found`));
        }
        await db.election.findByIdAndRemove(id);
        const token = req.body.token || req.query.token || req.headers["access-token"];
        const _id = jwt.decode(token)._id;
        const log = new db.log({
            description: `Election keys for id:${id} deleted`,
            type: 'DELETE',
            created_by: _id,
            created_at: new Date()
        });
        log.save(log);
        return res.status(200).send("Deleted");
    } catch (err) {
        throw err;
    }
}

module.exports = {
    connection,
    getElectionPublicKey,
    getElectionPrivateKey,
    getUserPublicKey,
    getUserPrivateKey,
    createUserKeys,
    createElectionKeys,
    updateElectionKeys,
    updateUserKeys,
    deleteElectionKeys,
    deleteUserKeys
    };