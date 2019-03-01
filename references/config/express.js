const app = require('express')();
const bodyParser = require('body-parser');
const consign = require('consign');
const apiRoutes = require('./apiRoutes.json');

for(r in apiRoutes) app.set(r, apiRoutes[r]);

app.use(bodyParser.json());

consign({ cwd : 'app' })
    .include('helpers')
    .then('errors')
    .then('models')
    .then('api')
    .then('routes')
    .then('swagger')
    .into(app);

module.exports = app;