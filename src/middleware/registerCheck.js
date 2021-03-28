const db = require("../models");
const User = db.user


exports.checkUniqueUsernameEmail = (req, res, next) => {

    //  Check username duplicates
    User.findOne({ where: {'email': req.body.email}})
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: "Duplicate email!"
                });
            }

            // If unique proceed
            next();

        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while confirming unique email!"
            });
        });

};

