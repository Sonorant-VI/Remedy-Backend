const router = require("express").Router();
const registerCheck = require("../middleware/registerCheck")
const authenticationController = require("../controllers/authentication");
const authJWT = require("../middleware/authJWT");


module.exports = authenticationRouter => {

    authenticationRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // Register new user
    router.post("/register",[registerCheck.checkUniqueUsernameEmail], authenticationController.register);

    // Login to user account
    router.post("/login", authenticationController.login);

    // Logout the user
    router.get("/logout", [authJWT.verifyToken], authenticationController.logout);

    authenticationRouter.use('/api/auth', router);
}
