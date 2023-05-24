const { Schema, model } = require('mongoose')

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            default: 'Miscellaneous'
        },
        sizes: {
            type: String,
            required: true,
            default: ''
        }
    }
)

const Product = model('Product', productSchema)

module.exports = Product