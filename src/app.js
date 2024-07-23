const express =  require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');
const items = require('./modulos/items/rutas');
const pagos = require('./modulos/pagos/rutas');



const error = require('./red/errors');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/clientes', clientes)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)
app.use('/api/items', items)
app.use('/api/pagos', pagos) // NEW



app.use(error);

module.exports = app;