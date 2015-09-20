var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.port || 8080;
var User = require('./app/models/user');

mongoose.connect('mongodb://localhost:27017/myDatabase');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

app.use(morgan('dev'));

app.get('/', function(req, res){
  res.send('Welcome to the home page');
});

var apiRouter = express.Router();

apiRouter.use(function(req, res, next){
  console.log('hello app');
  next();
});

apiRouter.get('/', function(req, res){
  res.json({message: 'welcome to the API!'});
});

apiRouter.route('/users')
  .post(function(req, res){
    var user = new User();
    user.name = req.body.username;
    user.password = req.body.password;
  })


app.use('/api', apiRouter);

app.listen(port);
console.log('Get on the ' + port + ' level.');