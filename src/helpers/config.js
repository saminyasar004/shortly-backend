/**
 * Title: Configuration setup
 * Description: Setup configuration related stuff
 * Author: Samin Yasar
 * Date: 07/December/2021
 */

// Module scaffolding
const config = {
    port: 3000,
    secretKey: "qwertyopoioiuoullkljkhfjasgfzbczmvbxmczvnzfhsdajkf",
    db: {
        host: "db4free.net",
        user: "saminyasar004",
        password: "saminYasar@20042018",
        database: "saminyasarmysql",
        pot: 3306,
        tables: {
            link: "shortly_table",
        },
    },
    projectURL: "https://shortly-samin.herokuapp.com",
};

// Export module
module.exports = config;
