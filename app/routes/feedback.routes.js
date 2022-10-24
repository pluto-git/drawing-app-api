const checkIfAuthenticated = require('../middleware/index');

module.exports = app => {
    const feedbacks = require("../controllers/feedback.controller.js");

    var router = require("express").Router();

    //create a new feedback
    router.post("/create", feedbacks.create);
    // Retrieve all feedbacks if you re authorized to do so
    router.get("/", checkIfAuthenticated, feedbacks.findAll);

    //find a feedback by id if you re authorized to do so
    router.get("/:id", checkIfAuthenticated, feedbacks.findOne);

    app.use('/api/feedbacks', router);
};