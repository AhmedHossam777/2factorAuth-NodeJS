const User = require('../model/User');

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ status: 'fail', message: 'No users found' });
  }
  res.status(200).json({ status: 'success', users });
};

const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }
  res.status(200).json({ status: 'success', user });
};

const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }
  user.username = req.body.username;
  user.email = req.body.email;

  await user.save();

  res.status(200).json({ status: 'success', user });
};

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: 'success', message: 'User deleted' });
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
