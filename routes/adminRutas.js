// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { soloAdmin } = require('../middleware/authMiddleware'); // Middleware de autorización

// Ruta: GET /admin/ (protegida solo para admin)
router.get('/', soloAdmin, (req, res) => {
    res.render("admin", { title: "Admin" });
});


module.exports = router;