const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

const registrarEmpleado = async (req, res) => {
    const { nombre, correo, departamento, puesto, contrasena, confContrasena } = req.body;

    // Validaciones básicas
    if (!nombre || !correo || !departamento || !puesto || !contrasena || !confContrasena) {
        return res.render('login', {
            title: 'Registro Empleado',
            errores: ['Todos los campos son obligatorios'],
            mensajeExito: null
        });
    }

    if (contrasena !== confContrasena) {
        return res.render('login', {
            title: 'Registro Empleado',
            errores: ['Las contraseñas no coinciden'],
            mensajeExito: null
        });
    }

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ where: { correo } });

        if (usuarioExistente) {
            return res.render('login', {
                title: 'Registro Empleado',
                errores: ['El correo ya está registrado'],
                mensajeExito: null
            });
        }

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        // Crear el usuario primero (sin número de empleado aún)
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            departamento,
            puesto,
            contrasena: hashedPassword,
            rol: 'empleado'
        });

        // Generar número de empleado (por ejemplo, EMP00001)
        const numeroEmpleado = 'EMP' + nuevoUsuario.id.toString().padStart(5, '0');

        // Actualizar usuario con número de empleado
        await nuevoUsuario.update({ numeroEmpleado });

        // Confirmación
        req.session.mensajeExito = '¡Registro exitoso! Ya puedes iniciar sesión.';
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        res.render('login', {
            title: 'Registro Empleado',
            errores: ['Error al registrar empleado'],
            mensajeExito: null
        });
    }
};

module.exports = registrarEmpleado;
