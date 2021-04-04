const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Link =require("../controllers/link.controller");


exports.findAll = (req, res) => {
    User.findAll({attributes: ["uid", "email", "role"]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });

};


exports.findOne = (req, res) => {
    console.log("We're inside the find one user");
    const id = req.params.id;
    User.findByPk(id,{attributes: ["uid", "email", "role", "createdAt", "updatedAt"]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });

};


exports.delete = (req, res) => {
    console.log("We're inside the destroy user");
    const id = req.params.id;
    User.destroy({
        where: {uid: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};






