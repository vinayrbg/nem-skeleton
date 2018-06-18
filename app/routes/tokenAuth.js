module.exports = function (app) {

  app.get('/getToken', (req, res) => {
    console.log("Works");
    let crypto;
    try {
      crypto = require('crypto');

      res.status(200).send(crypto.randomBytes(16).toString('hex'));
    } catch (err) {
      console.log('crypto support is disabled!');
    }
  })


    app.get('/test', (req, res) => {
      res.status(200).send("works");
    })
};
