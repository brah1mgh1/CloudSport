const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/clubs', require('./clubRoutes'));
router.use('/groups', require('./groupRoutes'));
router.use('/facilities', require('./facilityRoutes'));
router.use('/reservations', require('./reservationRoutes'));
router.use('/notifications', require('./notificationRoutes'));
router.use('/subscriptions', require('./subscriptionRoutes'));
router.use('/events', require('./eventRoutes'));
router.use('/feedback', require('./feedbackRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/offers', require('./offerRoutes'));

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

module.exports = router;
