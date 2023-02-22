const { Schema, model } = require('mongoose')

const newsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        }

    }
)

const News = model('News', newsSchema)

module.exports = News