import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Truck, MapPin, Printer, MessageCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await api.getOrder(id);
        setOrder(res.order);
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id]);

  const formatPrice = (p) => '₹' + Number(p).toLocaleString('en-IN');

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading order confirmation...
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ minHeight: "60vh", textAlign: "center", padding: "80px 20px" }}>
        <h2>Order Information Not Available</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: "20px" }}>Return to Shop</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--color-warm-bg)", minHeight: "85vh", padding: "60px 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ background: "#ffffff", padding: "48px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)", textAlign: "center" }}>
          <CheckCircle size={64} color="var(--color-success)" style={{ margin: "0 auto 20px" }} />

          <span className="section-eyebrow">Order Confirmed</span>
          <h1 style={{ fontSize: "2.3rem", marginBottom: "8px" }}>
            Thank You, {order.customer?.name}!
          </h1>
          <p style={{ color: "var(--color-text-body)", fontSize: "1.05rem", marginBottom: "24px" }}>
            Your handcrafted vintage furniture order <strong>#{order.id}</strong> has been received by our Moinabad atelier.
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--color-warm-bg)", padding: "8px 18px", borderRadius: "var(--radius-full)", fontSize: "0.85rem", color: "var(--color-primary-darker)", fontWeight: "600", marginBottom: "36px" }}>
            <Truck size={16} /> Status: <span style={{ color: "var(--color-primary)" }}>{order.status}</span>
          </div>

          {/* Items breakdown */}
          <div style={{ textAlign: "left", border: "1px solid var(--color-border-light)", borderRadius: "var(--radius-sm)", padding: "24px", marginBottom: "30px" }}>
            <h4 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.25rem", marginBottom: "16px", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "10px" }}>
              Ordered Furniture Pieces
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                      Quantity: {item.quantity} × {formatPrice(item.price)}
                    </div>
                  </div>
                  <div style={{ fontWeight: "700", color: "var(--color-primary-darker)" }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--color-border-light)", paddingTop: "14px", display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: "700" }}>
              <span>Total Amount Paid / Payable:</span>
              <span style={{ color: "var(--color-primary-darker)" }}>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="responsive-form-grid" style={{ textAlign: "left", fontSize: "0.88rem", marginBottom: "36px" }}>
            <div style={{ background: "var(--color-warm-bg)", padding: "18px", borderRadius: "var(--radius-sm)" }}>
              <h5 style={{ marginBottom: "6px", fontWeight: "700", color: "var(--color-text-main)" }}>📍 Shipping Address</h5>
              <p style={{ margin: "0", color: "var(--color-text-body)" }}>
                {order.customer?.address}<br />
                {order.customer?.city}, {order.customer?.state} — {order.customer?.postalCode}<br />
                Phone: {order.customer?.phone}
              </p>
            </div>

            <div style={{ background: "var(--color-warm-bg)", padding: "18px", borderRadius: "var(--radius-sm)" }}>
              <h5 style={{ marginBottom: "6px", fontWeight: "700", color: "var(--color-text-main)" }}>💳 Payment Method</h5>
              <p style={{ margin: "0", color: "var(--color-text-body)" }}>
                Method: {order.paymentMethod}<br />
                Payment Status: <strong>{order.paymentStatus}</strong><br />
                Showroom Desk: +91 8602067751
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary btn-sm"
            >
              <Printer size={15} /> Print Invoice
            </button>
            <a
              href={`https://wa.me/918602067751?text=${encodeURIComponent(`Hi Manduva Logillu, I placed order #${order.id}. Could you confirm my white-glove delivery date?`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ borderColor: "#25d366", color: "#128c7e" }}
            >
              <MessageCircle size={15} color="#25d366" /> Updates via WhatsApp
            </a>
            <Link to="/shop" className="btn btn-primary btn-sm">
              Continue Shopping <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
