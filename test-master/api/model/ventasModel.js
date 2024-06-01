const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../middlewares/databaseMiddleware')

class Ventas extends Model {}

Ventas.init(
  {
    VentasID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CantidadCartonesHuevosMedianos: {
      type: DataTypes.INTEGER
    },
    CantidadCartonesHuevosGrandes: {
      type: DataTypes.INTEGER
    },
    CantidadCartonesHuevosExtraGrandes: {
      type: DataTypes.INTEGER
    },
    CantidadCartonesHuevosJumbo: {
      type: DataTypes.INTEGER
    },
    Fecha: {
      type: DataTypes.DATE
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2)
    }
  },
  {
    sequelize,
    modelName: 'Ventas',
    timestamps: false
  }
)

module.exports = Ventas
