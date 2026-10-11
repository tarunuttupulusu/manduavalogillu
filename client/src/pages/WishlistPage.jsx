import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistPage({ onQuickView }) {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAll = () => {
    wishlist.forEach(item => addToCart(item, 1));
  };

  return (
    <div style={{ minHeight: "80vh", padding: "50px 0 80px" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
          <span className="section-eyebrow">Personal Curation</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)", marginBottom: "8px" }}>
            My Saved Pieces ({wishlist.length})
          </h1>
          <p style={{ color: "var(--color-text-body)", fontSize: "1.05rem" }}>
            Heirloom furniture pieces you have saved for your home, farmhouse, or resort project.
          </p>

          {wishlist.length > 0 && (
            <button
              onClick={handleAddAll}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: "16px" }}
            >
              <ShoppingBag size={14} /> Add All ({wishlist.length}) to Cart
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--color-warm-bg)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--color-border)", maxWidth: "600px", margin: "0 auto" }}>
            <Heart size={48} strokeWidth={1.3} color="var(--color-primary-light)" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontFamily: "var(--font-serif-header)", marginBottom: "8px" }}>Your Wishlist is Empty</h3>
            <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", marginBottom: "24px" }}>
              Tap the heart icon on any showcase almirah, mirror, or sofa set to save it here for later.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Discover Vintage Collection <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
