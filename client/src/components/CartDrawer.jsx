import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingRemaining,
    freeShippingThreshold,
    shippingFee,
    grandTotal
  } = useCart();

  const navigate = useNavigate();

  const formatPrice = (price) => '₹' + Number(price).toLocaleString('en-IN');

  const progressPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100)
  );

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`modal-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
      />

      {/* Slide-over Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h3 className="cart-drawer-title">Shopping Cart ({cartItems.length})</h3>
          </div>
          <button className="drawer-close-btn" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="shipping-progress-box">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600" }}>
              <Truck size={15} color="var(--color-primary)" />
              {freeShippingRemaining === 0 ? (
                <span style={{ color: "var(--color-success)" }}>🎉 You unlocked Free Delivery!</span>
              ) : (
                <span>Add {formatPrice(freeShippingRemaining)} more for Free Delivery</span>
              )}
            </span>
            <span style={{ fontWeight: "700", color: "var(--color-primary)" }}>{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Drawer Item List */}
        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--color-text-muted)" }}>
              <ShoppingBag size={48} strokeWidth={1.2} style={{ margin: "0 auto 16px", color: "var(--color-primary-light)" }} />
              <h4 style={{ fontFamily: "var(--font-serif-header)", marginBottom: "8px", color: "var(--color-text-main)" }}>Your Cart is Empty</h4>
              <p style={{ fontSize: "0.9rem", marginBottom: "24px" }}>Explore our handcrafted vintage furniture pieces for your resort or farmhouse.</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-thumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                    <div className="cart-qty-adjuster">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem" }}
                      title="Remove item"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-value">{formatPrice(subtotal)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "16px" }}>
              <span>Estimated Delivery:</span>
              <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={handleCheckoutClick}
            >
              Checkout &nbsp;({formatPrice(grandTotal)}) <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
