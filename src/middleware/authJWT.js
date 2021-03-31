const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const User = db.user
const Token = db.token

// Verify token in whitelist
verifyTokenWhitelist = (req, res, next) => {

    let token = req.headers["x-access-token"];

    // check token existence
    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    // verify token
    jwt.verify(token, config.secret, (err, decoded) => {

        // invalid token
        if (err) {
            return res.status(401).send({message: "Unauthorized!"});
        }
    })
};
//----------------------------------------------------------------------------------------------------------------------


const authJwt = {
    verifyTokenWhitelist: verifyTokenWhitelist,
};
module.exports = authJwt;
