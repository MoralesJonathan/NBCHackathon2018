const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const mongoose =require('mongoose')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ acess: 'denied no token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    return jwt.verify(token, keys.secretOrPrivateKey, (err, decoded) => {
        console.log(decoded);
        // the 401 code is for unauthorized status
        if (err) {
            console.log(err);
            return res.status(401).send(err);
        }
        const userId = mongoose.Types.ObjectId(decoded.id);
        console.log(userId);
        return User.findOne({_id:userId}, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            console.log(user);
            // pass user details onto next route
            req.user = user
            return next();
        });
    });
};