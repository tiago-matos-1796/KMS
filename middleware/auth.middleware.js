const jwt = require('jsonwebtoken');

const config = process.env;

function verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["access-token"];

    if(!token || token !== process.env.ACCESS_TOKEN) {
        return res.status(403).send("Authentication required");
    }
    try {
        req.user = jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;
