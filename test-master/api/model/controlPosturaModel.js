const { Model, DataTypes } = require('sequelize') // Importing modules
const { sequelize } = require('../middlewares/databaseMiddleware')

class ControlPosturas extends Model {} // Define a class named Users that extends the Sequelize

// Initialize the Users model with specific atributes
ControlPosturas.init(
  {
    ControlPosturaID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CantidadHuevosMedianos: {
      type: DataTypes.INTEGER
    },
    CantidadHuevosGrandes: {
      type: DataTypes.INTEGER
    },
    CantidadHuevosExtraGrandes: {
      type: DataTypes.INTEGER
    },
    CantidadHuevosJumbo: {
      type: DataTypes.INTEGER
    },
    CantidadHuevosQuebrados: {
      type: DataTypes.INTEGER
    },
    FechaRecoleccion: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'ControlPostura',
    timestamps: false
  }
)

module.exports = ControlPosturas
