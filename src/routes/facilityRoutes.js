const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('manager'), facilityController.createFacility);
router.get('/', facilityController.getAllFacilities);
router.get('/available-slots', facilityController.getAvailableSlots);
router.get('/:id', facilityController.getFacility);
router.put('/:id', auth, roleCheck('manager'), facilityController.updateFacility);
router.delete('/:id', auth, roleCheck('manager'), facilityController.deleteFacility);

module.exports = router;
