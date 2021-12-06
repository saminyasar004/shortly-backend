/**
 * Title: Redirect Handler
 * Description: Handle route redirect the user to the original link
 * Author: Samin Yasar
 * Date: 04/December/2021
 */

// Dependencies
const database = require("../../helpers/database");

// Module scaffolding
const redirectHandler = {};

// Define the handler function
redirectHandler.handler = (requestProps, callback) => {
    const shortenId =
        typeof requestProps.pathname.split("/")[1] === "string"
            ? requestProps.pathname.split("/")[1].trim()
            : null;
    if (shortenId) {
        // get the data according to this shorten id
        database.getByShortenId(
            database.connection,
            shortenId,
            (getShortenIdError, getShortenIdResult) => {
                if (!getShortenIdError && getShortenIdResult.length) {
                    const { originalLink } = getShortenIdResult[0];
                    callback(301, {
                        Location: originalLink,
                    });
                } else {
                    callback(404, {
                        error: "Your requested shorten id is not found.",
                    });
                }
            }
        );
    } else {
        callback(400, {
            error: "Please provide a shorten id in the requested url.",
        });
    }
};

// Export module
module.exports = redirectHandler;
