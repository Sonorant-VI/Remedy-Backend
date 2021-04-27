const router = require("express").Router();
const linkController = require("../controllers/link.controller");
const authJWT = require("../middleware/authJWT");


module.exports = linkRouter => {

    linkRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Request link
    router.post("/request",[authJWT.verifyToken],linkController.create);

    // Accept link request
    router.patch("/validate", [authJWT.verifyToken], linkController.validate);

    // Return list of links => see read me
    router.get("/list/:id",linkController.findAll);

    // Remove the link
    router.delete("/remove",linkController.delete);

    linkRouter.use('/api/link', router);
}
