const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../middlewares/databaseMiddleware')

class Gallinas extends Model {}

Gallinas.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cantidad_gallinas_activas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_gallinas_desactivas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Gallinas',
    timestamps: false
  }
)

module.exports = Gallinas
