/**
 * Title: Server setup
 * Description: Setup the server for this project
 * Author: Samin Yasar
 * Date: 03/December/2021
 */

// Dependencies
const http = require("http");
const config = require("./config");

const { handler: reqResHandler } = require("../handlers/reqResHandler");

// Module scaffolding
const server = {};

// Set a Server port
server.PORT = process.env.PORT || config.port;

// Define the initializer function
server.init = () => {
    // create a server
    const httpServer = http.createServer(reqResHandler);
    // listen the server
    httpServer.listen(server.PORT, () => {
        console.log(`Server is running on ${server.PORT}`);
    });
};

// Export module
module.exports = server;
