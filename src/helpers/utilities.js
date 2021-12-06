/**
 * Title: Utility functions
 * Description: Define some utility functions
 * Author: Samin Yasar
 * Date: 04/December/2021
 */

// Dependencies
const crypto = require("crypto");

// Module scaffolding
const utilities = {};

/**
 * Parse a string into a valid javascript object
 *
 * @param {String} str - The string that will be parsed
 * @returns {Object} - A valid javascript object
 */
utilities.parseJSON = (str) => {
    let obj;
    try {
        obj = JSON.parse(str);
    } catch (err) {
        obj = {};
    }
    return obj;
};

/**
 * Encrypt a string
 *
 * @param {String} str - The exact string to be encrypted
 * @returns {String} - The encrypted result of the passes string
 */
utilities.encrypt = (str) => {
    if (typeof str === "string" && str.trim().length > 0) {
        return crypto.createHmac("sha256", process.env.SECRET_KEY).update(str).digest("hex");
    }
    return null;
};

/**
 * Create a random string according to passes string length
 *
 * @param {Number} len - The length of the string
 * @returns {String} - A random string with `strLen` length;
 */
utilities.createRandomString = (len) => {
    const strLen = typeof len === "number" && len >= 2 ? len : 2;
    const acceptedCharacters = "abcdefghijklmnopqrstuvwxyz";
    let randomCharacters = "";
    for (let i = 1; i <= strLen; i += 1) {
        randomCharacters +=
            acceptedCharacters[Math.floor(Math.random() * acceptedCharacters.length)];
    }
    return randomCharacters;
};

// Export module
module.exports = utilities;
