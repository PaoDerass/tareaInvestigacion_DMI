const { DataTypes } = require('sequelize');
const sequelize = require('../Conexion/conexion');

const Tareas = sequelize.define('Tareas', {
    IdTarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DescripcionTarea: {
        type: DataTypes.STRING
    },
    Responsable: {
        type: DataTypes.STRING
    },
    
    RutaImagen: {
        type: DataTypes.STRING,
        allowNull: true 
    }
}, {
    tableName: 'Tareas',
    timestamps: false
});

module.exports = Tareas;