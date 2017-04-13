var fs = require('fs'),
    http = require('http'),
    https = require('https'),

    express = require('express'),
    bodyParser = require('body-parser'),
    bearerToken = require('express-bearer-token'),

    api = require('./controllers/versions'),
    db = require('./data/db'),

    app = express();

var privateKey  = fs.readFileSync('sslCert/private.key');
var certificate = fs.readFileSync('sslCert/certificate.pem');

var sslConfig = {
    key: privateKey,
    cert: certificate
};

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(bearerToken());

app.use((req, res, next) => {
    var token = process.env.BUDGET_MANAGER_TOKEN || 'devToken';

    if (req.token && req.token === token) {
        return next();
    }

    res.sendStatus(401);
});

app.use('/api', api);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(sslConfig, app);

httpServer.listen(3000);
httpsServer.listen(3443);
