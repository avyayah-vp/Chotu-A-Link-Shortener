require('dotenv').config(); 

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = {
    connect: function() {
        connection.connect(function(err) {
            if (err) throw err;
            console.log('Connected to the database');
        });
    },
    get: function() {
        return connection;
    }
};
