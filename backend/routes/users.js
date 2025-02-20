const express = require('express');
const { SignUp, SignIn } = require('../controllers/users');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);

module.exports = router;