const router = require("express").Router();
const userController = require("../controllers/user.controller");
const linkController = require("../controllers/link.controller");
const authJWT = require("../middleware/authJWT");


module.exports = userRouter => {

    userRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // Return all the users
    router.get("/",[authJWT.verifyTokenWhitelist],userController.findAll);

    // Return a single user
    router.get("/:id",[authJWT.verifyTokenWhitelist],userController.findOne);

    // remove single user
    router.delete("/:id",[authJWT.verifyTokenWhitelist],userController.delete); /*TODO remove all reminder and link in the other table before*/

    // ask request
    router.post("/link/request",[authJWT.verifyTokenWhitelist],linkController.create);

    // accept request
    router.patch("/link/validate",linkController.validate);

    // Return list of links => see read me
    router.get("/link/list/:id",linkController.findAll);

    // Remove the link
    router.delete("/link/remove",linkController.delete);

    userRouter.use('/api/user', router);
}
