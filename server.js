var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://heroku_vfw504rw:bjmrfolccnnhu8g37a74am7g4@ds041934.mongolab.com:41934/heroku_vfw504rw');
process.env.APP_SECRET = process.env.APP_SECRET || '43e4ba116b2be2f231ce49aa496b55a22eac91dd32227d7fbf6fbbbf1969f443c2f6c89800de6f739cbcae422fac9d63';

app.use(express.static(__dirname + '/build'));

var categoryRouter = require(__dirname + '/routes/categories_routes');
var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/api', categoryRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server up on port: ' + port);
});