const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Campaign extends Model {}

Campaign.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNulle: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goal_amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        goal_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        earned: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        investor_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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

module.exports = Campaign