const express = require('express');
const router = express.Router();
const { singIn, signUp } = require('../controller/userController');

router.get('/', (req, res) => {
    res.send('test');
})

router.post('/signin', singIn);
router.post('/signup', signUp);

module.exports = router;