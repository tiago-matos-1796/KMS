const locallydb = require('locallydb');

const db = new locallydb('./kmsDB');
const userKeys = db.collection('user_keys');
const electionKeys = db.collection('election_keys');
const auth = db.collection('auth');

module.exports = {userKeys, electionKeys, auth};