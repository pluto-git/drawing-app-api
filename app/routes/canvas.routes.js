const checkIfAuthenticated = require('../middleware/index');

module.exports = app => {
    const boards = require("../controllers/canvas.controller.js");

    const router = require("express").Router();

    //you re authorized to do:
    router.post("/create", checkIfAuthenticated, boards.create);
    router.get("/board/:id",checkIfAuthenticated, boards.FindOne);
    router.get("/",checkIfAuthenticated, boards.findAllWithCondition);
    router.put("/:id",checkIfAuthenticated, boards.update);
    router.delete("/:id",checkIfAuthenticated, boards.delete);

    app.use('/api/canvas', router);
};