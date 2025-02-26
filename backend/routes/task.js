const express = require('express');
const { CreateTask, GetTask } = require('../controllers/task');
const router = express.Router()

router.post('/add', CreateTask);
router.get('/:id', GetTask);

module.exports = router;