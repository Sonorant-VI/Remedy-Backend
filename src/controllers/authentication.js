const db = require("../models");
const User = db.user
const Token = db.token
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth");


// Register new user
exports.register = (req, res) => {

    // Validate request
    if (!req.body.email || !req.body.password || !req.body.role) {
        return res.status(400).json({message: "Required data must be present"});
    } else if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(req.body.email))) {
        return res.status(400).json({message: "Email address is not valid!"});
    }

    // Check role
    if (req.body.role !== "active" && req.body.role !== "passive") {
        return res.status(400).json({message: "Role not valid!"});
    }

    // Check lengths of fields
    if (req.body.email.length > 128 || req.body.password.length > 128) {
        return res.status(413).json({
            message: "Field too long."
        });
    }
    // TODO: validate user role

    // Create a new user
    User.create({
        email: req.body.email,
        hashedpass: bcrypt.hashSync(req.body.password, 8),
        // TODO: remove
        salt: "1",
        role: req.body.role,
    })
        .then(data => {
            // Login
            let token = jwt.sign({id: data.uid}, config.secret, {
                expiresIn: 86400 // 24 hours
            })
            let response = {
                uid: data.uid,
                email: data.email,
                jwt: token
            }
            // Return data
            res.send(response);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while creating new user!"
            });
        });
};
//----------------------------------------------------------------------------------------------------------------------


// Login to user account
exports.login = (req, res) => {
    console.log("We're inside login")
    // Validate request
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: "All data required!"});
    }

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) {
                return res.status(401).send({message: "Invalid email or password."});
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.hashedpass);

            if (!passwordIsValid) {
                return res.status(401).send({message: "Invalid email or password."});
            }

            let token = jwt.sign({id: user.uid}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            // Save JWT to whitelist
            res.status(200).send({
                id: user.uid,
                email: user.email,
                jwt: token
            });

        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });

};
//----------------------------------------------------------------------------------------------------------------------
