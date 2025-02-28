const express = require('express');
const { SignUp, SignIn, Teste, Master } = require('../controllers/users');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/master', Master);
router.get('/', Teste);

module.exports = router;