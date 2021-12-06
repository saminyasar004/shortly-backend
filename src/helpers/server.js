/**
 * Title: Server setup
 * Description: Setup the server for this project
 * Author: Samin Yasar
 * Date: 03/December/2021
 */

// Dependencies
const http = require("http");
require("dotenv").config();

const { handler: reqResHandler } = require("../handlers/reqResHandler");

// Module scaffolding
const server = {};

// Set a Server port
server.PORT = 5000;

// Define the initializer function
server.init = () => {
    // create a server
    const httpServer = http.createServer(reqResHandler);
    // listen the server
    httpServer.listen(process.env.PORT || server.PORT, () => {
        console.log(`Server is running on ${process.env.PORT || server.PORT}`);
    });
};

// Export module
module.exports = server;
