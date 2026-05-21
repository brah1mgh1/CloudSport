const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', feedbackController.createFeedback);
router.get('/', auth, roleCheck('manager'), feedbackController.getAllFeedback);
router.delete('/:id', auth, roleCheck('manager'), feedbackController.deleteFeedback);

module.exports = router;
