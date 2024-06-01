const { Model, DataTypes } = require('sequelize') // Importar módulos
const { sequelize } = require('../middlewares/databaseMiddleware') // Importar la instancia de sequelize

class Bodega extends Model {}

Bodega.init(
  {
    BodegaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Identity (1,1) equivalente
      primaryKey: true
    },
    CartonesHuevosMedianos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CartonesHuevosGrandes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CartonesHuevosExtraGrandes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CartonesHuevosJumbo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CartonesHuevosQuebrados: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CantidadSacosConcentrado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FechaRecoleccion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Bodega',
    timestamps: false
  }
);

module.exports = Bodega
