const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

const { Op } = require('sequelize'); // Agrega esto arriba

const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Login admin especial
        if (correo === 'admin@admin.com' && contrasena === '123456789') {
            req.session.usuario = {
                correo,
                rol: 'admin'
            };
            return res.redirect('/admin');
        }

        // Buscar por correo o número de empleado
        const usuario = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { correo: correo },
                    { numeroEmpleado: correo } // usamos "correo" porque es el input
                ]
            }
        });

        if (!usuario) {
            return res.render('login', {
                title: 'Login',
                errores: ['Correo, número de empleado o contraseña incorrectos']
            });
        }

        const coincide = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!coincide) {
            return res.render('login', {
                title: 'Login',
                errores: ['Correo, número de empleado o contraseña incorrectos']
            });
        }

        // Guardar sesión
        req.session.usuario = {
            id: usuario.id,
            numeroEmpleado: usuario.numeroEmpleado,
            nombre: usuario.nombre,
            correo: usuario.correo,
            departamento: usuario.departamento,
            puesto: usuario.puesto,
            rol: usuario.rol
        };

        // Redirección por rol
        switch (usuario.rol) {
            case 'admin':
                return res.redirect('/admin');
            case 'empleado':
                return res.redirect('/empleado');
            default:
                return res.redirect('/login');
        }

    } catch (error) {
        console.error(error);
        res.render('login', {
            title: 'Login',
            errores: ['Ocurrió un error al iniciar sesión']
        });
    }
};


module.exports = loginUsuario;
