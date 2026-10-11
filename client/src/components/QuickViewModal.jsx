import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Heart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const formatPrice = (price) => '₹' + Number(price).toLocaleString('en-IN');

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop open" onClick={onClose} />

      <div
        className="center-modal open"
        style={{ maxWidth: "780px", width: "92%" }}
      >
        <div className="modal-header">
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-primary)", fontWeight: "600" }}>
            {product.type || product.category}
          </span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: "24px" }}>
          <div className="responsive-quickview-grid">
            {/* Image */}
            <div style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#f7f4ee" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "340px", objectFit: "cover" }}
              />
            </div>

            {/* Details */}
            <div>
              <h2 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.6rem", marginBottom: "10px" }}>
                {product.name}
              </h2>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <div style={{ display: "flex", color: "var(--color-gold)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                  ({product.numReviews || 12} artisan reviews)
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary-darker)" }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--color-text-light)", textDecoration: "line-through" }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p style={{ fontSize: "0.92rem", color: "var(--color-text-body)", marginBottom: "20px", lineHeight: "1.6" }}>
                {product.shortDesc || product.description}
              </p>

              {/* Specs bullet points */}
              <div style={{ backgroundColor: "var(--color-warm-bg)", padding: "12px 16px", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", marginBottom: "24px" }}>
                {product.material && <div><strong>Material:</strong> {product.material}</div>}
                {product.dimensions && <div><strong>Dimensions:</strong> {product.dimensions}</div>}
                {product.finish && <div><strong>Finish:</strong> {product.finish}</div>}
              </div>

              {/* Quantity and Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div className="cart-qty-adjuster">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ flex: "1" }}
                  onClick={handleAdd}
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>

                <button
                  className={`card-action-btn ${isFavorited ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title="Wishlist"
                  style={{ width: "44px", height: "44px" }}
                >
                  <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>

              <Link
                to={`/product/${product.id || product.slug}`}
                onClick={onClose}
                style={{ display: "block", textAlign: "center", fontSize: "0.85rem", color: "var(--color-primary)", textDecoration: "underline" }}
              >
                View Full Product Details & Artisan Story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
