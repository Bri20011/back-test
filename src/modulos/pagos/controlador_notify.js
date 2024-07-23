
const fetch = require('node-fetch');



async function notify(req, res) {
  const { notify } = req.body;
  console.log('notify AQUI:', notify)
  const body = {

  }
  res.status(200).send('Notification received');
}

module.exports = {
  notify,
};


