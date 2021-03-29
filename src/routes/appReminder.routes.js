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
    router.get("/{userId}",/*TODO*/);

    // return single appReminder
    router.get("/{userId}/{reminderId}",/*TODO*/);

    // create an appReminder
    router.post("/",/*TODO*/);

    // update an appreminder
    router.patch("/{reminderId}",/*TODO*/);

    // remove a reminderId
    router.delete("/{reminderId}",/*TODO*/);

    appReminderRouter.use('/api/appReminder', router);
}
