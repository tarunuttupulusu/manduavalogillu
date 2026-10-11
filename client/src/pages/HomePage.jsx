import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import InstagramIcon from '../components/InstagramIcon';
import { api } from '../services/api';

export default function HomePage({ onOpenBookingModal, onQuickView }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.getProducts({ featured: true });
        setFeaturedProducts(res.products || []);
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setNewsletterEmail('');
    }
  };

  const categories = [
    {
      name: 'Tribal Totems & Carvings',
      slug: 'totems',
      image: '/images/product-totem.jpg',
      count: 'Rare Naga Antiques'
    },
    {
      name: 'Courtyard Swings (Jhula)',
      slug: 'swings',
      image: '/images/product-jhula.jpg',
      count: 'Cast Brass Chain Oonjal'
    },
    {
      name: 'Damchiya Bridal Chests',
      slug: 'cabinets',
      image: '/images/product-damchiya.jpg',
      count: 'Elephant Relief & Mirror Work'
    },
    {
      name: 'Carved Tribal Pillars',
      slug: 'totems',
      image: '/images/product-bull-pillar.jpg',
      count: 'Scorched Wood Totem Art'
    },
    {
      name: 'Showcase Almirahs',
      slug: 'almirah',
      image: '/images/product-almirah.jpg',
      count: 'Aged Teak Wood'
    },
    {
      name: 'Vintage Mirrors',
      slug: 'mirrors',
      image: '/images/product-mirror.jpg',
      count: 'Gold-leaf & Reclaimed Wood'
    },
    {
      name: 'Carved Sofa Sets',
      slug: 'sofas',
      image: '/images/product-sofa.jpg',
      count: '3+1+1 Heritage Living'
    },
    {
      name: 'Farmhouse Dining Tables',
      slug: 'tables',
      image: '/images/product-table.jpg',
      count: 'Solid Teak 6-Seater'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Jubilee Hills, Hyderabad',
      text: 'The Royal Carved Showcase Almirah we acquired for our villa is breathtaking. The depth of the floral carvings and the solid teak construction easily matches heirloom antique pieces from royal dynasties.',
      stars: 5,
      item: 'Purchased Showcase Almirah'
    },
    {
      name: 'Rajesh & Malini Reddy',
      location: 'Farmhouse, Moinabad',
      text: 'Living right in Moinabad, visiting their first-floor showroom opposite Gurukul was an incredible experience. We furnished our entire weekend resort veranda with their cane chairs and carved dining table. Top craftsmanship!',
      stars: 5,
      item: 'Purchased Dining Set & Rocking Chairs'
    },
    {
      name: 'Vikramaditya Rao',
      location: 'Gachibowli, Hyderabad',
      text: 'Manduva Logillu brings back the authentic warmth of courtyard architecture. The antique wall mirror is the centerpiece of our formal living space. Seamless delivery and setup as well.',
      stars: 5,
      item: 'Purchased Antique Ornate Wall Mirror'
    }
  ];

  return (
    <div>
      {/* 1. Hero Editorial Section (Clean photographic showcase) */}
      <section className="hero-section">
        <Link to="/shop" style={{ display: "block", width: "100%", height: "100%" }} aria-label="Explore Collection">
          <img
            src="/images/hero-banner.jpg"
            alt="Manduva Logillu Resort and Farm Furnitures"
            className="hero-bg-image"
          />
        </Link>
      </section>



      {/* 3. Heritage Category Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-warm-bg)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Explore Collections</span>
            <h2>Curated by Heritage Categories</h2>
            <p className="section-subtitle">
              Designed specifically for resort estates, farmhouse verandas, and luxury residences.
            </p>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.slug}`}
                style={{ position: "relative", borderRadius: "var(--radius-sm)", overflow: "hidden", height: "320px", display: "block", group: "hover" }}
                className="category-card"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                />
                <div
                  style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(25,18,12,0.85) 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px", color: "#ffffff" }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#dfbf9b", fontWeight: "600", marginBottom: "4px" }}>
                    {cat.count}
                  </span>
                  <h3 style={{ color: "#ffffff", fontSize: "1.4rem", marginBottom: "8px" }}>
                    {cat.name}
                  </h3>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                    Browse Collection <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Masterpieces Collection */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Signature Curations</span>
            <h2>Featured Resort & Farm Furnitures</h2>
            <p className="section-subtitle">
              Our most sought-after handcrafted pieces, currently showcased at our Moinabad gallery.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--color-text-muted)" }}>
              Loading handcrafted collection...
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link to="/shop" className="btn btn-primary btn-lg">
              View All 9 Handcrafted Masterpieces <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Split Story Editorial Banner */}
      <section className="split-story-section">
        <div className="split-grid">
          <div className="split-image-col">
            <img src="/images/hero-banner.jpg" alt="Manduva Courtyard Craftsmanship" />
          </div>
          <div className="split-content-col">
            <span className="section-eyebrow">The Artisan Legacy</span>
            <h2 style={{ marginBottom: "20px" }}>The Soul of Manduva Logillu</h2>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "20px" }}>
              In Telugu architectural heritage, a <em>Manduva Logillu</em> represents the majestic courtyard home — built with robust carved timber pillars, brass hardware, and breezy verandas that welcome generations of family gatherings.
            </p>
            <p style={{ fontSize: "0.98rem", lineHeight: "1.8", color: "var(--color-text-body)", marginBottom: "32px" }}>
              At our showroom in Moinabad, Hyderabad, we carry this soul forward. Every showcase almirah, antique mirror, and carved sofa is constructed from seasoned teak and reclaimed wood by master artisans who have perfected joinery techniques over decades.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/about" className="btn btn-primary">
                Read Our Heritage Story
              </Link>
              <button onClick={onOpenBookingModal} className="btn btn-secondary">
                Visit Us in Moinabad
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="section-padding" style={{ backgroundColor: "var(--color-warm-bg)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Client Reverence</span>
            <h2>Words from Farmhouse & Resort Owners</h2>
            <p className="section-subtitle">
              Cherished homes across Hyderabad, Chevella, and Jubilee Hills furnished by Manduva Logillu.
            </p>
          </div>

          <div className="responsive-testimonials-grid">
            {testimonials.map((t, index) => (
              <div
                key={index}
                style={{ background: "#ffffff", padding: "36px 30px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "var(--shadow-subtle)" }}
              >
                <div>
                  <div style={{ display: "flex", color: "var(--color-gold)", marginBottom: "16px" }}>
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p style={{ fontSize: "1.02rem", lineHeight: "1.7", color: "var(--color-text-main)", fontStyle: "italic", marginBottom: "24px" }}>
                    "{t.text}"
                  </p>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.15rem", color: "var(--color-primary-darker)", marginBottom: "2px" }}>
                    {t.name}
                  </h4>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                    {t.location}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", color: "var(--color-primary)", fontWeight: "600", marginTop: "4px" }}>
                    {t.item}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Instagram Feed Strip */}
      <section className="section-padding" style={{ paddingBottom: "40px" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Visual Gallery</span>
            <h2>Follow @manduva_logillu_furnitures</h2>
            <p className="section-subtitle">
              Join our community of over 15.4K vintage furniture and resort interior enthusiasts on Instagram.
            </p>
          </div>
        </div>

        <div className="responsive-insta-grid">
          {[
            { img: '/images/product-totem.jpg', caption: 'Naga Ancestor Totem Wood Carving' },
            { img: '/images/product-bull-pillar.jpg', caption: 'Naga Bull Tribal Carved Pillar' },
            { img: '/images/product-jhula.jpg', caption: 'Heritage Manduva Courtyard Carved Jhula' },
            { img: '/images/product-damchiya.jpg', caption: 'Antique Carved Damchiya Bridal Chest' },
            { img: '/images/product-almirah.jpg', caption: 'Royal Carved Showcase Almirah' },
            { img: '/images/product-mirror.jpg', caption: 'Antique Ornate Wall Mirror' },
            { img: '/images/product-sofa.jpg', caption: 'Victorian Carved Heritage Sofa Set' },
            { img: '/images/hero-banner.jpg', caption: 'Traditional Manduva Courtyard' }
          ].map((item, i) => (
            <a
              key={i}
              href="https://www.instagram.com/manduva_logillu_furnitures/"
              target="_blank"
              rel="noreferrer"
              style={{ position: "relative", aspectRatio: "1", overflow: "hidden", display: "block", borderRadius: "4px" }}
              title={item.caption}
            >
              <img
                src={item.img}
                alt={item.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              />
              <div
                style={{ position: "absolute", inset: "0", background: "rgba(143, 108, 74, 0.6)", opacity: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#ffffff", padding: "10px", textAlign: "center", transition: "opacity 0.3s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
              >
                <InstagramIcon size={26} />
                <span style={{ fontSize: "0.72rem", marginTop: "4px", fontWeight: "500" }}>{item.caption}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <section style={{ backgroundColor: "var(--color-primary-darker)", color: "#ffffff", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "680px", textAlign: "center" }}>
          <h2 style={{ color: "#ffffff", marginBottom: "12px" }}>Stay in Our Inner Circle</h2>
          <p style={{ color: "#dfdbd5", fontSize: "0.98rem", marginBottom: "30px" }}>
            Subscribe to receive first access to rare antique consignments, private showroom previews, and farmhouse design notes.
          </p>

          {newsletterSent ? (
            <div style={{ background: "rgba(255, 255, 255, 0.15)", padding: "16px", borderRadius: "var(--radius-sm)", fontSize: "0.95rem" }}>
              ✨ Thank you! You've joined the Manduva Logillu heritage circle.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="responsive-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{ flex: "1", padding: "14px 18px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(255,255,255,0.2)", background: "#ffffff", fontSize: "0.9rem" }}
              />
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: "var(--color-primary-dark)", borderColor: "var(--color-primary-dark)" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
