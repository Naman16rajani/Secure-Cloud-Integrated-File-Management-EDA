const jwt = require('jsonwebtoken');

function generateToken(userInfo) {
    if (!userInfo) return null;

    return jwt.sign(userInfo, "1234", { expiresIn: '1h' });
}

function verifyToken(username, token) {
    return jwt.verify(token, "1234", (error, response) => {
        if (error) {
            return {
                verified: false,
                message: "Invalid token"
            };
        }
        if (response.username !== username) {
            return {
                verified: false,
                message: "Invalid token"
            }
        }

        return {
            verified: true,
            message: "Valid token"
        }

    });
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;