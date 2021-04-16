const db = require("../models");
const linked = db.linked;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    if (!req.body.uid_linked || !req.body.uid_linker) {
        console.log("We're inside the link creater");
        if (!req.body.uid_linked && !req.body.uid_linker) {
            return res.status(400).json({message: "uid_linked and uid_linker is missing or is empty "});
        } else if (!req.body.uid_linked) {
            return res.status(400).json({message: "uid_linked is missing or is empty "});
        } else if (!req.body.uid_linker) {
            return res.status(400).json({message: "uid_linker is missing or is empty "});
        }
    }
    linked.create({
        uid_linked: req.body.uid_linked,
        uid_linker: req.body.uid_linker,
        verified: "false",
    })
        .then(data => {
            res.send({
                message: "link request sended now waiting to be verified"
            });
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while creating new Link!"
            });
        });
};

exports.validate = (req, res) => {

    linked.update(
        {verified: "true"},
        {
            where: {
                uid_linked: req.body.uid_linked,
                uid_linker: req.body.uid_linker
            }
        }
    ).then(num => {
        if (num) {
            res.send({
                message: "link accepted successfully."
            });
        } else {
            res.send({
                message: `Cannot update link!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating link"
        });
    });

}

exports.findAll = (req, res) => {
    const id = req.params.id;
    linked.findAll({where: {uid_linker: id}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving links."
            });
        });
};


exports.findOne = (req, res) => {

    const id = req.params.id;

    linked.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving link with id=" + id
            });
        });
};


exports.delete = (req, res) => {

    linked.destroy({
        where: {
            uid_linked: req.body.uid_linked,
            uid_linker: req.body.uid_linker
        }
    })
        .then(num => {
            if (num) {
                res.send({
                    message: "link was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete link!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete link"
            });
        });
};
