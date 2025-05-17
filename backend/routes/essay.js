const express = require('express');
const { AddEssay, GetYourEssays, GetThemeEssays, GetUserEssay, CorrectEssay } = require('../controllers/essay');
const router = express.Router();

router.post('/add', AddEssay);
router.get('/mine', GetYourEssays);
router.post('/bytheme', GetThemeEssays);
router.get('/:user/:tema', GetUserEssay);
router.post('/correct', CorrectEssay);

module.exports = router;