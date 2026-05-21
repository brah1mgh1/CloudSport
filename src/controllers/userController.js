const { User, Club, Notification } = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, clubId } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ success: false, message: 'Email already in use' });
    const user = await User.create({ name, email, password, role, phone, clubId });
    const token = generateToken(user);
    const { password: _, ...userData } = user.toJSON();
    res.status(201).json({ success: true, token, user: userData });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = generateToken(user);
    const { password: _, ...userData } = user.toJSON();
    res.json({ success: true, token, user: userData });
  } catch (err) { next(err); }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Club }]
    });
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, firstName, lastName, phone, address, city, state, password, profileImage } = req.body;
    const updateData = { name, firstName, lastName, phone, address, city, state, profileImage };
    
    if (password) {
      updateData.password = password;
    }
    
    // If name is not provided but firstName and lastName are, we can update it, but let's just use what's passed or default to building it.
    if (!name && (firstName || lastName)) {
      updateData.name = `${firstName || ''} ${lastName || ''}`.trim();
    }
    
    const userToUpdate = await User.findByPk(req.user.id);
    if (!userToUpdate) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await userToUpdate.update(updateData);

    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    // Delete old profile image if it exists
    const currentUser = await User.findByPk(req.user.id);
    if (currentUser.profileImage) {
      const oldPath = path.join(__dirname, '../../uploads', currentUser.profileImage.replace('/uploads/', ''));
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const imageUrl = `/uploads/profiles/${req.file.filename}`;
    await User.update({ profileImage: imageUrl }, { where: { id: req.user.id } });
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json({ success: true, user, imageUrl });
  } catch (err) { next(err); }
};

exports.removeProfileImage = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id);
    if (currentUser.profileImage) {
      const oldPath = path.join(__dirname, '../../uploads', currentUser.profileImage.replace('/uploads/', ''));
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    await User.update({ profileImage: null }, { where: { id: req.user.id } });
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Club }]
    });
    res.json({ success: true, users });
  } catch (err) { next(err); }
};

exports.getUsersByRole = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { role: req.params.role },
      attributes: { exclude: ['password'] },
      include: [{ model: Club }]
    });
    res.json({ success: true, users });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role, phone, clubId } = req.body;
    await User.update({ name, email, role, phone, clubId }, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'User deleted' });
  } catch (err) { next(err); }
};
