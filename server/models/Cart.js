const { Schema } = require('mongoose')

const cartSchema = new Schema({
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product'
        },
        name: String,
        size: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = cartSchema