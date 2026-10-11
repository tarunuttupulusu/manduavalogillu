const fs = require('fs');
const path = require('path');
const {
  initialProducts,
  initialUsers,
  initialOrders,
  initialAppointments,
  initialInquiries
} = require('./initialData');

const DB_FILE = path.join(__dirname, 'db.json');

class DataStore {
  constructor() {
    this.data = {
      products: [],
      users: [],
      orders: [],
      appointments: [],
      inquiries: [],
      reviews: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure defaults if empty
        if (!this.data.products || this.data.products.length === 0) {
          this.data.products = [...initialProducts];
        }
        if (!this.data.users || this.data.users.length === 0) {
          this.data.users = [...initialUsers];
        }
        if (!this.data.orders) this.data.orders = [...initialOrders];
        if (!this.data.appointments) this.data.appointments = [...initialAppointments];
        if (!this.data.inquiries) this.data.inquiries = [...initialInquiries];
        if (!this.data.reviews) this.data.reviews = [];
        this.save();
      } else {
        this.data = {
          products: [...initialProducts],
          users: [...initialUsers],
          orders: [...initialOrders],
          appointments: [...initialAppointments],
          inquiries: [...initialInquiries],
          reviews: []
        };
        this.save();
      }
    } catch (err) {
      console.error('Error loading db.json, using initial seed data:', err.message);
      this.data = {
        products: [...initialProducts],
        users: [...initialUsers],
        orders: [...initialOrders],
        appointments: [...initialAppointments],
        inquiries: [...initialInquiries],
        reviews: []
      };
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving db.json:', err.message);
    }
  }

  // --- Products ---
  getProducts({ category, search, minPrice, maxPrice, sort, featured, material, collection } = {}) {
    let list = [...this.data.products];

    if (category && category !== 'all') {
      list = list.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    if (material && material !== 'all') {
      const mat = material.toLowerCase();
      list = list.filter(p => {
        const pMat = (p.material || '').toLowerCase();
        const pGroup = (p.materialGroup || '').toLowerCase();
        if (pGroup && (pGroup === mat || pGroup.includes(mat))) return true;
        if (mat === 'brass' || mat.includes('brass') || mat.includes('metal')) {
          return pMat.includes('brass') || pMat.includes('metal') || pMat.includes('iron') || pGroup === 'brass';
        }
        if (mat === 'kansa' || mat.includes('kansa') || mat.includes('bronze')) {
          return pMat.includes('kansa') || pMat.includes('bronze') || pMat.includes('bell metal') || pGroup === 'kansa';
        }
        if (mat === 'clay' || mat.includes('ceramic') || mat.includes('clay') || mat.includes('terracotta')) {
          return pMat.includes('clay') || pMat.includes('terracotta') || pMat.includes('ceramic') || pGroup === 'clay';
        }
        if (mat === 'stone' || mat.includes('marble') || mat.includes('stone') || mat.includes('granite')) {
          return pMat.includes('stone') || pMat.includes('marble') || pMat.includes('granite') || pGroup === 'stone';
        }
        if (mat === 'wood' || mat.includes('teak') || mat.includes('timber') || mat.includes('wood')) {
          return pMat.includes('wood') || pMat.includes('teak') || pMat.includes('timber') || pMat.includes('sheesham') || pGroup === 'wood';
        }
        if (mat === 'textile' || mat.includes('fabric') || mat.includes('textile') || mat.includes('cotton') || mat.includes('wool')) {
          return pMat.includes('fabric') || pMat.includes('textile') || pMat.includes('linen') || pMat.includes('cotton') || pMat.includes('wool') || pGroup === 'textile';
        }
        if (mat === 'cane' || mat.includes('rattan') || mat.includes('cane')) {
          return pMat.includes('cane') || pMat.includes('rattan') || pGroup === 'cane';
        }
        return pMat.includes(mat);
      });
    }

    if (collection && collection !== 'all') {
      const col = collection.toLowerCase();
      list = list.filter(p => {
        const pCol = (p.collection || '').toLowerCase();
        const pDesc = (p.description || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        return pCol.includes(col) || pDesc.includes(col) || pName.includes(col);
      });
    }

    if (featured === 'true' || featured === true) {
      list = list.filter(p => p.featured);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.type && p.type.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.material && p.material.toLowerCase().includes(q)) ||
        (p.finish && p.finish.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      list = list.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter(p => p.price <= Number(maxPrice));
    }

    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // default: newest or featured
    }

    return list;
  }

  getProductById(id) {
    return this.data.products.find(p => p.id === id || p.slug === id);
  }

  addProduct(productData) {
    const id = 'prod-' + Date.now();
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct = {
      id,
      slug,
      rating: 5.0,
      numReviews: 0,
      inStock: true,
      ...productData
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.products[index] = { ...this.data.products[index], ...updates };
    this.save();
    return this.data.products[index];
  }

  deleteProduct(id) {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.data.products.splice(index, 1);
    this.save();
    return true;
  }

  // --- Reviews ---
  addReview(productId, reviewData) {
    const product = this.getProductById(productId);
    if (!product) return null;

    const newReview = {
      id: 'rev-' + Date.now(),
      productId: product.id,
      rating: Number(reviewData.rating) || 5,
      userName: reviewData.userName || 'Anonymous Visitor',
      userEmail: reviewData.userEmail || '',
      comment: reviewData.comment,
      createdAt: new Date().toISOString()
    };

    if (!this.data.reviews) this.data.reviews = [];
    this.data.reviews.push(newReview);

    // recalculate average rating
    const productReviews = this.data.reviews.filter(r => r.productId === product.id);
    const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
    product.rating = Number(avg.toFixed(1));
    product.numReviews = productReviews.length;

    this.save();
    return { review: newReview, productRating: product.rating, numReviews: product.numReviews };
  }

  getProductReviews(productId) {
    const product = this.getProductById(productId);
    if (!product) return [];
    return (this.data.reviews || []).filter(r => r.productId === product.id);
  }

  // --- Users ---
  getUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    const user = this.data.users.find(u => u.id === id);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  addUser(userData) {
    const newUser = {
      id: 'usr-' + Date.now(),
      role: 'customer',
      createdAt: new Date().toISOString(),
      ...userData
    };
    this.data.users.push(newUser);
    this.save();
    const { passwordHash, ...safeUser } = newUser;
    return safeUser;
  }

  updateUserProfile(id, updates) {
    const user = this.data.users.find(u => u.id === id);
    if (!user) return null;
    if (updates.name) user.name = updates.name;
    if (updates.phone) user.phone = updates.phone;
    if (updates.address) user.address = updates.address;
    if (updates.passwordHash) user.passwordHash = updates.passwordHash;
    this.save();
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  // --- Orders ---
  createOrder(orderData) {
    const orderNumber = 1000 + this.data.orders.length + 1;
    const newOrder = {
      id: `ML-ORD-${orderNumber}`,
      status: 'Placed',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery / Showroom' ? 'Pending' : 'Paid',
      createdAt: new Date().toISOString(),
      ...orderData
    };
    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  getOrdersByUser(userId) {
    return this.data.orders.filter(o => o.userId === userId);
  }

  getOrderById(id) {
    return this.data.orders.find(o => o.id === id);
  }

  getAllOrders() {
    return this.data.orders;
  }

  updateOrderStatus(id, { status, paymentStatus }) {
    const order = this.data.orders.find(o => o.id === id);
    if (!order) return null;
    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    this.save();
    return order;
  }

  // --- Appointments / Showroom Visits ---
  createAppointment(aptData) {
    const newApt = {
      id: 'apt-' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...aptData
    };
    this.data.appointments.unshift(newApt);
    this.save();
    return newApt;
  }

  getAllAppointments() {
    return this.data.appointments;
  }

  updateAppointmentStatus(id, status) {
    const apt = this.data.appointments.find(a => a.id === id);
    if (!apt) return null;
    apt.status = status;
    this.save();
    return apt;
  }

  // --- Inquiries ---
  createInquiry(inqData) {
    const newInq = {
      id: 'inq-' + Date.now(),
      status: 'New',
      createdAt: new Date().toISOString(),
      ...inqData
    };
    this.data.inquiries.unshift(newInq);
    this.save();
    return newInq;
  }

  getAllInquiries() {
    return this.data.inquiries;
  }

  // --- Admin Stats ---
  getAdminStats() {
    const totalOrders = this.data.orders.length;
    const totalRevenue = this.data.orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalProducts = this.data.products.length;
    const totalUsers = this.data.users.length;
    const totalAppointments = this.data.appointments.length;
    const pendingAppointments = this.data.appointments.filter(a => a.status === 'Pending').length;
    const recentOrders = this.data.orders.slice(0, 5);

    return {
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      totalAppointments,
      pendingAppointments,
      recentOrders
    };
  }
}

const store = new DataStore();
module.exports = store;
