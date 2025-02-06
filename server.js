const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

//moviesRouter import:
const moviesRouter = require('./routers/moviesRouter');


//=======================================

//server root:
app.get('/', (req, res) => {
   res.send('Entrypoint del server')
})

//movies root:
app.use('/api/movies', moviesRouter);

//=======================================


app.listen(port, () => {
   console.log(`server in ascolto alla porta ${port}`)
})