require ('dotenv').config();

const express = require('express');
const app = express();
const db =  require('./config/db');
const routes = require('./routes/shorten');
const cors = require('cors');

db.connect();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use('/',routes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});