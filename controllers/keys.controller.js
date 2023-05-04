const db = require('../db/database')

async function getUserPublicKey(req, res, next) {
    const id = req.params.id;
    try {
        const key = db.userKeys.where(`@id == "${id}"`);
        return res.status(200).json({key: key.items[0].public_key});
    } catch (err) {
        throw err;
    }
}

async function getUserPrivateKey(req, res, next) {
    const id = req.params.id;
    try {
        const key = db.userKeys.where(`@id == "${id}"`);
        return res.status(200).json({key: key.items[0].private_key, iv:key.items[0].iv});
    } catch (err) {
        throw err;
    }
}

async function getElectionPublicKey(req, res, next) {
    const id = req.params.id;
    try {
        const key = db.electionKeys.where(`@id == "${id}"`);
        return res.status(200).json({key: key.items[0].public_key});
    } catch (err) {
        throw err;
    }
}

async function getElectionPrivateKey(req, res, next) {
    const id = req.params.id;
    try {
        const key = db.electionKeys.where(`@id == "${id}"`);
        return res.status(200).json({key: key.items[0].private_key, iv:key.items[0].iv});
    } catch (err) {
        throw err;
    }
}

async function createUserKeys(req, res, next) {
    const body = req.body;
    try {
        db.userKeys.insert({
           id: body.id,
           public_key: body.public_key,
           private_key: body.private_key,
           iv: body.iv
        });
        db.userKeys.save();
        return res.status(201).send("Created");
    } catch (err) {
        throw err;
    }
}

async function createElectionKeys(req, res, next) {
    const body = req.body;
    try {
        db.electionKeys.insert({
            id: body.id,
            public_key: body.public_key,
            private_key: body.private_key,
            iv: body.iv
        });
        db.electionKeys.save();
        return res.status(201).send("Created");
    } catch (err) {
        throw err;
    }
}

async function updateUserKeys(req, res, next) {
    const id = req.params.id;
    const body = req.body;
    try {
        const key = db.userKeys.where(`@id == "${id}"`);
        const cid = key.items[0].cid;
        db.userKeys.update(cid, body);
        db.userKeys.save();
        return res.status(200).send("Updated");
    } catch (err) {
        throw err;
    }
}

async function updateElectionKeys(req, res, next) {
    const id = req.params.id;
    const body = req.body;
    try {
        const key = db.electionKeys.where(`@id == "${id}"`);
        const cid = key.items[0].cid;
        db.electionKeys.update(cid, body);
        db.electionKeys.save();
        return res.status(200).send("Updated");
    } catch (err) {
        throw err;
    }
}

async function deleteUserKeys(req, res, next) {
    const id = req.params.id;
    try {
        const key = db.userKeys.where(`@id == "${id}"`);
        const cid = key.items[0].cid;
        db.userKeys.remove(cid);
        db.userKeys.save();
        return res.status(200).send("Deleted");
    } catch (err) {
        throw err;
    }
}

async function deleteElectionKeys(req, res, next) {
    const id = req.params.id;
    try {
        const key = db.userKeys.where(`@id == "${id}"`);
        const cid = key.items[0].cid;
        db.electionKeys.remove(cid);
        db.electionKeys.save();
        return res.status(200).send("Deleted");
    } catch (err) {
        throw err;
    }
}

module.exports = {
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