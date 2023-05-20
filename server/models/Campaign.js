const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const campaignSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true
    },
    goalDate: {
        type: String,
        required: true
    },
    earned: {
        type: Number,
        required: true,
        default: 0
    },
    investorCount: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
})

const Campaign = model('Campaign', campaignSchema)

module.exports = Campaign