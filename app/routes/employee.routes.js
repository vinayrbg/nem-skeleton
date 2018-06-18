const employeeController = require("../controllers/employee.controller.js");

module.exports = function (app, router, logger) {

  app.route('/employees')
  .get(employeeController.list)
  .post(employeeController.create);

  app.route('/employees/:emp_id')
  .get(employeeController.find);

  app.route('/employees/:emp_id/checkIn')
  .put(employeeController.checkIn);

  app.route('/employees/:emp_id/checkOut')
  .put(employeeController.checkOut);

  app.route('/employees/:emp_id/lunchIn')
  .put(employeeController.lunchIn);

  app.route('/employees/:emp_id/lunchOut')
  .put(employeeController.lunchOut);

};
