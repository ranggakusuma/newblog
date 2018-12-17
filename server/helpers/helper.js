var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
    hashPassword(password) {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    checkPassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    },
    generateToken(input) {
        return jwt.sign(input, process.env.JWT_KEY);
    },
    verifyToken(token, callback) {
        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) {
                callback(err)
            } else {
                callback(null, decoded)
            }
        });
    }
}