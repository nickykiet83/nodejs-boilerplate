var express = require('express');
var bodyParser = require('body-parser');
var secret = require('./config/secret');
var engine = require('ejs-mate');
var app = express();

//middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//register routes
var mainRoutes = require('./routes/main');


app.use(mainRoutes);

app.listen(secret.port, (err) => {
  if (err) throw err;
  console.log(`Server is Running at port: ${secret.port}`);
})

