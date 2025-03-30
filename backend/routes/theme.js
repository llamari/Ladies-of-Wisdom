const express = require('express');
const { GetThemes, AddTheme, GetTheme } = require('../controllers/theme');
const router = express.Router();

router.get('/', GetThemes);
router.post('/add', AddTheme);
router.get('/get/:id', GetTheme);

module.exports = router;