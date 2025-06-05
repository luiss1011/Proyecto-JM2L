const express = require('express');
const app = express()
const port = 3000
const login = require('./routes/login')
const adminRutas = require('./routes/adminRutas')
const empleadoRutas = require('./routes/empleadoRutas')
const solicitudesRH = require('./routes/solicitudesRH');
const solicitudesServicios = require('./routes/solicitudesServicios');
const db = require('./config/db') // Importamos la base de datos
const session = require('express-session');
const Usuario = require('./models/usuarioModel');
const SolicitudRH = require('./models/solicitudRH');
const SolicitudServiciosGenerales = require('./models/solicitudServicios');


Usuario.hasMany(SolicitudRH, { foreignKey: 'usuarioId' });
SolicitudRH.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(SolicitudServiciosGenerales, { foreignKey: 'usuarioId' });
SolicitudServiciosGenerales.belongsTo(Usuario, { foreignKey: 'usuarioId' });


app.use(session({
    secret: 'miSecretoUltraSeguro',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // cambia a true si usas HTTPS
}));

app.use(express.static('public'))
app.use(express.json())


db.authenticate() //metodo
.then(() => console.log('Conexión exitosa')) 
.catch(error => console.log('Error de conexión', error))

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use('/', login);
app.use('/admin', adminRutas); 
app.use('/empleado', empleadoRutas);
app.use('/solicitud/rh', solicitudesRH);
app.use('/solicitud/servicios', solicitudesServicios);




app.listen(port,()=>{ // Iniciamos el servidor en el puerto definido
    console.log(`El servidor esta corriendo en el puerto ${port}`) // Mostramos un mensaje en la consola
})
