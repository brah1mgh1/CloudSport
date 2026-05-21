const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('leader', 'manager'), groupController.createGroup);
router.get('/club/:clubId', groupController.getClubGroups);
router.get('/my', auth, groupController.getMyGroups);
router.get('/pending-requests', auth, roleCheck('leader'), groupController.getPendingRequests);
router.get('/:id', groupController.getGroup);
router.put('/:id', auth, roleCheck('leader', 'manager'), groupController.updateGroup);
router.delete('/:id', auth, roleCheck('leader', 'manager'), groupController.deleteGroup);
router.post('/join', auth, groupController.requestJoin);
router.put('/approve/:id', auth, roleCheck('leader'), groupController.approveJoin);
router.put('/reject/:id', auth, roleCheck('leader'), groupController.rejectJoin);
router.delete('/leave/:groupId', auth, groupController.leaveGroup);

module.exports = router;
