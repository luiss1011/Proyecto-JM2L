const sequalize = require('sequelize');
const db = require('../config/db');

const modeloUsuario = db.define('usuarios', {
  id: {
    type: sequalize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numeroEmpleado: {
    type: sequalize.STRING(10),
    allowNull: true,
    unique: true
  },  
  nombre: { 
    type: sequalize.STRING(100), 
    allowNull: false 
  },
  correo: { 
    type: sequalize.STRING(100), 
    allowNull: false, 
    unique: true 
  },
  departamento: {
    type: sequalize.ENUM('TI', 'Recursos Humanos', 'Finanzas', 'Marketing', 'Operaciones', 'Servicios Generales', 'Sistemas'),
    allowNull: true
  },
  puesto: {
    type: sequalize.STRING(50),
    allowNull: true  
  },
  contrasena: { 
    type: sequalize.STRING(255), 
    allowNull: false 
  },
  rol: {
    type: sequalize.ENUM('empleado', 'gerente_rh', 'gerente_servicios', 'gerente_sistemas', 'admin'),
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: false
});

module.exports = modeloUsuario;
