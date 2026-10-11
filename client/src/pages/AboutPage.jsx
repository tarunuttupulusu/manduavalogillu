import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Sparkles, MapPin, CheckCircle, ArrowRight, Calendar } from 'lucide-react';

export default function AboutPage({ onOpenBookingModal }) {
  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Editorial Header */}
      <div style={{ backgroundColor: "var(--color-warm-bg)", borderBottom: "1px solid var(--color-border)", padding: "70px 0 60px" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="section-eyebrow">The Artisan Origin</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", marginBottom: "16px" }}>
            The Heritage of Manduva Logillu
          </h1>
          <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "var(--color-text-body)" }}>
            Reviving the majestic grandeur of South Indian courtyard estates and royal resort living from our showroom in Moinabad, Hyderabad.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "60px" }}>
        {/* Split Story 1: What is Manduva Logillu */}
        <div className="responsive-split-grid" style={{ alignItems: "center", marginBottom: "80px" }}>
          <div>
            <span className="section-eyebrow">Architectural Legacy</span>
            <h2 style={{ marginBottom: "20px" }}>The Open Courtyard & The Carved Pillar</h2>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "16px" }}>
              A <em>Manduva Logillu</em> is one of the most celebrated domestic architectural typologies of South India. Built around an inner open-to-sky impluvium with rain-draining granite basins, these ancestral homes were held up by monumental carved teakwood pillars.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-body)", marginBottom: "24px" }}>
              Every furniture piece in our boutique is conceptualized to fit harmoniously into this heritage aesthetic — pieces with weight, historic gravitas, tactile timber grain, and brass hardware that age with dignity.
            </p>
            <div style={{ display: "flex", gap: "20px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle size={18} color="var(--color-primary)" />
                <span>Hand-Selected Teak</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle size={18} color="var(--color-primary)" />
                <span>Zero Particle Board</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle size={18} color="var(--color-primary)" />
                <span>Generational Heirloom</span>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#f7f4ee" }}>
            <img
              src="/images/hero-banner.jpg"
              alt="Manduva Logillu Estate"
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Numbers Strip */}
        <div
          className="responsive-stats-grid"
          style={{ backgroundColor: "var(--color-primary-darker)", color: "#ffffff", borderRadius: "var(--radius-sm)", padding: "50px 30px", textAlign: "center", marginBottom: "80px" }}
        >
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "2.8rem", fontFamily: "var(--font-sans)", fontWeight: "700", marginBottom: "4px" }}>15.4K+</h3>
            <span style={{ fontSize: "0.85rem", color: "#dfbf9b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Instagram Enthusiasts</span>
          </div>
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "2.8rem", fontFamily: "var(--font-sans)", fontWeight: "700", marginBottom: "4px" }}>500+</h3>
            <span style={{ fontSize: "0.85rem", color: "#dfbf9b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Resorts & Farmhouses</span>
          </div>
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "2.8rem", fontFamily: "var(--font-sans)", fontWeight: "700", marginBottom: "4px" }}>100%</h3>
            <span style={{ fontSize: "0.85rem", color: "#dfbf9b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Solid Teak & Reclaimed</span>
          </div>
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "2.8rem", fontFamily: "var(--font-sans)", fontWeight: "700", marginBottom: "4px" }}>50+</h3>
            <span style={{ fontSize: "0.85rem", color: "#dfbf9b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Artisan Guild Craftsmen</span>
          </div>
        </div>

        {/* Split Story 2: The Moinabad Showroom */}
        <div className="responsive-split-grid" style={{ alignItems: "center", marginBottom: "80px" }}>
          <div style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#f7f4ee" }}>
            <img
              src="/images/product-almirah.jpg"
              alt="Moinabad Furniture Showroom"
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />
          </div>

          <div>
            <span className="section-eyebrow">Experience In Person</span>
            <h2 style={{ marginBottom: "20px" }}>The Moinabad Showroom Experience</h2>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "16px" }}>
              Located on the <strong>1st floor opposite to Gurukul in Moinabad</strong>, Chevella Road, our gallery is a sanctuary for architects, resort developers, interior designers, and homeowners who appreciate timber that carries soul.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-body)", marginBottom: "28px" }}>
              Here, you can run your hands along hand-carved floral cornices, test the glide of authentic rocking chairs, and inspect antique mirrors before taking them home.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button onClick={onOpenBookingModal} className="btn btn-primary">
                <Calendar size={16} /> Book Private Tour
              </button>
              <Link to="/contact" className="btn btn-secondary">
                View Showroom Location
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
