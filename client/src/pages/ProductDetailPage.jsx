import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/api';

export default function ProductDetailPage({ onOpenBookingModal, onQuickView }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    async function loadProductData() {
      setLoading(true);
      try {
        const res = await api.getProduct(id);
        setProduct(res.product);
        setReviews(res.reviews || []);
        setSelectedImage(res.product?.image || '');

        // Load related items
        const allRes = await api.getProducts({ category: res.product?.category });
        const filtered = (allRes.products || []).filter(p => p.id !== res.product?.id);
        setRelatedProducts(filtered.slice(0, 3));
      } catch (err) {
        console.error('Error loading product detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProductData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment || !reviewName) return;
    setSubmittingReview(true);
    try {
      const res = await api.submitReview(product.id, {
        rating: reviewRating,
        userName: reviewName,
        comment: reviewComment
      });
      setReviews(prev => [res.review, ...prev]);
      setProduct(prev => ({
        ...prev,
        rating: res.productRating,
        numReviews: res.numReviews
      }));
      setReviewSubmitted(true);
      setReviewComment('');
    } catch (err) {
      alert('Error submitting review: ' + err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
        Loading heirloom furniture details...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "60vh", textAlign: "center", padding: "100px 20px" }}>
        <h2>Product Not Found</h2>
        <p style={{ marginBottom: "24px" }}>The vintage piece you are looking for may have been sold or moved.</p>
        <Link to="/shop" className="btn btn-primary">Browse Active Collection</Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const formatPrice = (p) => '₹' + Number(p).toLocaleString('en-IN');

  const whatsappMessage = encodeURIComponent(
    `Hello Manduva Logillu Furnitures! I am inquiring about the "${product.name}" (${formatPrice(product.price)}). Is this piece currently available for viewing at your Moinabad showroom?`
  );

  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: "var(--color-warm-bg)", borderBottom: "1px solid var(--color-border)", padding: "16px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            <Link to="/" style={{ color: "var(--color-text-main)" }}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop" style={{ color: "var(--color-text-main)" }}>Shop</Link>
            <ChevronRight size={14} />
            <Link to={`/shop?category=${product.category}`} style={{ color: "var(--color-text-main)", textTransform: "capitalize" }}>
              {product.type || product.category}
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: "var(--color-primary)", fontWeight: "600" }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "50px" }}>
        <div className="responsive-split-grid" style={{ marginBottom: "80px" }}>
          {/* Left: Product Images Gallery */}
          <div>
            <div style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#f7f4ee", border: "1px solid var(--color-border-light)", marginBottom: "16px" }}>
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="pdp-main-image"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div style={{ display: "flex", gap: "12px" }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: `2px solid ${selectedImage === img ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Information & Purchase Actions */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-primary)", fontWeight: "700" }}>
                {product.type || product.category}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 3.2vw, 2.7rem)", marginBottom: "14px" }}>
              {product.name}
            </h1>

            {/* Ratings */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ display: "flex", color: "var(--color-gold)" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                {product.rating} / 5.0
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                ({product.numReviews || 12} Verified Artisan Reviews)
              </span>
            </div>

            {/* Pricing */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid var(--color-border-light)" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "2rem", fontWeight: "700", color: "var(--color-primary-darker)" }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.25rem", color: "var(--color-text-light)", textDecoration: "line-through" }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-success)", fontWeight: "700", background: "rgba(60, 126, 67, 0.1)", padding: "4px 10px", borderRadius: "var(--radius-sm)" }}>
                Includes White-Glove Setup
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "var(--color-text-body)", marginBottom: "28px" }}>
              {product.description}
            </p>

            {/* Specifications Quick Grid */}
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", backgroundColor: "var(--color-warm-bg)", padding: "18px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", fontSize: "0.86rem", marginBottom: "30px" }}
            >
              <div><strong>Material:</strong> {product.material || 'Seasoned Teak Wood'}</div>
              <div><strong>Finish:</strong> {product.finish || 'Hand-rubbed Walnut Wax'}</div>
              <div><strong>Dimensions:</strong> {product.dimensions || 'Custom Heritage Size'}</div>
              <div><strong>Stock Status:</strong> <span style={{ color: "var(--color-success)", fontWeight: "600" }}>In Stock ({product.stockCount || 5} pieces)</span></div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div className="cart-qty-adjuster" style={{ padding: "4px 6px" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: "32px", height: "32px" }}
                >
                  −
                </button>
                <span style={{ minWidth: "32px", fontSize: "1rem" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: "32px", height: "32px" }}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ flex: "1" }}
                onClick={() => addToCart(product, quantity)}
              >
                <ShoppingBag size={18} /> Add to Shopping Cart
              </button>

              <button
                className={`card-action-btn ${isFavorited ? 'active' : ''}`}
                style={{ width: "52px", height: "52px" }}
                onClick={() => toggleWishlist(product)}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Secondary Direct Inquiry Buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/918602067751?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: "1 1 180px", borderColor: "#25d366", color: "#128c7e", textAlign: "center" }}
              >
                <MessageCircle size={16} color="#25d366" /> Inquire on WhatsApp
              </a>

              <button
                onClick={onOpenBookingModal}
                className="btn btn-secondary btn-sm"
                style={{ flex: "1 1 180px", textAlign: "center" }}
              >
                <Calendar size={16} /> Book Private Showroom Visit
              </button>
            </div>

            {/* Guarantees Strip */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "var(--color-text-muted)", paddingTop: "20px", borderTop: "1px solid var(--color-border-light)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Truck size={16} color="var(--color-primary)" />
                <span>Complimentary white-glove delivery across Hyderabad & Chevella region.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} color="var(--color-primary)" />
                <span>Lifetime authenticity guarantee on solid seasoned teak wood.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={16} color="var(--color-primary)" />
                <span>Custom dimension resizing available on commission for resorts and villas.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Ratings Submission Section */}
        <section style={{ backgroundColor: "var(--color-warm-bg)", padding: "50px 40px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", marginBottom: "40px" }}>
            <div>
              <span className="section-eyebrow">Artisan Feedback</span>
              <h2>Client Reviews ({reviews.length})</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
                <div style={{ display: "flex", color: "var(--color-gold)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--color-text-main)" }}>
                  {product.rating} Average Rating
                </span>
              </div>
            </div>
          </div>

          <div className="responsive-reviews-grid">
            {/* Reviews List */}
            <div>
              {reviews.length === 0 ? (
                <p style={{ color: "var(--color-text-muted)" }}>No reviews written yet. Be the first to share your experience!</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{ background: "#ffffff", padding: "22px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ fontWeight: "700", color: "var(--color-text-main)" }}>{rev.userName}</span>
                        <div style={{ display: "flex", color: "var(--color-gold)" }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              fill={i < rev.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--color-text-body)", margin: "0" }}>
                        "{rev.comment}"
                      </p>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "10px" }}>
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Review Form */}
            <div style={{ background: "#ffffff", padding: "28px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)" }}>
              <h4 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.3rem", marginBottom: "16px" }}>
                Write an Heirloom Review
              </h4>

              {reviewSubmitted && (
                <div style={{ background: "rgba(60, 126, 67, 0.1)", color: "var(--color-success)", padding: "10px", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", marginBottom: "16px" }}>
                  ✓ Thank you! Your review has been added to this piece.
                </div>
              )}

              <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Rating</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-gold)", padding: "2px" }}
                      >
                        <Star size={24} fill={star <= reviewRating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Anand Varma"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Review Details</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Describe the craftsmanship, wood texture, and finish..."
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={submittingReview}
                >
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="section-header">
              <span className="section-eyebrow">Harmonious Pairings</span>
              <h2>Complementary Furniture Pieces</h2>
            </div>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
