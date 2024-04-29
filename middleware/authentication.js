const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message : "Unauthorized"});
    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if(err) return res.status(403).send(err.message);
        req.user = user;
        next();
    })
}

module.exports = {auth}