const AWS = require('aws-sdk');
const util = require('../utils/util');
const brcypt = require('bcryptjs');
AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTable = "users";

async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const password = userInfo.password;
    const username = userInfo.username;

    if (!name || !email || !password || !username) {
        return util.buildResponse(401, {
            message: "All fields are required"
        });
    }

    const dynamoUser = await saveUser(username);
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: "Username already exists"
        })
    }

    const salt = brcypt.genSaltSync(10);
    const encryptedPW = brcypt.hashSync(password.trim(), salt);

    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW,
    }

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {
        return util.buildResponse(500, {
            message: "Internal Server Error"
        })
    }
    return util.buildResponse(200, {
        message: "User created successfully"
    })
}


async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item:user
    }
    return await dynamoDB.put(params).promise().then((response) => {
        return true;
    }, error => { console.error('there is an error', error) });
}

module.exports.register = register;
