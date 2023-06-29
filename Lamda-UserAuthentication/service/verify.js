const utils = require('../utils/util');
const auth = require('../utils/auth');

function verify(requestBody) {
    if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
        return utils.buildResponse(400, {
            "verified": false,
            "message": "Invalid request"
        });
    }
    const user = requestBody.user;
    const token = requestBody.token;
    const verification = auth.verifyToken(user.username, token);
    if (!verification.verified) {
        return utils.buildResponse(401, {
            "verified": false,
            "message": verification.message
        });
    }
    return utils.buildResponse(200, {
        verified: true,
        message: "success",
        user: user,
        token: token

    })

}


module.exports.verify=verify;