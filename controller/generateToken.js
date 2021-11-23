const jwt = require('jsonwebtoken');

export function generateToken(payload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET /*, { expiresIn : '3m'}*/)
    return token
}