/**
 * Title: Shorten Handler
 * Description: Handle link shorten route
 * Author: Samin Yasar
 * Date: 04/December/2021
 */

// Dependencies
const database = require("../../helpers/database");
const utilities = require("../../helpers/utilities");
require("dotenv").config();

// Module scaffolding
const shortenHandler = {};

// Define the shorten object
shortenHandler.shorten = {};

// Define the handler function
shortenHandler.handler = (requestProps, callback) => {
    if (requestProps.method === "get") {
        shortenHandler.shorten.get(requestProps, callback);
    } else {
        callback(405, {
            error: "Your requested method are not allowed.",
        });
    }
};

// Get method
shortenHandler.shorten.get = (requestProps, callback) => {
    const url =
        typeof requestProps.queryObj.url === "string"
            ? requestProps.queryObj.url.replace(/^\/+|\/+$/gi, "").trim()
            : null;
    if (url) {
        const originalLink = url.search(/https?:\/+.+/gi) > -1 ? url : `http://${url}`;
        // make sure that if the url is exist or not
        database.getByOriginalLink(
            database.connection,
            originalLink,
            (getExistingError, getExistingData) => {
                if (!getExistingError && getExistingData.length) {
                    // return the existing data
                    const existingData = { ...getExistingData[0] };
                    existingData.shortenLink = `${process.env.PROJECT_URL}/redirect/${existingData.shortenId}`;

                    callback(200, {
                        existingData: { ...existingData },
                    });
                } else {
                    // create one
                    const shortenId = utilities.createRandomString(8);
                    const result = {
                        shortenId,
                        originalLink,
                    };
                    database.insertLink(database.connection, result, (insertError) => {
                        if (!insertError) {
                            // get the data
                            database.getByOriginalLink(
                                database.connection,
                                originalLink,
                                (getCreatedError, getCreatedData) => {
                                    if (!getCreatedError && getCreatedData.length) {
                                        const createdData = { ...getCreatedData[0] };
                                        createdData.shortenLink = `${process.env.PROJECT_URL}/redirect/${createdData.shortenId}`;

                                        callback(200, {
                                            createdData: { ...createdData },
                                        });
                                    } else {
                                        callback(500, {
                                            error: "Couldn't shorten your link.",
                                        });
                                    }
                                }
                            );
                        } else {
                            callback(500, {
                                error: "Couldn't shorten your link.",
                            });
                        }
                    });
                }
            }
        );
    } else {
        callback(400, {
            error: "Please provide a url in the request url to shorten a link.",
        });
    }
};

// Export module
module.exports = shortenHandler;
