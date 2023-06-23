const { Schema } = require('mongoose')

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    replies: [{
        text: {
            type: String,
            required: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        upvotes: {
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default: 0
        },
    }]
})

module.exports = commentSchema