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


    // return all the medReminders for a single user
    router.get("/:uid", medReminderController.findAll);

    // return a single medReminder
    router.get("/:uid/:id", medReminderController.findOne);

    // create a medReminder
    router.post("/", medReminderController.create);

    // update medReminder
    router.patch("/:id", medReminderController.update);

    // remove medReminder
    router.delete("/:id", medReminderController.delete);

    medReminderRouter.use('/api/medReminder', router);
}