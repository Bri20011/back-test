const express = require('express');
const router = express.Router();
const respuesta = require('../../red/respuestas');
const constrolador = require('./index');
const { notify } = require('./controlador_notify');


router.post('/iniciar', iniciarPago);
router.post('/notify', notify);

async function iniciarPago(req, res, next) {
    try {

        const respu = await constrolador.iniciarPago(req.body);
        console.log('respu AQUI:', respu);
        respuesta.success(req, res, respu, 201);
    } catch (err) {
        next(err);
    }

};

module.exports = router;