const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('manager'), offerController.createOffer);
router.get('/', offerController.getAllOffers);
router.get('/active', offerController.getActiveOffers);
router.put('/:id', auth, roleCheck('manager'), offerController.updateOffer);
router.delete('/:id', auth, roleCheck('manager'), offerController.deleteOffer);

module.exports = router;
