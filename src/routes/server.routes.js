module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const medReminder= require("../controllers/medReminder.controller");
    const appReminder= require("../controllers/appReminder.controller");

    var router = require("express").Router();

    // Login
    router.post("auth/login",/*TODO*/);
    // Create a new user
    router.post("auth/register", user.create);
    // Create a new user
    router.get("auth/logout",/*TODO*/);



    // Return all the users
    router.get("user/",/*TODO*/);
    // Return a single user
    router.get("user/{id}",/*TODO*/);
    // remove single user
    router.delete("user/id",/*TODO*/);
    // ask request
    router.post("user/link/request",/*TODO*/);
    // accept request
    router.post("user/link/validate",/*TODO*/);
    // Return list of links => see read me
    router.get("user/link/list/{id}",/*TODO*/);
    // Remove the link
    router.delete("user/link/remove/{linkId}",/*TODO*/);


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



    // return all the appReminder
    router.get("appReminder/{userId}",/*TODO*/);
    // return single appReminder
    router.get("appReminder/{userId}/{reminderId}",/*TODO*/);
    // create an appReminder
    router.post("appReminder/",/*TODO*/);
    // update an appreminder
    router.patch("appReminder/{reminderId}",/*TODO*/);
    // remove a reminderId
    router.delete("appReminder/{reminderId}",/*TODO*/);


    app.use('/api/', router);

};
