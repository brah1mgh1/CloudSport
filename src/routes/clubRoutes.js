const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('manager'), clubController.createClub);
router.get('/', clubController.getAllClubs);
router.get('/:id', clubController.getClub);
router.put('/:id', auth, roleCheck('manager'), clubController.updateClub);
router.delete('/:id', auth, roleCheck('manager'), clubController.deleteClub);

module.exports = router;
