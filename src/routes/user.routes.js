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


    // Return all users
    router.get("/",[authJWT.verifyToken],userController.findAll);

    // Return single user
    router.get("/:id",[authJWT.verifyToken],userController.findOne);

    // Remove single user
    router.delete("/:id",[authJWT.verifyToken],userController.delete); /*TODO remove all reminder and link in the other table before*/

    // Request link
    router.post("/link/request",[authJWT.verifyToken],linkController.create);

    // Accept link request
    router.patch("/link/validate", [authJWT.verifyToken], linkController.validate);

    // Return list of links => see read me
    router.get("/link/list/:id",linkController.findAll);

    // Remove the link
    router.delete("/link/remove",linkController.delete);

    userRouter.use('/api/user', router);
}
