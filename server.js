
require('./AWS_CFG')
const middlewares  = require('./middlewares');
const express      = require('express');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const api          = require('./api/index.js');

const app = express();
const PORT = 4000;


app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api); 

app.use(middlewares.notFound);
app.use(middlewares.errorHandler)


app.listen(PORT, () => console.log('server started...'));