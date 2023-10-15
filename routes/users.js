const router = require('express').Router();
const { userInfoValidator } = require('../middlewares/validators');

const {
  updateUserProfile,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo); // возвращает информацию о пользователе (email и имя)
router.patch('/me', userInfoValidator, updateUserProfile); // обновляет информацию о пользователе (email и имя)

module.exports = router;
