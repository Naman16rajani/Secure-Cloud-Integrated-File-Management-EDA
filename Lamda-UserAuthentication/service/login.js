const AWS = require('aws-sdk');
const util = require('../utils/util');
const brcypt = require('bcryptjs');
const auth = require('../utils/auth');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTable = "users";


async function login(user) {
    const username = user.username;
    const password = user.password;
    if (!username || !password) {
        return util.buildResponse(401, {
            message: "Username and password are required"
        })
    }

    const dynamoUser = await getUser(username);
    if (!dynamoUser || !dynamoUser.username) {
        return util.buildResponse(401, {
            message: "Invalid username or password"
        })
    }

    if (!brcypt.compareSync(password, dynamoUser.password)) {
        return util.buildResponse(401, {
            message: "Invalid username or password"
        })
    }

    const userInfo = {
        name: dynamoUser.name,
        username: dynamoUser.username,

    }
    const token = auth.generateToken(userInfo);
    const response = {
        user: userInfo,
        token: token
    }
    return util.buildResponse(200, response);
}
async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }
    return await dynamoDB.get(params).promise().then((response) => {
        return response.Item;
    }, error => { console.error('there is an error', error) });
}
module.exports.login = login;