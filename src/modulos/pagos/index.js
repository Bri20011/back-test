const db = require('../../DB/mysql');
//const ctrl = require('./controlador_notify');
const ctr2 = require('./controlador');

//module.exports = ctrl(db);
module.exports = ctr2(db);
