const express = require('express');
const app = express();

const { config } = require('./config/index');
const movieApi = require('./routes/moviesRoute');
const shopApi = require('./routes/shopRoute');
const branchOfficeApi = require('./routes/branchOfficeRoute');
const clientApi = require('./routes/clientRoute');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandler');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

//rutas
movieApi(app);
shopApi(app);
branchOfficeApi(app);
clientApi(app);

//catch 404
app.use(notFoundHandler);

//middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});