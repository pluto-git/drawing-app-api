require('dotenv').config()
const express = require("express");
const cors = require("cors");
const checkIfAuthenticated = require('./app/middleware/index.js');

const app = express();

var corsOptions = {
    origin: process.env.ORIGIN
};

app.use(cors(corsOptions));

// fixing "413 Request Entity Too Large" errors
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true}))




const db = require("./app/models");
// db.sequelize.sync();
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });




// simple route
app.get("/", checkIfAuthenticated, (req, res) => {
    res.json({ message: "Welcome to drawing-api application." });
});

require("./app/routes/feedback.routes.js")(app);

require("./app/routes/canvas.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`);
});