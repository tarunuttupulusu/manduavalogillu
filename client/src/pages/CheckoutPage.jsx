import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function CheckoutPage() {
  const { cartItems, subtotal, shippingFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500075'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const formatPrice = (p) => '₹' + Number(p).toLocaleString('en-IN');

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: "60vh", textAlign: "center", padding: "100px 20px" }}>
        <h2>Your Shopping Cart is Empty</h2>
        <p style={{ marginBottom: "24px" }}>Add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn-primary">Browse Furniture Collection</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const orderPayload = {
        customer,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        paymentMethod,
        notes
      };

      const res = await api.createOrder(orderPayload);
      clearCart();
      navigate(`/order-success/${res.order.id}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-warm-bg)", minHeight: "85vh", padding: "50px 0 80px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Link
            to="/shop"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-text-muted)" }}
          >
            <ArrowLeft size={16} /> Continue Browsing Collections
          </Link>
          <h1 style={{ fontSize: "2.2rem", marginTop: "10px" }}>Complete Your Order</h1>
        </div>

        {error && (
          <div style={{ background: "rgba(201, 74, 74, 0.1)", borderLeft: "4px solid var(--color-danger)", color: "var(--color-danger)", padding: "14px 20px", borderRadius: "var(--radius-sm)", marginBottom: "24px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="responsive-checkout-grid">
            {/* Left: Shipping & Payment Details */}
            <div style={{ background: "#ffffff", padding: "36px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
              <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.45rem", marginBottom: "20px", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "12px" }}>
                1. Delivery & Contact Details
              </h3>

              <div className="responsive-form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="e.g. Priya Sharma"
                    value={customer.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="form-input"
                    placeholder="+91 9876543210"
                    value={customer.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="name@example.com"
                  value={customer.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Street Address (Resort / Villa / Farm) *</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="form-input"
                  placeholder="Plot 12, Gurukul Road, Villa 4..."
                  value={customer.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="responsive-form-grid-3">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="form-input"
                    value={customer.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="form-input"
                    value={customer.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    className="form-input"
                    value={customer.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Floor / Access Instructions</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="e.g. Ground floor living room, wide doorway..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Payment Methods */}
              <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.45rem", margin: "32px 0 20px", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "12px" }}>
                2. Select Payment Option
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    border: `1px solid ${paymentMethod === 'UPI / QR Code' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    background: paymentMethod === 'UPI / QR Code' ? 'var(--color-primary-ultralight)' : '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI / QR Code"
                    checked={paymentMethod === 'UPI / QR Code'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <QrCode size={20} color="var(--color-primary)" />
                  <div style={{ flex: "1" }}>
                    <strong style={{ fontSize: "0.95rem", color: "var(--color-text-main)" }}>UPI / Instant Net Banking (Recommended)</strong>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", margin: "0" }}>GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    border: `1px solid ${paymentMethod === 'Cash on Delivery / Showroom' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    background: paymentMethod === 'Cash on Delivery / Showroom' ? 'var(--color-primary-ultralight)' : '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery / Showroom"
                    checked={paymentMethod === 'Cash on Delivery / Showroom'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Banknote size={20} color="var(--color-primary)" />
                  <div style={{ flex: "1" }}>
                    <strong style={{ fontSize: "0.95rem", color: "var(--color-text-main)" }}>Pay on Delivery / Showroom Inspection</strong>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", margin: "0" }}>Inspect your teak furniture in person upon arrival</p>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    border: `1px solid ${paymentMethod === 'Credit / Debit Card' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    background: paymentMethod === 'Credit / Debit Card' ? 'var(--color-primary-ultralight)' : '#ffffff',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit / Debit Card"
                    checked={paymentMethod === 'Credit / Debit Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <CreditCard size={20} color="var(--color-primary)" />
                  <div style={{ flex: "1" }}>
                    <strong style={{ fontSize: "0.95rem", color: "var(--color-text-main)" }}>Credit / Debit Card</strong>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", margin: "0" }}>Visa, Mastercard, RuPay</p>
                  </div>
                </label>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                <ShieldCheck size={18} color="var(--color-success)" />
                <span>Protected with 256-bit SSL encrypted checkout and artisan guarantee.</span>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ background: "#ffffff", padding: "32px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
              <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.45rem", marginBottom: "20px", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "12px" }}>
                Order Summary ({cartItems.length} items)
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "280px", overflowY: "auto", marginBottom: "24px", paddingRight: "4px" }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "54px", height: "54px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                    />
                    <div style={{ flex: "1" }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text-main)", lineHeight: "1.2" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </div>
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: "700" }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--color-border-light)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px", fontFamily: "var(--font-sans)", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-text-body)" }}>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-text-body)" }}>White-Glove Delivery</span>
                  <span style={{ color: "var(--color-success)", fontWeight: "600" }}>
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "14px", marginTop: "6px", fontSize: "1.25rem", fontWeight: "700", color: "var(--color-primary-darker)" }}>
                  <span>Grand Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "24px", padding: "16px" }}
                disabled={submitting}
              >
                {submitting ? 'Placing Heirloom Order...' : `Confirm & Place Order (${formatPrice(grandTotal)})`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
