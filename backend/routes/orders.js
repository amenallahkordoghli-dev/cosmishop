const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
    res.json({ message: 'Get orders' });
});

router.post('/create', (req, res) => {
    res.json({ message: 'Order created' });
});

module.exports = router;
