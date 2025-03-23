const express = require('express');
const { GetThemes, AddTheme } = require('../controllers/theme');
const router = express.Router();

router.get('/', GetThemes);
router.post('/add', AddTheme);

module.exports = router;