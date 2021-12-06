/**
 * Title: Database setup
 * Description: Configure database related stuff
 * Author: Samin Yasar
 * Date: 05/December/2021
 */

// Dependencies
const mysql = require("mysql");
require("dotenv").config();

// Module scaffolding
const database = {};

// Create a database connection
database.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB,
});

/**
 * Lookup in database by original link
 *
 * @param {Connection} con - The database connection
 * @param {URL} link - Original link
 * @param {CallableFunction} callback - A callback function
 */
database.getByOriginalLink = (con, link, callback) => {
    const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE} WHERE originalLink = '${link}'`;
    con.query(sqlQuery, (err, result) => {
        if (!err && result) {
            callback(null, result);
        } else {
            callback("Error occures while searching your link.", null);
            throw new Error(err);
        }
    });
};

/**
 * Lookup in database by shorten id
 *
 * @param {Connection} con - The database connection
 * @param {String} shortenId - Shorten id
 * @param {CallableFunction} callback - A callback function
 */
database.getByShortenId = (con, shortenId, callback) => {
    const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE} WHERE shortenId = '${shortenId}'`;
    con.query(sqlQuery, (err, result) => {
        if (!err && result) {
            callback(null, result);
        } else {
            callback("Error occures while searching your shorten id.", null);
            throw new Error(err);
        }
    });
};

/**
 * Insert a new data inside the database
 *
 * @param {Connection} con - The database connection
 * @param {Object} values - All the placeholder values in an object
 * @param {CallableFunction} callback - A callback function
 */
database.insertLink = (con, values, callback) => {
    const { shortenId, originalLink } = values;
    const sqlQuery = `INSERT INTO ${process.env.DB_TABLE} (shortenId, originalLink) VALUES ('${shortenId}', '${originalLink}')`;
    con.query(sqlQuery, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback("Error occures while inserting a new data.");
            throw new Error(err);
        }
    });
};

// Connect the database
database.connection.connect((err) => {
    if (!err) {
        console.log(`Successfully connected with ${process.env.DB} database.`);
    } else {
        console.log(`Error occures while connecting to ${process.env.DB} database.`);
        throw new Error(err);
    }
});

// Export module
module.exports = database;
