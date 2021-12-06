/**
 * Title: Routing setup
 * Description: Configure routing for this project
 * Author: Samin Yasar
 * Date: 04/December/2021
 */

// Dependencies
const { handler: shortenHandler } = require("./routes/shortenHandler");
const { handler: redirectHandler } = require("./routes/redirectHandler");
const { handler: notFoundHandler } = require("./routes/notFoundHandler");

// Module scaffolding
const routes = {
    shorten: shortenHandler,
    redirect: redirectHandler,
    notFound: notFoundHandler,
};

// Export module
module.exports = routes;
