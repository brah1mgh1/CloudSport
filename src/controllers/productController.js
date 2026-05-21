const { Product, Order, User } = require('../models');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    const product = await Product.create({ name, description, price, image, category, stock });
    res.status(201).json({ success: true, product });
  } catch (err) { next(err); }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ order: [['name', 'ASC']] });
    res.json({ success: true, products });
  } catch (err) { next(err); }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    await Product.update({ name, description, price, image, category, stock }, { where: { id: req.params.id } });
    const product = await Product.findByPk(req.params.id);
    res.json({ success: true, product });
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) { next(err); }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { productId, quantity, paymentMethod } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ success: false, message: 'Insufficient stock' });
    const total = product.price * quantity;
    const order = await Order.create({
      userId: req.user.id, productId, quantity, total, paymentMethod, status: 'pending'
    });
    await Product.update({ stock: product.stock - quantity }, { where: { id: productId } });
    res.status(201).json({ success: true, order });
  } catch (err) { next(err); }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, orders });
  } catch (err) { next(err); }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }, { model: Product }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, orders });
  } catch (err) { next(err); }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    await Order.update({ status }, { where: { id: req.params.id } });
    const order = await Order.findByPk(req.params.id);
    res.json({ success: true, order });
  } catch (err) { next(err); }
};
