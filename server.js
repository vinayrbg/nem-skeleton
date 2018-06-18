const logger = require('./app/_log/logger_def.js');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./_config');

const router = express.Router();
const app = express();

var port = process.env.PORT || 8080;

if(app.settings.env){
  console.log("Application Environment : " + app.settings.env);
}else{
  logger.error("Application Environment not set.")
}

//setup body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

//Enabling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//create DB connection
mongoose.connect(config.mongoURI[app.settings.env]);
mongoose.connection.on('error', (err) => {
  //if conenction fails
  console.log("\n");
  logger.error(err.message);
});
mongoose.connection.once('open',  () => {
  logger.info("Connected to the DB at : " + config.mongoURI[app.settings.env]);
});


app.get('/', function(req, res){
  logger.info("Server Root");
  res.send("Server Root");
});

require('./app/routes/employee.routes.js')(app, router, logger);
require('./app/routes/guest.routes.js')(app, router, logger);
require('./app/routes/excelExport.routes.js')(app, router, logger);

app.listen(port);
console.log("Started listening on : " + port);
