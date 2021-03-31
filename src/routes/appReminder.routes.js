const router = require("express").Router();
const appReminderController = require("../controllers/appReminder.controller");
const authJWT = require("../middleware/authJWT");


module.exports = appReminderRouter => {

    appReminderRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // return all the appReminder
    router.get("/:uid",appReminderController.findAll);

    // return single appReminder
    router.get("/:uid/:id",appReminderController.findOne);

    // create an appReminder
    router.post("/",appReminderController.create);

    // update an appreminder
    // TODO: fix
    router.patch("/:id",appReminderController.update);

    // remove a reminderId
    router.delete("/:id",appReminderController.delete);

    appReminderRouter.use('/api/appReminder', router);
}
