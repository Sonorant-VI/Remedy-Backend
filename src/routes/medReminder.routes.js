const router = require("express").Router();
const medReminderController = require("../controllers/medReminder.controller");
const authJWT = require("../middleware/authJWT");


module.exports = medReminderRouter => {

    medReminderRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // return all the medReminders
    router.get("medReminder/{userId}",/*TODO*/);

    // return a single medReminder
    router.get("medReminder/{userId}/{reminderId}",/*TODO*/);

    // create a medReminder
    router.post("medReminder/",/*TODO*/);

    // update medReminder
    router.patch("medReminder/{reminderId}",/*TODO*/);

    // remove medReminder
    router.delete("medReminder/{reminderId}",/*TODO*/);

    medReminderRouter.use('/api/medReminder', router);
}
