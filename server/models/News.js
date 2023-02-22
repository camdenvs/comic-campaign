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
        }
    }
)

const News = model('News', newsSchema)

module.exports = News