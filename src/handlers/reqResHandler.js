/**
 * Title: Request & response handler
 * Description: Handle user request and response
 * Author: Samin Yasar
 * Date: 04/December/2021
 */

// Dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");

const routes = require("./routes");
const utilities = require("../helpers/utilities");

// Module scaffolding
const reqResHandler = {};

// Define the handler function
reqResHandler.handler = (req, res) => {
    let reqBody = "";
    const decoder = new StringDecoder("utf-8");
    // parsed the url
    const parsedURL = url.parse(req.url, true);
    // get the path
    const pathname = parsedURL.pathname.replace(/^\/|\/$/gi, "");
    // get the method name as lowercase
    const method = req.method.toLowerCase();
    // get the request headers
    const requestHeaders = req.headers;
    // get the query obj
    const queryObj = parsedURL.query;
    // store all the values in an object
    const requestProps = {
        pathname,
        method,
        requestHeaders,
        queryObj,
    };
    // the header obj for response
    const responseHeader = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
    };
    // choose the corresponding handler function according to the pathname
    let choosenHandler;
    if (pathname.split("/")[0] === "redirect") {
        choosenHandler = routes.redirect;
    } else if (pathname === "shorten") {
        choosenHandler = routes.shorten;
    } else {
        choosenHandler = routes.notFound;
    }

    req.on("data", (buffer) => {
        reqBody += decoder.write(buffer);
    });

    req.on("end", () => {
        reqBody += decoder.end();

        // assume the reqBody on the requestProps
        requestProps.reqBody = utilities.parseJSON(reqBody);

        // call the choosenHandler function
        if (pathname.split("/")[0] === "redirect") {
            choosenHandler(requestProps, (status, payload) => {
                const statusCode = typeof status === "number" ? status : 500;
                let payloadObj;
                if (typeof payload === "object") {
                    if (payload.Location) {
                        responseHeader.Location = payload.Location;
                        payloadObj = {};
                    } else {
                        payloadObj = payload;
                    }
                } else {
                    payloadObj = {};
                }
                const payloadStr = JSON.stringify(payloadObj);

                res.writeHead(statusCode, responseHeader);
                res.end(payloadStr);
            });
        } else {
            choosenHandler(requestProps, (status, payload) => {
                const statusCode = typeof status === "number" ? status : 500;
                const payloadObj = typeof payload === "object" ? payload : {};
                const payloadStr = JSON.stringify(payloadObj);

                res.writeHead(statusCode, responseHeader);
                res.end(payloadStr);
            });
        }
    });
};

// Export module
module.exports = reqResHandler;
