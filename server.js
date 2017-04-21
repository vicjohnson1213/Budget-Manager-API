var fs = require('fs'),
    http = require('http'),
    // https = require('https'),

    passport = require('passport'),
    express = require('express'),
    bodyParser = require('body-parser'),

    api = require('./controllers/versions'),
    db = require('./data/db'),

    app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api', api);

var httpServer = http.createServer(app);

httpServer.listen(3000);
