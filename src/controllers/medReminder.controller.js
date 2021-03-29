const db = require("../models");
const MedReminder = db.medreminder;
const Op = db.Sequelize.Op;

// Create and Save a new MedReminder
exports.create = (req, res) => {
    if (!req.body.time) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const medReminder = {
        time: req.body.time,
        timeout: req.body.timeout,
        brandName: req.body.brandName,
        genericName:req.body.genericName,
        verified:req.body.verified,
        reminderMsg:req.body.reminderMsg
    };

    MedReminder.create(medReminder)
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

exports.findAll = (req, res) => {
    /*
    TODO adapt this
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

     */
};

exports.findOne = (req, res) => {
    /*
    TODO adapt this
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });

     */
};

exports.update = (req, res) => {
    /*
    TODO adapt this
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });

     */
};

exports.delete = (req, res) => {
    /*
    TODO adapt this
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });

     */
};



