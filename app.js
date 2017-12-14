const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Database } = require('mongorito');

const index = require('./routes/index');
const api = require('./routes/api');

const postController = require('./controllers/post-controller');
const userController = require('./controllers/user-controller');

const app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.user('/api', api);

app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function connectDatabase () {
    const database = new Database(process.env.DATABASE);
    return database.connect();
}

function initSocketTransmission (socket) {
    socket.on('user.connection', userController.saveUser);
    socket.on('post.publish', post => postController.storePost(post));
}

module.exports = { app, connectDatabase, initSocketTransmission };
