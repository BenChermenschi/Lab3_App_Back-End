const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.genToken = async function (res, vollenaam, id, isAdmin) {
    console.log('generating new token');
    const TTL = process.env.ACCESS_TOKEN_LIFE;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const token = jwt.sign({ id, vollenaam, isAdmin }, secret, {
        expiresIn: TTL
    });

    return token
}

exports.isTokenValid = (token) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    try {
        const decoded = jwt.verify(token, secret)
        return true
    }
    catch (err) {
        return false
    }
}

exports.isAdmin = (token) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    try {
        const decoded = jwt.verify(token, secret)
        return decoded.isAdmin
    }
    catch (err) {
        return false
    }
}



