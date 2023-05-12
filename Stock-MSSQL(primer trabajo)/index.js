const express = require('express');
const routes = require('./routes');
jwt = require('jsonwebtoken');
token = require('./config/token');
const cors = require('cors');

const app = express();
const port = 3002;

app.set('key', token.key);
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => { res.send('api-mssql'); });
routes(app);
app.listen(port, () => { console.log('uploaded server in ' +  port) });