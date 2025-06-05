const sequalize = require('sequelize');
const db = require('../config/db');

const SolicitudServiciosGenerales = db.define('SolicitudServiciosGenerales', {
    id: {
        type: sequalize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuarioId: {
        type: sequalize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: sequalize.ENUM('chofer', 'mantenimiento', 'proveedor'),
        allowNull: false
    },
    comentarios: {
        type: sequalize.TEXT
    },
    documento: {
        type: sequalize.BLOB('long'),
        allowNull: true
    },
    fecha_solicitud: {
        type: sequalize.DATE,
        defaultValue: sequalize.NOW
    },

    // Chofer y Proveedor
    fecha_salida_c: {
        type: sequalize.DATEONLY
    },
    hora_salida_c: {
        type: sequalize.TIME
    },
    fecha_regreso: {
        type: sequalize.DATEONLY
    },
    hora_regreso: {
        type: sequalize.TIME
    },

    // Mantenimiento
    modelo_vehiculo: {
        type: sequalize.STRING
    },
    marca_vehiculo: {
        type: sequalize.STRING
    },
    numero_seguro: {
        type: sequalize.STRING
    },
    numero_poliza: {
        type: sequalize.STRING
    },
    fecha_servicio: {
        type: sequalize.DATEONLY
    },
    

    // Proveedor
    importancia: {
        type: sequalize.ENUM('Alta', 'Media', 'Baja')
    },
    nombre_proveedor: {
        type: sequalize.STRING
    },
    telefono_proveedor: {
        type: sequalize.STRING
    },
    fecha_asistencia: {
        type: sequalize.DATEONLY
    },
    hora_entrada_p: {
        type: sequalize.TIME
    },
    hora_salida_p: {
        type: sequalize.TIME
    },
    restricciones: {
        type: sequalize.TEXT
    }
}, {
    tableName: 'solicitudes_servicios_generales',
    timestamps: false
});

module.exports = SolicitudServiciosGenerales;