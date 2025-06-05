const express = require('express');
const router = express.Router();
const { soloEmpleado } = require('../middleware/authMiddleware'); 

router.get('/', soloEmpleado, (req, res) => {
    const mensaje = req.query.mensaje;
    res.render('empleado', {
      title: 'Empleado',
      empleado: req.session.usuario,
      mensaje
    });
  });

module.exports = router;