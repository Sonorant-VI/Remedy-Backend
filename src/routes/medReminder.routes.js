const router = require("express").Router();
const medReminderController = require("../controllers/medReminder.controller");
const authJWT = require("../middleware/authJWT");


module.exports = medReminderRouter => {

    medReminderRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
    });


    // return all the medReminders for a single user
    router.get("/:uid", [authJWT.verifyToken, authJWT.verifyPermission], medReminderController.findAll);

    // return a single medReminder
    router.get("/:uid/:id", [authJWT.verifyToken, authJWT.verifyPermission], medReminderController.findOne);

    // create a medReminder
    router.post("/", [authJWT.verifyToken, authJWT.verifyPermission], medReminderController.create);

    // update medReminder
    router.patch("/:id", [authJWT.verifyToken, authJWT.verifyPermission], medReminderController.update);

    // remove medReminder
    router.delete("/:id", [authJWT.verifyToken, authJWT.verifyPermission], medReminderController.delete);

    medReminderRouter.use('/api/medReminder', router);
}
