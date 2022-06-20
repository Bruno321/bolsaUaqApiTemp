const Sequelize = require('sequelize')
const db = require('../config/db')
const Vacantes = require('./Vacantes')

const Empresas = db.define('empresas',{
    empresaId: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreEmpresa: Sequelize.STRING(32),
    password: {type: Sequelize.STRING(32),allowNull: true,},
    descripcion:{type: Sequelize.STRING, allowNull:false},
    ciudad: {type: Sequelize.STRING(32), allowNull:false},
    logo: {type: Sequelize.STRING, allowNull:false},
    rfc: {type: Sequelize.STRING(32), allowNull:false},
    giro: {type: Sequelize.STRING(32), allowNull:false},
    razonSocial: {type: Sequelize.STRING(32), allowNull:false},
    email: {type: Sequelize.STRING(32), allowNull:false},
    telefonoEmpresa: {type: Sequelize.STRING(32), allowNull:false},
    sitioWeb: {type: Sequelize.STRING(32), allowNull:false},
    fechaRegistro: {type: Sequelize.DATEONLY,allowNull: true, defaultValue: Sequelize.NOW},
    direccion: {type: Sequelize.STRING(32), allowNull:false},
    colonia: {type: Sequelize.STRING(32), allowNull:false},
    ciudad: {type: Sequelize.STRING(32), allowNull:false},
    codigoPostal: {type: Sequelize.STRING(32), allowNull:false},
    estado: {type: Sequelize.STRING(32), allowNull:false},
    nombreReclutador: {type: Sequelize.STRING(32), allowNull:false},
    emailReclutador: {type: Sequelize.STRING(32), allowNull:false},
    telefonoReclutador:{type: Sequelize.STRING(32), allowNull:false},
    usuario:{type: Sequelize.STRING(32), allowNull:false},
    status:{type: Sequelize.INTEGER(1),allowNull: true, defaultValue: 2},
})

// Empresas.hasMany(Vacantes, {
//     foreignKey: {
//         name: 'empresaId',
//         allowNull: true
//     }
// })
Vacantes.belongsTo(Empresas, {
    foreignKey: {
        name: 'empresaId',
        allowNull: true
    }
});

module.exports = Empresas