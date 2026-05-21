const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.post('/profile/image', auth, upload.single('profileImage'), userController.uploadProfileImage);
router.delete('/profile/image', auth, userController.removeProfileImage);
router.get('/', auth, roleCheck('manager'), userController.getAllUsers);
router.get('/role/:role', auth, userController.getUsersByRole);
router.put('/:id', auth, roleCheck('manager'), userController.updateUser);
router.delete('/:id', auth, roleCheck('manager'), userController.deleteUser);

module.exports = router;
