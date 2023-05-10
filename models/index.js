const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URI;
db.auth = require('./auth.model')(mongoose)
db.election = require('./election.model')(mongoose)
db.log = require('./log.model')(mongoose)
db.signature = require('./signature.model')(mongoose)

module.exports = db;