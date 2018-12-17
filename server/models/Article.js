const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [6, 'Minimum length of title is 6']
    },
    text: {
        type: String,
        required: true,
        minlength: [20, 'Minimum length of text is 20']
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    comments: {
        type: [ObjectId],
        ref: 'Comment'
    },
    date: {
        type: Date,
        default: new Date
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article