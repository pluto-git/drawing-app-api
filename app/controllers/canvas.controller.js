const db = require("../models");
const Canvas = db.canvas;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//add/save a canvas board

exports.create = (req, res) => {
    // Validate request
    if (!req.body.canvasData && !req.body.uid && !req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a board
    const board = {
        id: req.body.id,
        canvasData: req.body.canvasData,
        uid: req.body.uid,
    };

    // Save board in the database
    Canvas.create(board)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the board."
            });
        });
};

//retrive user's dashboards
exports.findAllWithCondition = (req, res) => {
    const uid = req.query.uid;
    const condition = uid ? { uid: { [Op.like]: `%${uid}%` } } : null;

    Canvas.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving boards."
            });
        });
};

//find one board
exports.FindOne = (req, res) => {
    const id = req.params.id;

    Canvas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find board with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving board with id=" + id
            });
        });
};

//update one board
exports.update = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Specify board id!"
        });
        return;
    }
    const id = req.params.id;
    Canvas.update(req.body, {
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Board was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Board with id=${id}. Maybe Board was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Board with id=" + id
            });
        });
}

//delete a board.
exports.delete = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Specify board id!"
        });
        return;
    }

    const id = req.params.id;

    Canvas.destroy({
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Board was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Board with id=${id}. Maybe Board was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Board with id=" + id
            });
        });
};
