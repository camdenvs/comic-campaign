const { Schema, model } = require('mongoose')
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

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
        }

    }
)

const News = model('News', newsSchema)

// * The following commented code blocks are for the former MySQL model

// class News extends Model {}

// News.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         body: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         createdAt: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW
//         }
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'news',
//     }
// )

module.exports = News