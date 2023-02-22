const { Schema, model } = require('mongoose')

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
    }
})

const Campaign = model('Campaign', campaignSchema)

module.exports = Campaign