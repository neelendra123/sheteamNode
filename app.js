var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var passport = require('passport');

var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');
let cors = require('cors');

var app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(passport.initialize());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.set("port", process.env.PORT || 3005);

// Setup Connection to DB
exports.db = mongoose
  .connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("Mongo Connection Successfull"))
  .catch((err) => console.error(err, "> error occurred from the database"));
  
app.listen(process.env.PORT, () => {
  console.log(
    "App is running at http://localhost: %s in %s mode",
    process.env.PORT,
    process.env.NODE_ENV
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
