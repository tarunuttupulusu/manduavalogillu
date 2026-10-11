import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';
import { api } from '../services/api';

export default function ShowroomBookingModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [furnitureInterest, setFurnitureInterest] = useState('Farmhouse Living & Dining');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.bookAppointment({
        name,
        phone,
        email,
        date,
        timeSlot,
        furnitureInterest,
        notes
      });
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to book visit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop open" onClick={handleClose} />

      <div className="center-modal open">
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={20} color="var(--color-primary)" />
            <h3 style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.4rem" }}>
              Book Showroom Consultation
            </h3>
          </div>
          <button
            onClick={handleClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <CheckCircle size={54} color="var(--color-success)" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontFamily: "var(--font-serif-header)", marginBottom: "8px", color: "var(--color-text-main)" }}>
                Consultation Confirmed!
              </h3>
              <p style={{ color: "var(--color-text-body)", fontSize: "0.95rem", marginBottom: "20px" }}>
                Thank you, <strong>{name}</strong>. Our Moinabad showroom team will welcome you on <strong>{date}</strong> ({timeSlot}).
              </p>
              <div style={{ backgroundColor: "var(--color-warm-bg)", padding: "14px", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", textAlign: "left", marginBottom: "24px" }}>
                <p style={{ margin: "0", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <MapPin size={18} color="var(--color-primary)" style={{ flexShrink: "0" }} />
                  <span>Manduva Logillu, 1st Floor, Opp. to Gurukul, Moinabad, Hyderabad — 500075</span>
                </p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={handleClose}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: "20px" }}>
                Schedule a dedicated personal viewing of our teakwood showcase almirahs, vintage mirrors, and resort furniture at our Moinabad showroom.
              </p>

              {error && (
                <div style={{ padding: "10px 14px", background: "rgba(201, 74, 74, 0.1)", color: "var(--color-danger)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", marginBottom: "16px" }}>
                  {error}
                </div>
              )}

              <div className="responsive-form-grid">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email (Optional)</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="responsive-form-grid">
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select
                    className="form-select"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Furniture Interest</label>
                <select
                  className="form-select"
                  value={furnitureInterest}
                  onChange={(e) => setFurnitureInterest(e.target.value)}
                >
                  <option value="Showcase Almirah & Storage">Showcase Almirah & Storage</option>
                  <option value="Vintage Mirrors">Vintage Mirrors</option>
                  <option value="Carved Sofa Sets">Carved Sofa Sets</option>
                  <option value="Farmhouse Dining Tables">Farmhouse Dining Tables</option>
                  <option value="Full Resort / Farmhouse Package">Full Resort / Farmhouse Package</option>
                  <option value="Custom Carved Pieces">Custom Carved Pieces</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Special Notes / Requests</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="Tell us about your home, resort, or specific dimensions required..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={submitting}
              >
                {submitting ? 'Confirming...' : 'Confirm Showroom Consultation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
