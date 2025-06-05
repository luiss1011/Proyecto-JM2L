const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const conexion = require('../config/db');
const SolicitudRH = require('../models/solicitudRH');

// Configuración de multer para archivos
const storage = multer.diskStorage({
    destination: './uploads/', // carpeta para guardar
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // nombre único
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Solo acepta el campo 'documento' y archivos específicos si es necesario
        if (file.fieldname === 'documento') {
            cb(null, true);
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname), false);
        }
    }
});


router.post('/vacaciones', upload.single('documento'), async (req, res) => {
    try {
        const { fechaInicio, fechaFin, comentarios, usuarioId } = req.body;
        const documento = req.file ? req.file.filename : null;

        const nuevaSolicitud = await SolicitudRH.create({
            tipo: 'vacaciones',
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            comentarios,
            documento,
            estatus: 'pendiente',
            usuarioId
        });

        res.redirect('/empleado?mensaje=Solicitud enviada correctamente');
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.redirect('/empleado?error=Ocurrió un error al enviar la solicitud');

    }
});

router.post('/incapacidad', upload.single('documento'), async (req, res) => {
    try {
        const { fechaInicio, fechaFin, comentarios, usuarioId } = req.body;
        const documento = req.file ? req.file.filename : null;

        const nuevaSolicitud = await SolicitudRH.create({
            tipo: 'incapacidad',
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            comentarios,
            documento,
            estatus: 'pendiente',
            usuarioId
        });

        res.redirect('/empleado?mensaje=Solicitud enviada correctamente');
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.redirect('/empleado?error=Ocurrió un error al enviar la solicitud');
;
    }
});


router.post('/permisos', upload.single('documento'), async (req, res) => {
    try {
        const { fechaInicio, fechaFin, comentarios, usuarioId } = req.body;
        const documento = req.file ? req.file.filename : null;

        const nuevaSolicitud = await SolicitudRH.create({
            tipo: 'permiso_personal',
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            comentarios,
            documento,
            estatus: 'pendiente',
            usuarioId
        });

        res.redirect('/empleado?mensaje=Solicitud enviada correctamente');
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.redirect('/empleado?error=Ocurrió un error al enviar la solicitud');
    }
});

module.exports = router;
