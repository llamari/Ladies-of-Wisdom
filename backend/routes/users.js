const express = require('express');
const { SignUp, SignIn } = require('../controllers/users');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/', res.send("API do Ladies of Wisdom está rodando no /users 🚀"))

module.exports = router;