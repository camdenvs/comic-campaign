// const { Schema, model } = require('mongoose')
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const dateFormat = require('../utils/dateFormat')

// const campaignSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     goalAmount: {
//         type: Number,
//         required: true
//     },
//     goalDate: {
//         type: String,
//         required: true
//     },
//     earned: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     investorCount: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     isActive: {
//         type: Boolean,
//         required: true,
//         default: true
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (timestamp) => dateFormat(timestamp),
//     }
// })

class Campaign extends Model { }

Campaign.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        goalDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        earned: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        investorCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'campaign',
    }
)

// const Campaign = model('Campaign', campaignSchema)

module.exports = Campaign