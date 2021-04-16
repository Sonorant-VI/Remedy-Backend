const db = require("../models");
const MedReminder = db.medreminder;
const Op = db.Sequelize.Op;

// Create and Save a new MedReminder
exports.create = (req, res) => {
    // console.log("Inside create reminder");
    if (!req.body.time || !req.body.brandName || !req.body.timeout || !req.body.brandName || !req.body.verified || !req.body.reminderMsg || !req.body.patientId) {
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
        reminderMsg:req.body.reminderMsg,
        patientId:req.body.patientId
    };

    console.log("Contents of body have been stored");
    MedReminder.create(medReminder)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the reminder."
            });
        });
};
//-------------------------------------------------------------------------------------------------------------------

// Return all the medication reminders for a single user
exports.findAll = (req, res) => {
    console.log("Inside find all medication reminders");
    const uid = req.params.uid;

    MedReminder.findAll({ where: {patientId: uid}})
        .then(data => {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving reminders."
            });
        });
};
//-------------------------------------------------------------------------------------------------------------------

// Return a single reminder for a specific user
exports.findOne = (req, res) => {
    console.log("Inside find one reminder");
    const id = req.params.id;
    const uid = req.params.uid;

    MedReminder.findOne({where: {id: id, patientId: uid}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Reminder with id=" + id
            });
        });
};
//-------------------------------------------------------------------------------------------------------------------


// Update a medication reminder
exports.update = (req, res) => {

    console.log("Inside update a single reminder");
    
    const id = req.params.id;

    if (!req.body.time || !req.body.brandName || !req.body.timeout || !req.body.genericName || !req.body.verified || !req.body.reminderMsg || !req.body.patientId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    

    const medReminder = {
        time: req.body.time,
        timeout: req.body.timeout,
        brandName: req.body.brandName,
        genericName: req.body.genericName,
        verified: req.body.verified,
        reminderMsg: req.body.reminderMsg,
        patientId: req.body.patientId
    }

    MedReminder.update(medReminder, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reminder was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Reminder with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reminder with id=" + id
            });
        });
};
//-------------------------------------------------------------------------------------------------------------------

// Removes a single medication reminder
exports.delete = (req, res) => {
    console.log("Inside destroy medication reminder");
    const id = req.params.id;

    MedReminder.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Medication Reminder was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Reminder with id=${id}. Maybe reminder was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Reminder with id=" + id
            });
        });
};
