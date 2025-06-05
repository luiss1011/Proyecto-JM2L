const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SolicitudServiciosGenerales = require('../models/solicitudServicios');

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'documento') {
            cb(null, true);
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname), false);
        }
    }
});

// Solicitud de chofer
router.post('/chofer', upload.single('documento'), async (req, res) => {
    try {
        const { fecha, descripcion, usuarioId } = req.body;
        const documento = req.file ? req.file.filename : null;

        await SolicitudServiciosGenerales.create({
            tipo: 'chofer',
            fecha,
            descripcion,
            documento,
            estatus: 'pendiente',
            usuarioId
        });

        res.redirect('/empleado?mensaje=Solicitud de chofer enviada correctamente');
    } catch (error) {
        console.error('Error al crear solicitud de chofer:', error);
        res.redirect('/empleado?error=Ocurrió un error al enviar la solicitud');
    }
});

// Solicitud de mantenimiento
router.post('/mantenimiento', upload.single('documento'), async (req, res) => {
    try {
        const { fecha, descripcion, usuarioId } = req.body;
        const documento = req.file ? req.file.filename : null;

        await SolicitudServiciosGenerales.create({
            tipo: 'mantenimiento',
            fecha,
            descripcion,
            documento,
            estatus: 'pendiente',
            usuarioId
        });

        res.redirect('/empleado?mensaje=Solicitud de mantenimiento enviada correctamente');
    } catch (error) {
        console.error('Error al crear solicitud de mantenimiento:', error);
        res.redirect('/empleado?error=Ocurrió un error al enviar la solicitud');
    }
});

// Solicitud de proveedores
router.post('/proveedores', upload.single('documento'), async (req, res) => {
    try {
        const { fecha, descripcion, usuarioId } = req.body;
        const documento = req.file ? req.file.filename : null;

        await SolicitudServiciosGenerales.create({
            tipo: 'proveedor',
            fecha,
            descripcion,
            documento,
            estatus: 'pendiente',
            usuarioId
        });

        res.redirect('/empleado?mensaje=Solicitud de proveedor enviada correctamente');
    } catch (error) {
        console.error('Error al crear solicitud de proveedor:', error);
        res.redirect('/empleado?error=Ocurrió un error al enviar la solicitud');
    }
});

module.exports = router;
