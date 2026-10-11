import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="luxury-yellow-verandah-footer" id="main-footer">
      {/* 1. TOP NEWSLETTER STRIP */}
      <div className="footer-newsletter-section">
        <div className="container">
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="footer-email-input"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer-join-btn">
              {subscribed ? (
                <>
                  <Check size={16} /> Joined
                </>
              ) : (
                'Join'
              )}
            </button>
          </form>
          <p className="footer-newsletter-disclaimer">
            *By completing this form you're signing up to receive our emails and can unsubscribe at any time
          </p>
          {subscribed && (
            <p className="footer-newsletter-success">
              ✓ Welcome to Manduva Logillu Heritage Circle! You'll receive exclusive lookbooks & antique arrivals.
            </p>
          )}
        </div>
      </div>

      {/* 2. ARCHITECTURAL SCALLOPED PALACE ARCH FRIEZE */}
      <div className="footer-arch-frieze-banner" aria-hidden="true"></div>

      {/* 3. DEEP MIDNIGHT TEAL LUXURY FOOTER BODY */}
      <div className="footer-main-dark-body">
        <div className="container">
          <div className="footer-luxury-grid">
            {/* Column 1: Sarus Crane Moon Pichwai Artwork */}
            <div className="footer-col-art">
              <div className="footer-crane-card">
                <img
                  src="/images/footer-crane-art.jpg"
                  alt="Sarus Cranes under Golden Moon - Pichwai Miniature Art"
                  className="footer-crane-img"
                  onError={(e) => {
                    e.target.src = 'assets/images/footer-crane-art.jpg';
                  }}
                />
              </div>
            </div>

            {/* Column 2: Our Story & Exploration */}
            <div className="footer-col-nav">
              <ul className="footer-editorial-links">
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/shop">Inspiration Look Book</Link></li>
                <li><Link to="/contact">Restoration Services</Link></li>
                <li><Link to="/about">Heritage FAQs</Link></li>
                <li><Link to="/shop">Home decor store in Hyderabad</Link></li>
                <li><Link to="/shop">Furniture store in Hyderabad</Link></li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Policies */}
            <div className="footer-col-policies">
              <ul className="footer-editorial-links">
                <li><Link to="/contact">Track Order</Link></li>
                <li><Link to="/contact">Return & Exchange</Link></li>
                <li><Link to="/contact">Refund Policy</Link></li>
                <li><Link to="/contact">Shipping Policy</Link></li>
                <li><Link to="/contact">Terms & Conditions</Link></li>
                <li><Link to="/contact">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4: Our Store & Location Info */}
            <div className="footer-col-store">
              <h4 className="footer-store-heading">Our Store</h4>
              <div className="footer-store-address">
                <p>Manduva Logillu, 1st Floor</p>
                <p>Opp. to Gurukul, Moinabad</p>
                <p>Chevella Road, Hyderabad, 500075</p>
              </div>

              <div className="footer-store-contacts">
                <p className="footer-phone">
                  <a href="tel:+918602067751">+91 8602067751</a>
                </p>
                <p className="footer-email">
                  <a href="mailto:care@manduvalogillu.com">care@manduvalogillu.com</a>
                </p>
              </div>

              {/* Circular White Social Icons */}
              <div className="footer-social-circles">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.08h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.625h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.405 0 22.675 0z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/manduva_logillu_furnitures/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  title="Pinterest"
                  aria-label="Pinterest"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918602067751"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn whatsapp-circle"
                  title="WhatsApp Showroom Concierge"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>

              {/* Showroom Directions Link */}
              <div style={{ marginTop: '12px' }}>
                <a
                  href="https://maps.app.goo.gl/z2imCBr4NeTZqk3SA?g_st=ic"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-maps-link"
                >
                  Open Google Maps Showroom Location <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. VIBRANT SAFFRON / GOLDEN YELLOW BOTTOM BAR */}
      <div className="footer-saffron-bottom-bar">
        <div className="container">
          <div className="footer-saffron-inner">
            <span className="footer-copyright-text">
              Copyright © 2026 Manduva Logillu Furnitures.
            </span>
            <span className="footer-saffron-tagline">
              Crafted for Resort, Farmhouse & Heritage Living 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
