const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

//moviesRouter import:
const moviesRouter = require('./routers/moviesRouter');

//middlewares import:
const notFound = require('./middlewares/notFound.js');
const errorsHandler = require('./middlewares/errorsHandler.js');

//=======================================

//server root:
app.get('/', (req, res) => {
   res.send('Entrypoint del server')
})

//movies root:
app.use('/api/movies', moviesRouter);

//=======================================

//use errors handler middleware:
app.use(errorsHandler);
//use error 404 handler middleware:
app.use(notFound);

app.listen(port, () => {
   console.log(`server in ascolto alla porta ${port}`)
})