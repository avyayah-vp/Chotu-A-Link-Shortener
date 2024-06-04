const crypto = require('crypto');
const db = require('../config/db').get();

module.exports = {
    shortenUrl: function(originalUrl) {

        // console.log('shortenUrl', originalUrl);
        const hash = crypto.createHash('md5').update(originalUrl + new Date().getTime()).digest('hex');
        const shortUrl = 'http://localhost:8000/' + hash.slice(0, 8);
    
        const query = 'INSERT INTO urls (original_url, short_url) VALUES (?, ?)';
        return db.promise().query(query, [originalUrl, shortUrl])
            .then(([rows, fields]) => {
                console.log('Short URL saved to database');
                return shortUrl;
            })
            .catch(err => {
                console.error(err);
                throw err;
            });
    },

    getUrls: function() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM urls';
            db.query(query, function(err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    
    
    getOriginalUrl: function(shortUrl) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT original_url FROM urls WHERE short_url = ?';
            db.query(query, ['http://localhost:8000/'+shortUrl], function(err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else if (results.length > 0) {
                    resolve(results[0].original_url);
                } else {
                    reject(new Error('URL not found'));
                }
            });
        });
    }
    
};
