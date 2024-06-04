const express = require('express');
const router = express.Router();
const urlService = require('../services/urlService');

router.post('/shorten', async (req, res) => {
    const originalUrl = req.body.link;
    const shortUrl = await urlService.shortenUrl(originalUrl);
    res.json({ shortUrl });
});

router.get('/urls', async (req, res) => {
    try {
        const urls = await urlService.getUrls();
        res.json({ urls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    try {
        const originalUrl = await urlService.getOriginalUrl(shortUrl);
        res.redirect(originalUrl);
    } catch (error) {
        res.status(404).json({ message: 'Short URL not found' });
    }
});


module.exports = router;
