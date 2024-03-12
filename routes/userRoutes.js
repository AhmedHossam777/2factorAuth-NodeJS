const express = require('express');

const router = express.Router();

const {
  register,
  login,
  forgetPassword,
  resetPassword,
} = require('../controllers/authController');
const auth = require('../middleware/auth');
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/').get(auth, getAllUsers);
router
  .route('/:id')
  .get(auth, getUser)
  .delete(auth, deleteUser)
  .patch(auth, updateUser);

router.route('/forgetPassword').post(forgetPassword);
router.route('/resetPassword').post(resetPassword);

module.exports = router;
