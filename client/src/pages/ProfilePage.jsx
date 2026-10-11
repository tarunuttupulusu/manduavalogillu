import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Phone, ShieldCheck, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function ProfilePage() {
  const { user, isAuthenticated, isAdmin, openAuthModal } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile update form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');

      api.getMyOrders()
        .then(res => setOrders(res.orders || []))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      await api.updateProfile({ name, phone, address });
      setSaveSuccess(true);
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (p) => '₹' + Number(p || 0).toLocaleString('en-IN');

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "60vh", textAlign: "center", padding: "100px 20px" }}>
        <h2>Please Sign In to Access Your Account</h2>
        <p style={{ marginBottom: "24px" }}>View order history and track your furniture deliveries.</p>
        <button className="btn btn-primary" onClick={() => openAuthModal('login')}>
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--color-warm-bg)", minHeight: "85vh", padding: "50px 0 80px" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div style={{ marginBottom: "30px" }}>
          <span className="section-eyebrow">Client Portal</span>
          <h1 style={{ fontSize: "2.2rem", margin: "0" }}>Welcome, {user.name}</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{user.email}</p>
        </div>

        <div className="responsive-profile-grid">
          {/* Profile Details Form */}
          <div style={{ background: "#ffffff", padding: "32px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
            <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.35rem", marginBottom: "20px", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "10px" }}>
              Personal Details
            </h3>

            {saveSuccess && (
              <div style={{ background: "rgba(60, 126, 67, 0.1)", color: "var(--color-success)", padding: "10px", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", marginBottom: "16px" }}>
                ✓ Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={phone}
                  placeholder="+91..."
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Delivery Address</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={address}
                  placeholder="Street, Villa, Farmhouse address..."
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm" style={{ width: "100%" }} disabled={saving}>
                {saving ? 'Saving...' : 'Update Details'}
              </button>
            </form>

            {isAdmin && (
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--color-border-light)" }}>
                <Link to="/admin" className="btn btn-secondary btn-sm" style={{ width: "100%" }}>
                  <ShieldCheck size={16} /> Open Admin Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Orders History */}
          <div style={{ background: "#ffffff", padding: "32px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
            <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.35rem", marginBottom: "20px", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "10px" }}>
              My Order History ({orders.length})
            </h3>

            {loading ? (
              <p style={{ color: "var(--color-text-muted)" }}>Loading your order records...</p>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--color-text-muted)" }}>
                <Package size={40} style={{ margin: "0 auto 12px", color: "var(--color-primary-light)" }} />
                <p>You haven't placed any orders yet.</p>
                <Link to="/shop" className="btn btn-primary btn-sm" style={{ marginTop: "10px" }}>
                  Explore Furniture Collection
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    style={{ border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-sm)", padding: "18px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div>
                        <strong style={{ color: "var(--color-primary)", fontSize: "0.95rem" }}>#{order.id}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <span style={{ background: "var(--color-primary-ultralight)", color: "var(--color-primary-darker)", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: "700", padding: "4px 10px", borderRadius: "var(--radius-sm)" }}>
                        {order.status}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.85rem", color: "var(--color-text-body)", marginBottom: "10px" }}>
                      {order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border-light)", paddingTop: "10px", fontSize: "0.88rem" }}>
                      <span style={{ fontWeight: "700", color: "var(--color-primary-darker)" }}>{formatPrice(order.total)}</span>
                      <Link
                        to={`/order-success/${order.id}`}
                        style={{ color: "var(--color-primary)", fontSize: "0.8rem", fontWeight: "600" }}
                      >
                        View Order Receipt →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
