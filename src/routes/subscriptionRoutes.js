const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/my', auth, subscriptionController.getMySubscriptions);
router.get('/', auth, roleCheck('manager'), subscriptionController.getAllSubscriptions);

module.exports = router;
