function protegerRutaPorRol(rol) {
    return (req, res, next) => {
        if (req.session.usuario?.rol === rol) return next();
        return res.redirect('/login');
    };
}

module.exports = {
    soloAdmin: protegerRutaPorRol('admin'),
    // soloSI: protegerRutaPorRol('si'),
    // soloRH: protegerRutaPorRol('recursos_humanos'),
    // soloServicios: protegerRutaPorRol('servicios'),
    soloEmpleado: protegerRutaPorRol('empleado')
};
