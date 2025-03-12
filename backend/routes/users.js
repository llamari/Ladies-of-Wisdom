const express = require('express');
const { SignUp, SignIn, Teste, Master, GetUsers, Delete, ForgotPassword, Verify, NewPassword } = require('../controllers/users');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/master', Master);
router.get('/getall', GetUsers);
router.post('/delete', Delete);
router.post('/password', ForgotPassword);
router.post('/verify', Verify);
router.post('/newpassword', NewPassword);
router.get('/', Teste);

module.exports = router;