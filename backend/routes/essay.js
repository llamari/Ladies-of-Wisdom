const express = require('express');
const { AddEssay, GetYourEssays } = require('../controllers/essay');
const router = express.Router();

router.post('/add', AddEssay);
router.get('/mine', GetYourEssays);

module.exports = router;