const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

export default function authenticate(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET)
}