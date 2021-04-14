const db = require("../models");
const AppReminder = db.appreminder;
const Op = db.Sequelize.Op;

// Create and Save a new appReminder
exports.create = (req, res) => {

    // console.log("Inside create reminder");
    if (!req.body.start || !req.body.stop || !req.body.timeout || !req.body.reminder_msg ||!req.body.purpose || !req.body.patientId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const appReminder = {
        start: req.body.start,
        stop: req.body.stop,
        timeout: req.body.timeout,
        purpose: req.body.purpose,
        reminder_msg:req.body.reminder_msg,
        patientId:req.body.patientId
    };

    console.log("Contents of body have been stored");
    AppReminder.create(appReminder)
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

// Return all the appointment reminders for a single user
exports.findAll = (req, res) => {
    console.log("Inside find all appointment reminders");
    const uid = req.params.uid;

    AppReminder.findAll({ where: {patientId: uid}})
        .then(data => {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving reminders."
            });
        });
       
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
   
//-------------------------------------------------------------------------------------------------------------------

// Return a single reminder for a specific user
exports.findOne = (req, res) => {

    console.log("Inside find one reminder");
    const id = req.params.id;
    const uid = req.params.uid;

    AppReminder.findOne({where: {id: id, patientId: uid}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Reminder with id=" + id
            });
        });

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

    console.log("Inside update a single reminder");
    console.log(typeof(req.body.start));
    const id = req.params.id; 

    if (!req.body.start || !req.body.stop || !req.body.timeout || !req.body.reminder_msg ||!req.body.purpose || !req.body.patientId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Ensure correct typing for reminders
    // NOTE: This can probably be handled better on the front end
    /*if (typeof(req.body.start)!= 'string' || typeof(req.body.stop != 'string')){
        res.status(400).send({
            message: "Incorrect type"
        });
        return
    }*/



    const appReminder = {
        start: req.body.start,
        stop: req.body.stop,
        timeout: req.body.timeout,
        purpose: req.body.purpose,
        reminder_msg:req.body.reminder_msg,
        patientId:req.body.patientId,
        cancelled:req.body.cancelled
    };

    AppReminder.update(appReminder, {
        where: { id: id }
    })
        .then(num => {
            log.error("num:")
            log.error(num)
            if (num === 1) {
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
    console.log("Inside destroy appointment reminder");
    const id = req.params.id;

    AppReminder.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Appointment Reminder was deleted successfully!"
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

