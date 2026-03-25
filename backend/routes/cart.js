const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
    res.json({ message: 'Get cart' });
});

router.post('/add', (req, res) => {
    res.json({ message: 'Item added' });
});

module.exports = router;
