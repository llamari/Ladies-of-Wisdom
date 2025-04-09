const express = require('express');
const { AddEssay, GetYourEssays, GetThemeEssays } = require('../controllers/essay');
const router = express.Router();

router.post('/add', AddEssay);
router.get('/mine', GetYourEssays);
router.post('/bytheme', GetThemeEssays);

module.exports = router;