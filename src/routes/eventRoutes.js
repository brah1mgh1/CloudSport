const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('manager', 'leader'), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.put('/:id', auth, roleCheck('manager'), eventController.updateEvent);
router.delete('/:id', auth, roleCheck('manager'), eventController.deleteEvent);

module.exports = router;
