const express = require('express');

const seguridad = require('./seguridad')
const respuesta = require('../../red/respuestas');
const constrolador = require('./index');
//const { agregar } = require('../../DB/mysql');

const router = express.Router();

router.get('/',seguridad(),todos);
router.get('/:id',seguridad(),uno);
router.post('/',seguridad(), agregar);
router.put('/', seguridad(), eliminar);

 async function todos(req, res, next){
    try{
        const items = await constrolador.todos()
        respuesta.success(req, res, items, 200)
      }catch(err){
        next(err);
    }

};

 async function uno(req, res, next){
  try{
    const items = await constrolador.uno(req.params.id);
    respuesta.success(req, res, items, 200)
   }catch(err){
    next(err);
}
};
async function agregar(req, res, next){
    try{
      const items = await constrolador.agregar(req.body);
      if (req.body.id == 0){
         mensaje = 'Item guardado con exito';
      } else {
        mensaje = 'Item actualizado con exito'
      }
      respuesta.success(req, res, mensaje, 201);
     }catch(err){
      next(err);
  }
  };

async function eliminar(req, res, next){
    try{
      const items = await constrolador.eliminar(req.body);
      respuesta.success(req, res, 'Items eliminado satisfactoriamente', 200);
     }catch(err){
      next(err);
  }
  };

module.exports = router;