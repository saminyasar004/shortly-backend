/**
 * Title: Not found Handler
 * Description: Handle route that not exist in the system
 * Author: Samin Yasar
 * Date: 04/December/2021
 */

// Module scaffolding
const notFoundHandler = {};

// Define the handler function
notFoundHandler.handler = (requestProps, callback) => {
    callback(404, {
        message: "Your requested route not found!",
    });
};

// Export module
module.exports = notFoundHandler;
