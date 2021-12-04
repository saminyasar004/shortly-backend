/**
 * Title: Server setup
 * Description: Setup the server for this project
 * Author: Samin Yasar
 * Date: 03/December/2021
 */

// Dependencies
const http = require("http");
const dotenv = require("dotenv").config();

// Module scaffolding
const server = {};

// Define the initializer function
server.init = () => {
    // create a server
    const httpServer = http.createServer((req, res) => {
        res.end("Hello World!");
    });
    // listen the server
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`);
    });
};

// Export module
module.exports = server;
