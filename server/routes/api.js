const express = require('express');
const bcrypt = require('bcryptjs');
const store = require('../data/store');
const { generateToken, protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

// POST /api/auth/register
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const existing = store.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = store.addUser({
      name,
      email,
      passwordHash,
      phone: phone || '',
      role: 'customer'
    });

    const token = generateToken(user);
    res.status(201).json({
      user,
      token,
      message: 'Account created successfully'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error registering user', error: err.message });
  }
});

// POST /api/auth/login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = store.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { passwordHash, ...safeUser } = user;
    const token = generateToken(safeUser);
    res.json({
      user: safeUser,
      token,
      message: 'Logged in successfully'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

// GET /api/auth/me (Protected)
router.get('/auth/me', protect, (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/auth/profile (Protected)
router.put('/auth/profile', protect, async (req, res) => {
  try {
    const { name, phone, address, password } = req.body;
    const updates = { name, phone, address };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.passwordHash = await bcrypt.hash(password, salt);
    }

    const updatedUser = store.updateUserProfile(req.user.id, updates);
    res.json({ user: updatedUser, message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});

// ==========================================
// 2. PRODUCT ROUTES
// ==========================================

// GET /api/products
router.get('/products', (req, res) => {
  try {
    const products = store.getProducts(req.query);
    res.json({
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// GET /api/products/:id
router.get('/products/:id', (req, res) => {
  try {
    const product = store.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const reviews = store.getProductReviews(product.id);
    res.json({ product, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});

// POST /api/products (Admin only)
router.post('/products', protect, adminOnly, (req, res) => {
  try {
    const { name, category, price, description, image } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Product name, price, and category are required' });
    }
    const newProduct = store.addProduct(req.body);
    res.status(201).json({ product: newProduct, message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

// PUT /api/products/:id (Admin only)
router.put('/products/:id', protect, adminOnly, (req, res) => {
  try {
    const updated = store.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product: updated, message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// DELETE /api/products/:id (Admin only)
router.delete('/products/:id', protect, adminOnly, (req, res) => {
  try {
    const success = store.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

// POST /api/products/:id/reviews
router.post('/products/:id/reviews', (req, res) => {
  try {
    const { rating, comment, userName, userEmail } = req.body;
    if (!comment || !rating) {
      return res.status(400).json({ message: 'Rating and review comment are required' });
    }
    const result = store.addReview(req.params.id, { rating, comment, userName, userEmail });
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(201).json({
      message: 'Review submitted successfully',
      ...result
    });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting review', error: err.message });
  }
});

// ==========================================
// 3. ORDER ROUTES
// ==========================================

// POST /api/orders (Create order)
router.post('/orders', (req, res) => {
  try {
    const { items, customer, paymentMethod, notes } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ message: 'Customer shipping details are required' });
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal >= 10000 ? 0 : 750;
    const total = subtotal + shippingFee;

    // Optional user token
    let userId = 'guest';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(token);
        if (decoded && decoded.id) userId = decoded.id;
      } catch (e) {
        // guest order
      }
    }

    const newOrder = store.createOrder({
      userId,
      customer,
      items,
      subtotal,
      shippingFee,
      total,
      paymentMethod: paymentMethod || 'Cash on Delivery / Showroom',
      notes: notes || ''
    });

    res.status(201).json({
      order: newOrder,
      message: 'Order placed successfully'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// GET /api/orders/my-orders (Protected)
router.get('/orders/my-orders', protect, (req, res) => {
  try {
    const orders = store.getOrdersByUser(req.user.id);
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// GET /api/orders/:id
router.get('/orders/:id', (req, res) => {
  try {
    const order = store.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
});

// GET /api/orders (Admin only)
router.get('/orders', protect, adminOnly, (req, res) => {
  try {
    const orders = store.getAllOrders();
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// PUT /api/orders/:id/status (Admin only)
router.put('/orders/:id/status', protect, adminOnly, (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = store.updateOrderStatus(req.params.id, { status, paymentStatus });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order, message: 'Order status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
});

// ==========================================
// 4. SHOWROOM VISIT APPOINTMENT ROUTES
// ==========================================

// POST /api/appointments
router.post('/appointments', (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, furnitureInterest, notes } = req.body;
    if (!name || !phone || !date) {
      return res.status(400).json({ message: 'Name, phone, and date are required' });
    }
    const appointment = store.createAppointment({
      name,
      email: email || '',
      phone,
      date,
      timeSlot: timeSlot || '11:00 AM - 01:00 PM',
      furnitureInterest: furnitureInterest || 'General Showroom Visit',
      notes: notes || ''
    });
    res.status(201).json({
      appointment,
      message: 'Showroom consultation booked! Our Moinabad team will confirm shortly.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
});

// GET /api/appointments (Admin only)
router.get('/appointments', protect, adminOnly, (req, res) => {
  try {
    const appointments = store.getAllAppointments();
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
});

// PUT /api/appointments/:id/status (Admin only)
router.put('/appointments/:id/status', protect, adminOnly, (req, res) => {
  try {
    const apt = store.updateAppointmentStatus(req.params.id, req.body.status);
    if (!apt) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ appointment: apt, message: 'Appointment status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating appointment', error: err.message });
  }
});

// ==========================================
// 5. INQUIRIES & CONTACT ROUTES
// ==========================================

// POST /api/inquiries
router.post('/inquiries', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone, and message are required' });
    }
    const inq = store.createInquiry({
      name,
      email: email || '',
      phone,
      subject: subject || 'General Inquiry',
      message
    });
    res.status(201).json({
      inquiry: inq,
      message: 'Thank you! Your inquiry has been received. We will respond promptly.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error sending inquiry', error: err.message });
  }
});

// GET /api/inquiries (Admin only)
router.get('/inquiries', protect, adminOnly, (req, res) => {
  try {
    const inquiries = store.getAllInquiries();
    res.json({ inquiries });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inquiries', error: err.message });
  }
});

// ==========================================
// 6. ADMIN DASHBOARD STATS
// ==========================================

// GET /api/admin/stats (Admin only)
router.get('/admin/stats', protect, adminOnly, (req, res) => {
  try {
    const stats = store.getAdminStats();
    res.json({ stats });
  } catch (err) {
    res.status(500).json({ message: 'Error generating stats', error: err.message });
  }
});

module.exports = router;
