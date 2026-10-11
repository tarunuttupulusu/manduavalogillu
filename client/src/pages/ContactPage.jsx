import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, MessageCircle, Send, CheckCircle, ExternalLink } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import { api } from '../services/api';

export default function ContactPage() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubject, setInquirySubject] = useState('Custom Furniture Request');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.sendInquiry({
        name: inquiryName,
        phone: inquiryPhone,
        email: inquiryEmail,
        subject: inquirySubject,
        message: inquiryMessage
      });
      setSentSuccess(true);
      setInquiryMessage('');
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Header */}
      <div style={{ backgroundColor: "var(--color-warm-bg)", borderBottom: "1px solid var(--color-border)", padding: "60px 0 50px" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "760px" }}>
          <span className="section-eyebrow">Connect with Our Artisans</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)", marginBottom: "14px" }}>
            Visit Our Moinabad Showroom
          </h1>
          <p style={{ color: "var(--color-text-body)", fontSize: "1.05rem" }}>
            Whether you are furnishing a weekend farmhouse, a luxury boutique resort, or commissioning a custom carved teakwood piece, we would be delighted to assist you.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "60px" }}>
        <div className="responsive-split-grid" style={{ marginBottom: "60px" }}>
          {/* Left: Contact & Custom Commission Form */}
          <div style={{ background: "#ffffff", padding: "40px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-subtle)" }}>
            <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.6rem", marginBottom: "10px" }}>
              Send an Inquiry or Custom Commission
            </h3>
            <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", marginBottom: "24px" }}>
              Share your room dimensions, project requirements, or custom wood carving requests. Our master craftsman team responds promptly.
            </p>

            {sentSuccess && (
              <div style={{ background: "rgba(60, 126, 67, 0.1)", borderLeft: "4px solid var(--color-success)", color: "var(--color-success)", padding: "14px", borderRadius: "var(--radius-sm)", marginBottom: "20px" }}>
                ✓ Thank you! Your message has been sent to our Moinabad team. We will call you shortly.
              </div>
            )}

            {error && (
              <div style={{ background: "rgba(201, 74, 74, 0.1)", borderLeft: "4px solid var(--color-danger)", color: "var(--color-danger)", padding: "14px", borderRadius: "var(--radius-sm)", marginBottom: "20px" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleInquirySubmit}>
              <div className="responsive-form-grid">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Full name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+91 9876543210"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="responsive-form-grid">
                <div className="form-group">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Inquiry Subject</label>
                  <select
                    className="form-select"
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                  >
                    <option value="Custom Furniture Request">Custom Furniture Request</option>
                    <option value="Resort / Farmhouse Bulk Project">Resort / Farmhouse Bulk Project</option>
                    <option value="Showroom Visit Question">Showroom Visit Question</option>
                    <option value="Delivery & Installation Inquiry">Delivery & Installation Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message Details *</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  required
                  placeholder="Describe your furniture needs, room measurements, or preferred wood finish..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={submitting}
              >
                {submitting ? 'Sending Message...' : <><Send size={16} /> Submit Inquiry</>}
              </button>
            </form>
          </div>

          {/* Right: Showroom Details & Direct Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "var(--color-warm-bg)", padding: "36px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)" }}>
              <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.5rem", marginBottom: "20px" }}>
                Showroom Location
              </h3>

              <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                <MapPin size={22} color="var(--color-primary)" style={{ flexShrink: "0" }} />
                <div>
                  <strong style={{ color: "var(--color-text-main)" }}>Manduva Logillu Furnitures</strong>
                  <p style={{ color: "var(--color-text-body)", fontSize: "0.92rem", margin: "4px 0 0" }}>
                    1st Floor, Opposite to Gurukul,<br />
                    Moinabad, Chevella, R.R. District — 500075,<br />
                    Hyderabad, Telangana, India.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                <Phone size={20} color="var(--color-primary)" style={{ flexShrink: "0" }} />
                <div>
                  <strong style={{ color: "var(--color-text-main)" }}>Direct Desk / Call</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    <a href="tel:+918602067751" style={{ color: "var(--color-primary)", fontWeight: "600", fontSize: "1.05rem" }}>
                      +91 8602067751
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", marginBottom: "24px" }}>
                <Clock size={20} color="var(--color-primary)" style={{ flexShrink: "0" }} />
                <div>
                  <strong style={{ color: "var(--color-text-main)" }}>Operating Hours</strong>
                  <p style={{ color: "var(--color-text-body)", fontSize: "0.9rem", margin: "4px 0 0" }}>
                    Monday – Saturday: 10:00 AM – 8:00 PM<br />
                    Sunday: 11:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="https://wa.me/918602067751"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ borderColor: "#25d366", color: "#128c7e" }}
                >
                  <MessageCircle size={15} color="#25d366" /> Chat on WhatsApp
                </a>

                <a
                  href="https://maps.app.goo.gl/z2imCBr4NeTZqk3SA?g_st=ic"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <ExternalLink size={14} /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Instagram Community Banner */}
            <div style={{ background: "#ffffff", padding: "24px 30px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-light)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <InstagramIcon size={28} color="var(--color-primary)" />
                <div>
                  <h4 style={{ fontSize: "1rem", margin: "0" }}>@manduva_logillu_furnitures</h4>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>15.4K Vintage & Resort Followers</span>
                </div>
              </div>
              <a
                href="https://www.instagram.com/manduva_logillu_furnitures/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Follow
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-subtle)" }}>
          <iframe
            title="Manduva Logillu Moinabad Location"
            src="https://maps.google.com/maps?q=Moinabad+Chevella+Telangana+500075&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="380"
            style={{ border: "0", display: "block" }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
