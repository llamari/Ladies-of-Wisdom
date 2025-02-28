const express = require('express');
const { CreateTask, GetTask } = require('../controllers/task');
const { upload } = require('../config/cloudinary');
const router = express.Router()

router.post('/add', CreateTask);
router.get('/:id', GetTask);
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.json({ success: true, url: req.file.path });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;