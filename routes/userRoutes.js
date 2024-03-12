const express = require('express');

const router = express.Router();

const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { getAllUsers, getUser } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUser);

module.exports = router;
