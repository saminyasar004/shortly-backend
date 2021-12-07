/**
 * Title: Database setup
 * Description: Configure database related stuff
 * Author: Samin Yasar
 * Date: 05/December/2021
 */

// Dependencies
const mysql = require("mysql");
const config = require("./config");

// Module scaffolding
const database = {};

// Create a database connection
database.connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    database: config.db.database,
});

/**
 * Create table in the database
 *
 * @param {Connection} con - The database connection
 * @param {CallableFunction} callback - A callback function
 */
database.createTable = (con, callback) => {
    const sqlQuery = `CREATE TABLE IF NOT EXISTS ${config.db.tables.link} (id INT(11) AUTO_INCREMENT PRIMARY KEY, shortenId VARCHAR(255) NOT NULL, originalLink VARCHAR(255) NOT NULL)`;
    con.query(sqlQuery, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback(err);
        }
    });
};

/**
 * Lookup in database by original link
 *
 * @param {Connection} con - The database connection
 * @param {URL} link - Original link
 * @param {CallableFunction} callback - A callback function
 */
database.getByOriginalLink = (con, link, callback) => {
    const sqlQuery = `SELECT * FROM ${config.db.tables.link} WHERE originalLink = '${link}'`;
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
    const sqlQuery = `SELECT * FROM ${config.db.tables.link} WHERE shortenId = '${shortenId}'`;
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
    const sqlQuery = `INSERT INTO ${config.db.tables.link} (shortenId, originalLink) VALUES ('${shortenId}', '${originalLink}')`;
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
        console.log(`Successfully connected with ${config.db.database} database.`);
        // create a table in the database if not exist
        database.createTable(database.connection, (createError) => {
            if (!createError) {
                console.log(`Successfully created ${config.db.tables.link} in the database.`);
            } else {
                console.log(
                    `Error occures while creating ${config.db.tables.link} in the database.`
                );
                throw new Error(createError);
            }
        });
    } else {
        console.log(`Error occures while connecting to ${config.db.database} database.`);
        throw new Error(err);
    }
});

// Export module
module.exports = database;
