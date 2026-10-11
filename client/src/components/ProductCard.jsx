import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const formatPrice = (price) => {
    return '₹' + Number(price).toLocaleString('en-IN');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <Link to={`/product/${product.id || product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {product.badge && (
          <span className={`product-badge ${product.badge.toLowerCase().includes('sale') ? 'sale' : ''}`}>
            {product.badge}
          </span>
        )}

        <div className="product-card-actions">
          <button
            className={`card-action-btn ${isFavorited ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist"
          >
            <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>

          {onQuickView && (
            <button
              className="card-action-btn"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              title="Quick view"
              aria-label="Quick View"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="product-card-details">
        <span className="product-category-label">{product.type || product.category}</span>

        <h3 className="product-card-title">
          <Link to={`/product/${product.id || product.slug}`}>{product.name}</Link>
        </h3>

        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'}
                stroke="currentColor"
              />
            ))}
          </div>
          <span>({product.numReviews || 12})</span>
        </div>

        <div className="product-price-row">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
          )}
          {discountPercent > 0 && (
            <span className="discount-pill">{discountPercent}% OFF</span>
          )}
        </div>

        <button
          className="btn btn-secondary btn-sm"
          style={{ width: "100%", marginTop: "4px" }}
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
