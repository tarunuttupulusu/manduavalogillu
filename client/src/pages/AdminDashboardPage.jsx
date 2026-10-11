import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Calendar,
  MessageSquare,
  Users,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  LogOut,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AdminDashboardPage() {
  const { user, isAdmin, demoLogin, logout, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState('orders');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'almirah',
    type: 'Showcase Almirah',
    price: '',
    originalPrice: '',
    material: 'Seasoned Teak Wood',
    dimensions: '180cm H x 90cm W x 45cm D',
    finish: 'Hand-rubbed Walnut Wax',
    description: '',
    image: '/images/product-almirah.jpg',
    stockCount: 5,
    badge: 'New Arrival'
  });

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, aptsRes, inqsRes, prodsRes] = await Promise.all([
        api.getAdminStats().catch(() => ({ stats: null })),
        api.getAdminOrders().catch(() => ({ orders: [] })),
        api.getAdminAppointments().catch(() => ({ appointments: [] })),
        api.getAdminInquiries().catch(() => ({ inquiries: [] })),
        api.getProducts().catch(() => ({ products: [] }))
      ]);

      setStats(statsRes.stats);
      setOrders(ordersRes.orders || []);
      setAppointments(aptsRes.appointments || []);
      setInquiries(inqsRes.inquiries || []);
      setProducts(prodsRes.products || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAllAdminData();
    }
  }, [isAdmin]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, { status: newStatus });
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert('Error updating order: ' + err.message);
    }
  };

  const handleUpdateAptStatus = async (aptId, newStatus) => {
    try {
      await api.updateAppointmentStatus(aptId, newStatus);
      setAppointments(prev =>
        prev.map(a => (a.id === aptId ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      alert('Error updating appointment: ' + err.message);
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (!window.confirm('Are you sure you want to delete this furniture piece from the catalog?')) return;
    try {
      await api.deleteProduct(prodId);
      setProducts(prev => prev.filter(p => p.id !== prodId));
    } catch (err) {
      alert('Error deleting product: ' + err.message);
    }
  };

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        price: Number(newProduct.price),
        originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
        stockCount: Number(newProduct.stockCount)
      };
      const res = await api.createProduct(payload);
      setProducts(prev => [res.product, ...prev]);
      setIsAddProductOpen(false);
      setNewProduct({
        name: '',
        category: 'almirah',
        type: 'Showcase Almirah',
        price: '',
        originalPrice: '',
        material: 'Seasoned Teak Wood',
        dimensions: '180cm H x 90cm W x 45cm D',
        finish: 'Hand-rubbed Walnut Wax',
        description: '',
        image: '/images/product-almirah.jpg',
        stockCount: 5,
        badge: 'New Arrival'
      });
    } catch (err) {
      alert('Error creating product: ' + err.message);
    }
  };

  const formatPrice = (p) => '₹' + Number(p || 0).toLocaleString('en-IN');

  // If not logged in as Admin, show login screen
  if (!isAdmin) {
    return (
      <div style={{ backgroundColor: "var(--color-warm-bg)", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ background: "#ffffff", padding: "48px 40px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
          <ShieldCheck size={56} color="var(--color-primary)" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontFamily: "var(--font-serif-header)", marginBottom: "8px" }}>
            Manduva Logillu Admin Portal
          </h2>
          <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", marginBottom: "28px" }}>
            Access store revenue, order fulfillment, Moinabad showroom consultations, and inventory management.
          </p>

          <button
            onClick={() => demoLogin('admin')}
            className="btn btn-primary"
            style={{ width: "100%", marginBottom: "12px" }}
          >
            ⚡ 1-Click Login as Admin
          </button>

          <button
            onClick={() => openAuthModal('login')}
            className="btn btn-secondary"
            style={{ width: "100%" }}
          >
            Sign In with Email / Password
          </button>

          <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
            Credentials: <code>admin@manduvalogillu.com</code> / <code>password123</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--color-warm-bg)", minHeight: "85vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Top Admin Bar */}
        <div className="responsive-admin-header">
          <div>
            <span className="section-eyebrow">Backoffice Administration</span>
            <h1 style={{ fontSize: "2.2rem", margin: "0" }}>Executive Atelier Dashboard</h1>
          </div>

          <div className="responsive-admin-header-actions">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="btn btn-primary btn-sm"
            >
              + Add New Piece
            </button>
            <button
              onClick={loadAllAdminData}
              className="btn btn-secondary btn-sm"
              style={{ background: "#ffffff" }}
            >
              <RefreshCw size={14} /> Refresh Data
            </button>
            <button
              onClick={logout}
              className="btn btn-secondary btn-sm"
              style={{ background: "#ffffff", color: "var(--color-danger)", borderColor: "var(--color-danger)" }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="responsive-admin-cards" style={{ marginBottom: "36px" }}>
          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", fontWeight: "600" }}>
                Total Store Revenue
              </span>
              <TrendingUp size={18} color="var(--color-primary)" />
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.8rem", fontWeight: "700", color: "var(--color-primary-darker)" }}>
              {formatPrice(stats?.totalRevenue || orders.reduce((sum, o) => sum + (o.total || 0), 0))}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--color-success)", fontWeight: "600" }}>
              ↑ Active sales volume
            </span>
          </div>

          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", fontWeight: "600" }}>
                Total Orders Placed
              </span>
              <Package size={18} color="var(--color-primary)" />
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.8rem", fontWeight: "700", color: "var(--color-primary-darker)" }}>
              {orders.length}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
              Customer commissions
            </span>
          </div>

          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", fontWeight: "600" }}>
                Showroom Consultations
              </span>
              <Calendar size={18} color="var(--color-primary)" />
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.8rem", fontWeight: "700", color: "var(--color-primary-darker)" }}>
              {appointments.length}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--color-primary)", fontWeight: "600" }}>
              Moinabad appointments
            </span>
          </div>

          <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", fontWeight: "600" }}>
                Active Furniture Catalog
              </span>
              <Users size={18} color="var(--color-primary)" />
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.8rem", fontWeight: "700", color: "var(--color-primary-darker)" }}>
              {products.length}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
              Artisan handcrafted pieces
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="responsive-admin-tabs">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'appointments', label: `Showroom Visits (${appointments.length})`, icon: Calendar },
            { id: 'products', label: `Inventory (${products.length})`, icon: Package },
            { id: 'inquiries', label: `Customer Inquiries (${inquiries.length})`, icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${active ? 'var(--color-primary)' : 'transparent'}`,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: active ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders Table */}
        {activeTab === 'orders' && (
          <div style={{ background: "#ffffff", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", overflow: "hidden", boxShadow: "var(--shadow-subtle)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead style={{ background: "var(--color-warm-bg)", borderBottom: "1px solid var(--color-border)" }}>
                  <tr>
                    <th style={{ padding: "14px 18px" }}>Order ID</th>
                    <th style={{ padding: "14px 18px" }}>Customer</th>
                    <th style={{ padding: "14px 18px" }}>Phone & Address</th>
                    <th style={{ padding: "14px 18px" }}>Pieces</th>
                    <th style={{ padding: "14px 18px" }}>Total</th>
                    <th style={{ padding: "14px 18px" }}>Payment</th>
                    <th style={{ padding: "14px 18px" }}>Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-muted)" }}>
                        No orders placed yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                        <td style={{ padding: "16px 18px", fontWeight: "700", color: "var(--color-primary)" }}>
                          {order.id}
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <strong>{order.customer?.name}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{order.customer?.email}</div>
                        </td>
                        <td style={{ padding: "16px 18px", fontSize: "0.82rem" }}>
                          <div>📞 {order.customer?.phone}</div>
                          <div style={{ color: "var(--color-text-muted)" }}>{order.customer?.address}, {order.customer?.city}</div>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          {order.items?.length || 0} piece(s)
                          <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>
                            {order.items?.map(i => i.name).join(', ').slice(0, 30)}...
                          </div>
                        </td>
                        <td style={{ padding: "16px 18px", fontWeight: "700" }}>
                          {formatPrice(order.total)}
                        </td>
                        <td style={{ padding: "16px 18px", fontSize: "0.8rem" }}>
                          <div>{order.paymentMethod}</div>
                          <span style={{ color: order.paymentStatus === 'Paid' ? 'var(--color-success)' : 'var(--color-gold)', fontWeight: 600 }}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <select
                            className="form-select"
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            style={{ padding: "6px 10px", fontSize: "0.8rem", width: "auto" }}
                          >
                            <option value="Placed">Placed</option>
                            <option value="Processing">Processing Atelier</option>
                            <option value="Dispatched">Dispatched (Truck)</option>
                            <option value="Delivered">Delivered & Assembled</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Showroom Appointments */}
        {activeTab === 'appointments' && (
          <div style={{ background: "#ffffff", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", overflow: "hidden", boxShadow: "var(--shadow-subtle)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead style={{ background: "var(--color-warm-bg)", borderBottom: "1px solid var(--color-border)" }}>
                  <tr>
                    <th style={{ padding: "14px 18px" }}>Client Name</th>
                    <th style={{ padding: "14px 18px" }}>Contact Phone</th>
                    <th style={{ padding: "14px 18px" }}>Scheduled Date & Slot</th>
                    <th style={{ padding: "14px 18px" }}>Furniture Category Interest</th>
                    <th style={{ padding: "14px 18px" }}>Special Notes</th>
                    <th style={{ padding: "14px 18px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-muted)" }}>
                        No showroom visit requests currently.
                      </td>
                    </tr>
                  ) : (
                    appointments.map(apt => (
                      <tr key={apt.id} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                        <td style={{ padding: "16px 18px", fontWeight: "700" }}>
                          {apt.name}
                          {apt.email && <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{apt.email}</div>}
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <a href={`tel:${apt.phone}`} style={{ color: "var(--color-primary)", fontWeight: "600" }}>
                            {apt.phone}
                          </a>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <strong>{apt.date}</strong>
                          <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{apt.timeSlot}</div>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          {apt.furnitureInterest}
                        </td>
                        <td style={{ padding: "16px 18px", fontSize: "0.82rem", color: "var(--color-text-muted)", maxWidth: "220px" }}>
                          {apt.notes || '—'}
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <select
                            className="form-select"
                            value={apt.status}
                            onChange={(e) => handleUpdateAptStatus(apt.id, e.target.value)}
                            style={{ padding: "6px 10px", fontSize: "0.8rem", width: "auto" }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed Showroom</option>
                            <option value="Completed">Completed Visit</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Inventory Products Management */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} /> Add New Furniture Piece
              </button>
            </div>

            <div style={{ background: "#ffffff", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", overflow: "hidden", boxShadow: "var(--shadow-subtle)" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                  <thead style={{ background: "var(--color-warm-bg)", borderBottom: "1px solid var(--color-border)" }}>
                    <tr>
                      <th style={{ padding: "14px 18px" }}>Image</th>
                      <th style={{ padding: "14px 18px" }}>Piece Name</th>
                      <th style={{ padding: "14px 18px" }}>Category</th>
                      <th style={{ padding: "14px 18px" }}>Price</th>
                      <th style={{ padding: "14px 18px" }}>Material & Timber</th>
                      <th style={{ padding: "14px 18px" }}>Stock</th>
                      <th style={{ padding: "14px 18px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                        <td style={{ padding: "12px 18px" }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: "50px", height: "50px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                          />
                        </td>
                        <td style={{ padding: "12px 18px", fontWeight: "700", color: "var(--color-text-main)" }}>
                          {p.name}
                          {p.badge && (
                            <span style={{ fontSize: "0.7rem", marginLeft: "6px", padding: "2px 6px", background: "var(--color-primary-ultralight)", color: "var(--color-primary)", borderRadius: "2px" }}>
                              {p.badge}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "12px 18px", textTransform: "capitalize" }}>
                          {p.category}
                        </td>
                        <td style={{ padding: "12px 18px", fontWeight: "700", color: "var(--color-primary-darker)" }}>
                          {formatPrice(p.price)}
                        </td>
                        <td style={{ padding: "12px 18px", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                          {p.material}
                        </td>
                        <td style={{ padding: "12px 18px" }}>
                          <span style={{ color: "var(--color-success)", fontWeight: "600" }}>
                            {p.stockCount || 5} units
                          </span>
                        </td>
                        <td style={{ padding: "12px 18px" }}>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.82rem" }}
                            title="Delete product"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Inquiries */}
        {activeTab === 'inquiries' && (
          <div style={{ background: "#ffffff", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", overflow: "hidden", boxShadow: "var(--shadow-subtle)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead style={{ background: "var(--color-warm-bg)", borderBottom: "1px solid var(--color-border)" }}>
                  <tr>
                    <th style={{ padding: "14px 18px" }}>Client</th>
                    <th style={{ padding: "14px 18px" }}>Phone</th>
                    <th style={{ padding: "14px 18px" }}>Subject</th>
                    <th style={{ padding: "14px 18px" }}>Message</th>
                    <th style={{ padding: "14px 18px" }}>Received Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-muted)" }}>
                        No inquiries submitted yet.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map(inq => (
                      <tr key={inq.id} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                        <td style={{ padding: "16px 18px", fontWeight: "700" }}>
                          {inq.name}
                          {inq.email && <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{inq.email}</div>}
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <a href={`tel:${inq.phone}`} style={{ color: "var(--color-primary)", fontWeight: "600" }}>
                            {inq.phone}
                          </a>
                        </td>
                        <td style={{ padding: "16px 18px", fontWeight: "600" }}>
                          {inq.subject}
                        </td>
                        <td style={{ padding: "16px 18px", fontSize: "0.85rem", color: "var(--color-text-body)", maxWidth: "320px" }}>
                          {inq.message}
                        </td>
                        <td style={{ padding: "16px 18px", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                          {new Date(inq.createdAt).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <>
          <div className="modal-backdrop open" onClick={() => setIsAddProductOpen(false)} />
          <div className="center-modal open" style={{ maxWidth: "650px" }}>
            <div className="modal-header">
              <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.4rem" }}>
                Add New Heritage Piece to Catalog
              </h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateProductSubmit}>
                <div className="form-group">
                  <label className="form-label">Piece Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Royal Teak Swing / Jhula with Brass Chains"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div className="responsive-form-grid">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value, type: e.target.options[e.target.selectedIndex].text })}
                    >
                      <option value="almirah">Showcase Almirah</option>
                      <option value="mirrors">Vintage Mirrors</option>
                      <option value="sofas">Sofa Sets</option>
                      <option value="tables">Dining Tables</option>
                      <option value="chairs">Chairs & Rockers</option>
                      <option value="cabinets">Cabinets & Credenzas</option>
                      <option value="shelves">Bookshelves</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Badge Tag</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Best Seller / New"
                      value={newProduct.badge}
                      onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="responsive-form-grid">
                  <div className="form-group">
                    <label className="form-label">Price (INR) *</label>
                    <input
                      type="number"
                      required
                      className="form-input"
                      placeholder="49999"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Original Price (INR)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="65000"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div className="responsive-form-grid">
                  <div className="form-group">
                    <label className="form-label">Wood / Material</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProduct.material}
                      onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dimensions</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProduct.dimensions}
                      onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Heritage Details</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Handcrafted from solid seasoned teak wood..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Publish to Store
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
