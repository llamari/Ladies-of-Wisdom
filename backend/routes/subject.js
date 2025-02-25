const express = require('express');
const router = express.Router();
const { GetSubjects } = require('../controllers/subject');

router.get('/subject', GetSubjects);

module.exports = router