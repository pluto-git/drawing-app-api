const db = require("../models");
const Feedback = db.feedbacks;

//add new feedback
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName && !req.body.message && !req.body.subject && !req.body.message) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Feedback
    const feedback = {
        firstName: req.body.firstName,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    };

    // Save Feedback in the database
    Feedback.create(feedback)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Feedback."
            });
        });
};


exports.findAll = (req, res) => {

    Feedback.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving feedbacks."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Feedback.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Feedback with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the feedback with id=" + id
            })
        })
}