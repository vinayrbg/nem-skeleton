const guestController = require("../controllers/guest.controller.js");

module.exports = function (app, router, logger) {

  app.route('/guests')
  .get(guestController.list)
  .post(guestController.create);

  app.route('/guests/:doc_id/checkOut')
  .put(guestController.checkOut)


};
