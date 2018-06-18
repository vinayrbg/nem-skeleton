const excelsheet = require("../controllers/excelsheet.controller.js");

module.exports = function (app, router, logger) {

  app.route('/excelsheet')
  .get(excelsheet.makeFile);
};