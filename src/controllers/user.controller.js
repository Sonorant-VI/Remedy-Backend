const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const user = {
        email: req.body.email,
        salt: req.body.salt,
        role: req.body.role,
    };
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};


