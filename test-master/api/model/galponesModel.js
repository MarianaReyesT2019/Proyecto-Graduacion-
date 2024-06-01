const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../middlewares/databaseMiddleware')

class Galpones extends Model {}

Galpones.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre_galpon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CantidadGallinas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Galpones',
    timestamps: false
  }
)

module.exports = Galpones
