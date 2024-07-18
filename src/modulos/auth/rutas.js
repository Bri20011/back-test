const express = require('express');

const respuesta = require('../../red/respuestas');
const constrolador = require('./index');


const router = express.Router();

router.get('/login',login);

 async function login(req, res, next){
  try{
    const token = await constrolador.login(req.body.usuario, req.body.password);
    respuesta.success(req, res, token, 200)
   }catch(err){
    next(err);
}
};
module.exports = router;