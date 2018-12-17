const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const {hashPassword} = require('../helpers/helper')

userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: ['6', 'Minimum length of name is 6']
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: function(email){
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            message: props => `${props.value} is not a valid email`
        }, {
            validator: function(email){
                return User.findOne({
                    email: email
                })
                .then((result) => {
                    if (result) {
                        throw new Error('Email is used')
                    }
                }).catch((err) => {
                    throw new Error(err.message)
                });
            },
            message: props => `${props.value} is used`
        }]
    },
    password: {
        type: String,
        required: true,
        minlength: ['6', 'Minimum length of password is 6']
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                if(!/^[0-9]+$/.test(v)) {
                    return false
                }
                return true
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        minlength: [11, 'Minimum length phone number is 11'],
        maxlength: [13, 'Maximum length phone number is 13']
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User