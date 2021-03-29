const router = require("express").Router();
const userController = require("../controllers/user.controller");
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
    router.get("/",/*TODO*/);

    // Return a single user
    router.get("/:id",/*TODO*/);

    // remove single user
    router.delete("/:id",/*TODO*/);

    // ask request
    router.post("/link/request",/*TODO*/);

    // accept request
    router.post("/link/validate",/*TODO*/);

    // Return list of links => see read me
    router.get("/link/list/:id",/*TODO*/);

    // Remove the link
    router.delete("/link/remove/:linkId",/*TODO*/);

    userRouter.use('/api/user', router);
}
