const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('manager'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/orders/my', auth, productController.getMyOrders);
router.get('/orders', auth, roleCheck('manager'), productController.getAllOrders);
router.get('/:id', productController.getProduct);
router.put('/:id', auth, roleCheck('manager'), productController.updateProduct);
router.delete('/:id', auth, roleCheck('manager'), productController.deleteProduct);
router.post('/order', auth, productController.createOrder);
router.put('/order/:id', auth, roleCheck('manager'), productController.updateOrderStatus);

module.exports = router;
