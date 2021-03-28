const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const server = express();
const port = process.env.PORT || 3000;
const url = process.env.URL || "http://localhost";

const db = require("../src/models");
db.sequelize.sync();

//----------------------------------------------------------------------------------------------------------------------


// cors settings
let corsOptions = {
    origin: url + ":" + 8080
};
server.use(cors(corsOptions));

// parse requests of content-type - application/json
server.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

//----------------------------------------------------------------------------------------------------------------------


//require("./models/db");
//require("./routes/authentication")(server);
//require("./routes/users")(server);
//require("./routes/properties")(server);
//require("./routes/images")(server);
//require("./config/passport.js");


const path = require('path');
// Server static files from the Vue frontend app
server.use(express.static(path.join(__dirname, '/dist')));

server.use(passport.initialize());

server.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});


/**
 * Start server
 */
server.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

module.exports = server;
