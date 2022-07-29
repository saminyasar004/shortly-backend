/**
 * Title: Configuration setup
 * Description: Setup configuration related stuff
 * Author: Samin Yasar
 * Date: 07/December/2021
 */

// Dependencies
const path = require("path");
require("dotenv").config(path.join(__dirname, "../../.env"));

// Module scaffolding
const config = {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY,
    db: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        url: process.env.DATABASE_URL,
        tables: {
            link: "shortly_table",
        },
    },
    projectURL: process.env.PROJECT_URL,
};

// Export module
module.exports = config;
