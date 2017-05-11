var fs = require('fs'),
    http = require('http'),

    passport = require('passport'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),

    api = require('./controllers/versions'),
    db = require('./data/db'),

    app = express();

var port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/passport');

app.use('/api', api);

var httpServer = http.createServer(app);

httpServer.listen(3000);
