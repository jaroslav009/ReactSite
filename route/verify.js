const jwt = require('jsonwebtoken');
const storeData = require('./storeData');

exports.getToken = function (user) {
    return jwt.sign(user, storeData.secretKey, {
        expiresIn: 36000
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, storeData.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyOrdinaryUserCustom = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var authenticated = null;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, storeData.secretKey, function (err, decoded) {
            if (err) {
                console.log('you are not authorization');
                authenticated = false;
            } else {
                // if everything is good, save to request for use in other routes
                console.log('you are authorization');
                authenticated = true;
            }
        });
    } else {
        // if there is no token
        // return an error
        console.log('you are not authorization');
        authenticated = false;
    }
    res.json({verifyToken: authenticated});
};

exports.verifyAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, storeData.secretKey, function (err, decoded) {
            if(!decoded._doc.admin){
                var err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
            return next();
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }

};