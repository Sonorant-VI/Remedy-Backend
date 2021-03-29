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


