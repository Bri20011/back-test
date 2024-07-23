
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs')
const ADAMS_PAY_URL = 'https://staging.adamspay.com/api/v1/debts';

module.exports = function (dbInyectada) {
  let db = dbInyectada;
  if (!db) {
    db = require('../../DB/mysql');
  }

  async function iniciarPago(body) {
    const {items_id, precio, cliente, razon_social, ruc, amount, description } = body;

    // Inserta los datos en la base de datos
    const venta = {
      items_id,
      estado: 'pending',
      precio,
      cantidad: amount,
      cliente,
      razon_social,
      ruc
    };

    const respuesta = await db.agregar('venta', venta);
    const insertId = respuesta.insertId;

    // Procesa el pago
    const docId = uuidv4();
    const startDate = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
    const endDate = dayjs(dayjs().add(1, 'day')).format('YYYY-MM-DDTHH:mm:ssZ');

    const datos = {
      "debt": {
        "docId": docId,//calcular aqui
        "amount": {
          "currency": "PYG", //Estatico
          "value": amount //front OK
        },
        "label": description,//front OK
        "target": {
          "type": "ruc",//Estatico - Se podria crear un formulario que se active al agregar carrito
          "number": "999999-0",//Estatico - Se podria crear un formulario que se active al agregar carrito
          "label": "ACME Corporationp"//Estatico - Se podria crear un formulario que se active al agregar carrito
        },
        "validPeriod": {
          "start": startDate,//calcular en el back
          "end": endDate,//calcular en el back (sumar 1 dia)
        },
        "objStatus": {
          "status": "success",//Estatico
        }
      }
    }
    //console.log('BODY AQUI', JSON.stringify(body))


    return fetch(ADAMS_PAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'ap-419de53724a94b5f2312c3e2',
        'accept': 'application/json',
        // 'x-if-exists': 'x-if-exists'

      },
      body: JSON.stringify(
        datos
      )
    })
      .then(response => response.json())
      .then(data => {
        console.log('data aqui: ', data)
        const paymentData = data;
        const payUrl = paymentData.debt.payUrl;
        const respuesta = {
          payUrl,
          paymentData

        }
        return respuesta
      })

  }



  return {
    iniciarPago,
  }
};

