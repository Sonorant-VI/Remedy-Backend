const router = require("express").Router();
const appReminderController = require("../controllers/appReminder.controller");
const authJWT = require("../middleware/authJWT");


module.exports = appReminderRouter => {

    appReminderRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
    });


    // return all the appReminder
    router.get("/:uid", [authJWT.verifyToken, authJWT.verifyPermission], appReminderController.findAll);

    // return single appReminder
    router.get("/:uid/:id", [authJWT.verifyToken, authJWT.verifyPermission], appReminderController.findOne);

    // create an appReminder
    router.post("/", [authJWT.verifyToken, authJWT.verifyPermission], appReminderController.create);

    // update an appreminder
    // TODO: fix
    router.patch("/:id", [authJWT.verifyToken, authJWT.verifyPermission], appReminderController.update);

    // remove a reminderId
    router.delete("/:id", [authJWT.verifyToken, authJWT.verifyPermission], appReminderController.delete);

    appReminderRouter.use('/api/appReminder', router);
}
