const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('leader'), reservationController.createReservation);
router.get('/', auth, reservationController.getReservations);
router.get('/all', auth, roleCheck('manager'), reservationController.getAllReservations);
router.get('/:id', auth, reservationController.getReservation);
router.put('/approve/:id', auth, roleCheck('manager'), reservationController.approveReservation);
router.put('/deny/:id', auth, roleCheck('manager'), reservationController.denyReservation);
router.put('/cancel/:id', auth, reservationController.cancelReservation);
router.put('/change/:id', auth, roleCheck('leader'), reservationController.requestChange);
router.post('/pay/:id', auth, roleCheck('leader'), reservationController.payReservation);
router.post('/confirm-payment/:id', auth, roleCheck('leader'), reservationController.confirmPayment);

module.exports = router;
