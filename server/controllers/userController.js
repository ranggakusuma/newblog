const User = require('../models/User')
const { generateToken, checkPassword, verifyToken } = require('../helpers/helper')

module.exports = {
    register(req, res) {
        // console.log(req.body, 'ini dari controler register')
        let { name, email, password, phone } = req.body

        User.create({
            name,
            email,
            password,
            phone
        })
            .then((result_user) => {
                res.status(201).json(result_user)
            }).catch((err) => {
                // console.log(err)
                res.status(400).json({
                    message: err.message
                })
            });
    },
    login(req, res) {
        let { email, password } = req.body
        // console.log(req.body)

        User.findOne({
            email: email
        })
            .then((result_user) => {
                // console.log(result_user)
                if (!result_user) {
                    res.status(400).json({
                        message: 'Email not found'
                    })
                } else {
                    if (checkPassword(password, result_user.password)) {
                        let input = {
                            _id: result_user._id,
                            name: result_user.name,
                            email: result_user.email,
                            phone: result_user.phone
                        }
                        res.status(200).json({
                            token: generateToken(input),
                            _id: result_user._id,
                            email: result_user.email
                        })
                    } else {
                        res.status(400).json({
                            message: 'Wrong password'
                        })
                    }

                }
            }).catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            });
    },
    verify(req, res) {
        let token = req.headers.auth
        verifyToken(token, function(err, result){
            if (err) {
                res.status(400).json({
                    message: err.message
                })
            } else {
                User.findOne({
                    email: result.email
                })
                .then((result_user) => {
                    if (result_user) {
                        res.status(200).json(result)
                    } else {
                        res.status(400).json({
                            message: 'User not found'
                        })
                    }
                }).catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
            }
        })
    }
}
