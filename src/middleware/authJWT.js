const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const User = db.user
const Token = db.token
const Linked = db.linked;

// Verify token in whitelist
verifyToken = (req, res, next) => {

    let token = req.headers["token"];

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

        // Save token id in request
        req.params.tokenId = decoded.id

        next();
    })
};
//----------------------------------------------------------------------------------------------------------------------

// Verify permission
verifyPermission = (req, res, next) => {
    console.log("here")

    // For themself
    if (req.params.tokenId === req.body.patientId){
        console.log("same")
        next();
    }
    else {
        // For other user
        Linked.findOne({where: {uid_linker: req.params.tokenId, uid_linked: req.body.patientId, verified: true}})
            .then(data => {
                if (data){
                    next();
                }
                else {
                    return res.status(400).send({
                        message: "Not allowed"
                    });
                }
            })
            .catch(err => {
                return res.status(500).send({
                    message: err
                });
            });
    }
};
//----------------------------------------------------------------------------------------------------------------------


const authJwt = {
    verifyToken: verifyToken,
    verifyPermission: verifyPermission,
};
module.exports = authJwt;
