const sequalize = require('sequelize');
const db = require('../config/db');

const SolicitudRH = db.define('SolicitudRH', {
      id: {
        type: sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: sequalize.ENUM('vacaciones', 'incapacidad', 'permiso_personal'),
        allowNull: false
      },
      fecha_inicio: {
        type: sequalize.DATEONLY,
        allowNull: false
      },
      fecha_fin: {
        type: sequalize.DATEONLY,
        allowNull: false
      },
      comentarios: {
        type: sequalize.TEXT,
        allowNull: true
      },
      documento: {
        type: sequalize.BLOB('long'),
        allowNull: true
      },
      estatus: {
        type: sequalize.ENUM('pendiente', 'autorizada', 'rechazada'),
        defaultValue: 'pendiente'
      },
      usuarioId: {
        type: sequalize.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'solicitudes_rh',
      timestamps: true,
      createdAt: 'creado_en',
      updatedAt: false
    });
  
module.exports = SolicitudRH;
