const AWS = require('aws-sdk');
const registerService = require('./service/register');
const loginService = require('./service/login');
const verifyService = require('./service/verify');
const util = require('./utils/util');

const healthPath = "/health"
const registerPath = "/register"
const loginPath = "/login"
const verifyPath = "/verify"
exports.handler = async (event) => {

// export const handler = async (event) => {
    console.log("request event: ", event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = await registerService.register(registerBody);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = await loginService.login(loginBody);
            // response = util.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = verifyService.verify(verifyBody);
            // response = util.buildResponse(200);
            break;
        default:
            response = util.buildResponse(404, '404 Not Found');

    }
    return response;
}


function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Allow-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}