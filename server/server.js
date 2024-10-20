const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./config/connectToDb');
const  router  = require('./router/router');
require('dotenv').config();


const app = express();
const port = process.env.port;

app.use(cors);

app.use(express.json());

connectToDb();

app.use('/cinisuggest/api/v1/', router);


app.listen(port , () => {
    console.log(`the server is running on port:${port}`);
})
