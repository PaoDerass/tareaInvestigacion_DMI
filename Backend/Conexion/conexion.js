const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'listatarea', 
    'root',      
    'admin123',  
    {
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        logging: false 
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión establecida en la BD'))
    .catch(er => console.log('Ocurrió un error en la conexión a la BD: ' + er));

module.exports = sequelize;