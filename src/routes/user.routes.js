const router = require("express").Router();
const userController = require("../controllers/user.controller");
const linkController = require("../controllers/link.controller");
const authJWT = require("../middleware/authJWT");


module.exports = userRouter => {

    userRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
    });


    // Return all users
    router.get("/",[authJWT.verifyToken],userController.findAll);

    // Return single user
    router.get("/:id",[authJWT.verifyToken],userController.findOne);

    // Remove single user
    router.delete("/:id",[authJWT.verifyToken],userController.delete); /*TODO remove all reminder and link in the other table before*/

    userRouter.use('/api/user', router);
}
