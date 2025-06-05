const express = require('express');
const router = express.Router();
const loginUsuario = require('../controllers/loginController');
const registrarEmpleado = require('../controllers/registroEmpleadoController');

// Ruta: GET /login
router.get('/login', (req, res) => {
    console.log('Session en /login:', req.session);

    if (req.session.usuario) {
        const rol = req.session.usuario.rol;
        if (rol === 'admin') return res.redirect('/admin');
        if (rol === 'empleado') return res.redirect('/empleado');
        // Puedes agregar otros roles aquí
    }

    const mensajeExito = req.session.mensajeExito;
    req.session.mensajeExito = null;

    res.render('login', {
        title: 'Login / Registro Empleado',
        errores: [],
        mensajeExito
    });
});

// Ruta: GET /logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/index.html');
        }
        res.clearCookie('connect.sid');
        res.redirect('/index.html');
    });
});

// Ruta: POST /registro
router.post('/registro', registrarEmpleado);

// Ruta: POST /login
router.post('/login', loginUsuario);

module.exports = router;
