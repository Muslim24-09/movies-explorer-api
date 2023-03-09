const router = require('express').Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { validateChangeUserInfo } = require('../utils/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validateChangeUserInfo, updateUser);

module.exports = router;
