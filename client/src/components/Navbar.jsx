import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  LogOut,
  Home,
  LayoutGrid,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenBookingModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState('furniture');

  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout, openAuthModal } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setMobileSearchOpen(false);
    setActiveDropdown(null);
    setActiveSubmenu(null);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Totems & Pillars', path: '/shop?category=totems' },
    { name: 'Courtyard Swings', path: '/shop?category=swings' },
    { name: 'Showcase Almirahs', path: '/shop?category=almirah' },
    { name: 'Vintage Mirrors', path: '/shop?category=mirrors' },
    { name: 'Sofa Sets', path: '/shop?category=sofas' },
    { name: 'Dining Tables', path: '/shop?category=tables' },
    { name: 'Chairs & Rockers', path: '/shop?category=chairs' },
    { name: 'Our Heritage', path: '/about' },
    { name: 'Visit Showroom', path: '/contact' }
  ];

  const categorySections = [
    { name: 'Tribal Totems & Pillars', path: '/shop?category=totems', image: '/images/product-totem.jpg', badge: 'Rare' },
    { name: 'Courtyard Swings (Jhula)', path: '/shop?category=swings', image: '/images/product-jhula.jpg', badge: 'Heritage' },
    { name: 'Damchiya Bridal Chests', path: '/shop?category=cabinets', image: '/images/product-damchiya.jpg', badge: 'Antique' },
    { name: 'Carved Tribal Pillars', path: '/shop?category=totems', image: '/images/product-bull-pillar.jpg' },
    { name: 'Showcase Almirahs', path: '/shop?category=almirah', image: '/images/product-almirah.jpg' },
    { name: 'Vintage Mirrors', path: '/shop?category=mirrors', image: '/images/product-mirror.jpg' },
    { name: 'Carved Sofa Sets', path: '/shop?category=sofas', image: '/images/product-sofa.jpg' },
    { name: 'Dining Tables', path: '/shop?category=tables', image: '/images/product-table.jpg' },
    { name: 'Chairs & Rockers', path: '/shop?category=chairs', image: '/images/product-chair.jpg' }
  ];

  const materialSections = [
    { name: 'Brass & Metal', path: '/shop?material=brass', image: '/images/product-brass-uruli.jpg' },
    { name: 'Pure Kansa Bronze', path: '/shop?material=kansa', image: '/images/product-kansa-set.jpg' },
    { name: 'Ceramic & Clay', path: '/shop?material=clay', image: '/images/product-terracotta-urn.jpg' },
    { name: 'Stone & Marble', path: '/shop?material=stone', image: '/images/product-marble-platter.jpg' },
    { name: 'Wood & Teak', path: '/shop?material=wood', image: '/images/product-totem.jpg' },
    { name: 'Fabric & Textile', path: '/shop?material=textile', image: '/images/product-kilim-rug.jpg' },
    { name: 'Rattan & Cane', path: '/shop?material=cane', image: '/images/product-cane-screen.jpg' }
  ];

  return (
    <>
      {/* Top Announcement Bar (Tesu India style with dismissible X) */}
      {!promoDismissed && (
        <div className="topbar tesu-topbar">
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <span className="tesu-topbar-text">
              Flat 10% OFF on your first order using code- <em>HELLOMANDUVA</em> at checkout.
            </span>
            <button
              onClick={() => setPromoDismissed(true)}
              className="tesu-topbar-close"
              aria-label="Dismiss banner"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-top">
            {/* Mobile Menu Toggle Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Desktop Brand Logo */}
            <Link to="/" className="header-logo desktop-only-logo">
              <img src="/images/logo.jpg" alt="Manduva Logillu Furnitures" />
              <div className="logo-text-wrap">
                <span className="logo-title">Manduva Logillu</span>
                <span className="logo-subtitle">Resort & Farm Furnitures</span>
              </div>
            </Link>

            {/* Mobile Centered Brand Logo (Tesu India style) */}
            <Link to="/" className="tesu-mobile-brand mobile-only-brand">
              <span className="tesu-brand-motif">🪞</span>
              <span className="tesu-brand-title">MANDUVA</span>
            </Link>

            {/* Search Input Bar (Desktop) */}
            <form className="header-search" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search vintage almirahs, carved mirrors, teak tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search items">
                <Search size={18} />
              </button>
            </form>

            {/* Header Right Actions */}
            <div className="header-actions">
              {/* Mobile Search Button */}
              <button
                className="header-action-btn mobile-only-btn"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Search items"
                title="Search"
              >
                <Search size={21} strokeWidth={1.5} />
              </button>

              {/* User Account / Profile */}
              <div style={{ position: "relative" }} className="desktop-only-action">
                {isAuthenticated ? (
                  <div>
                    <button
                      className="header-action-btn"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      title={`Logged in as ${user.name}`}
                    >
                      <User size={20} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: "600", marginLeft: "6px" }}>
                        {user.name.split(' ')[0]}
                      </span>
                    </button>

                    {userDropdownOpen && (
                      <div
                        style={{ position: "absolute", right: "0", top: "100%", marginTop: "8px", width: "200px", background: "#ffffff", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-modal)", border: "1px solid var(--color-border)", padding: "8px 0", zIndex: "1000" }}
                      >
                        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--color-border-light)" }}>
                          <p style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--color-text-main)", margin: "0" }}>{user.name}</p>
                          <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", margin: "0" }}>{user.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          style={{ display: "block", padding: "8px 16px", fontSize: "0.84rem", color: "var(--color-text-main)" }}
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            style={{ display: "block", padding: "8px 16px", fontSize: "0.84rem", color: "var(--color-primary)", fontWeight: "600" }}
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 16px", fontSize: "0.84rem", color: "var(--color-danger)", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", borderTop: "1px solid var(--color-border-light)" }}
                        >
                          <LogOut size={14} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="header-action-btn"
                    onClick={() => openAuthModal('login')}
                    title="Account / Sign in"
                  >
                    <User size={20} />
                  </button>
                )}
              </div>

              {/* Wishlist Link (Desktop) */}
              <Link to="/wishlist" className="header-action-btn desktop-only-action" title="Saved Wishlist">
                <Heart size={20} />
                {totalWishlist > 0 && <span className="badge-count">{totalWishlist}</span>}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                className="header-action-btn"
                onClick={openCart}
                title="View Shopping Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && <span className="badge-count">{totalItems}</span>}
              </button>
            </div>
          </div>

          {/* Expandable Mobile Search Bar */}
          {mobileSearchOpen && (
            <div style={{ padding: "10px 0 14px", borderTop: "1px solid var(--color-border-light)" }}>
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="Search vintage almirahs, carved mirrors..."
                  value={searchQuery}
                  autoFocus
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1, padding: "9px 14px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", outline: "none" }}
                />
                <button type="submit" className="btn btn-primary btn-sm">Search</button>
              </form>
            </div>
          )}
        </div>

        {/* Primary Desktop Navigation Links (Rich Caramel/Wood Brown Editorial Bar) */}
        <nav className="header-nav editorial-caramel-navbar">
          <div className="container">
            <ul className="desktop-heritage-nav-list">
              {/* 1. New Arrivals */}
              <li className="desktop-nav-item">
                <Link
                  to="/shop?filter=new"
                  className={`desktop-nav-link ${location.search.includes('filter=new') ? 'active' : ''}`}
                >
                  New Arrivals
                </Link>
              </li>

              {/* 2. Shop (with nested flyout) */}
              <li
                className={`desktop-nav-item has-dropdown ${activeDropdown === 'shop' ? 'has-dropdown-open' : ''}`}
                onMouseEnter={() => {
                  setActiveDropdown('shop');
                  setActiveSubmenu('furniture');
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setActiveSubmenu(null);
                }}
              >
                <div
                  className="desktop-nav-link"
                  onClick={() => navigate('/shop')}
                >
                  <span>Shop</span>
                  {activeDropdown === 'shop' ? (
                    <ChevronUp size={14} strokeWidth={2} />
                  ) : (
                    <ChevronDown size={14} strokeWidth={2} />
                  )}
                </div>

                {activeDropdown === 'shop' && (
                  <div className="desktop-dropdown-menu shop-main-dropdown">
                    {/* Furniture with Flyout */}
                    <div
                      className={`desktop-dropdown-item ${activeSubmenu === 'furniture' ? 'has-submenu-open' : ''}`}
                      onMouseEnter={() => setActiveSubmenu('furniture')}
                    >
                      <div
                        className="desktop-dropdown-link has-flyout-trigger"
                        onClick={() => navigate('/shop')}
                      >
                        <span>Furniture</span>
                        <ChevronRight size={13} strokeWidth={1.5} />
                      </div>
                      {activeSubmenu === 'furniture' && (
                        <div className="desktop-submenu-flyout">
                          <Link to="/shop?category=almirah" className="desktop-flyout-link">Showcase Almirahs</Link>
                          <Link to="/shop?category=mirrors" className="desktop-flyout-link">Vintage Mirrors</Link>
                          <Link to="/shop?category=sofas" className="desktop-flyout-link">Heritage Sofa Sets</Link>
                          <Link to="/shop?category=tables" className="desktop-flyout-link">Farmhouse Dining Tables</Link>
                          <Link to="/shop?category=chairs" className="desktop-flyout-link">Colonial Chairs & Rockers</Link>
                          <Link to="/shop?category=cabinets" className="desktop-flyout-link">Sideboards & Cabinets</Link>
                          <Link to="/shop?category=shelves" className="desktop-flyout-link">Open Bookshelves</Link>
                        </div>
                      )}
                    </div>

                    {/* Homeware with Flyout */}
                    <div
                      className={`desktop-dropdown-item ${activeSubmenu === 'homeware' ? 'has-submenu-open' : ''}`}
                      onMouseEnter={() => setActiveSubmenu('homeware')}
                    >
                      <div
                        className="desktop-dropdown-link has-flyout-trigger"
                        onClick={() => navigate('/shop')}
                      >
                        <span>Homeware</span>
                        <ChevronRight size={13} strokeWidth={1.5} />
                      </div>
                      {activeSubmenu === 'homeware' && (
                        <div className="desktop-submenu-flyout">
                          <Link to="/shop?category=totems" className="desktop-flyout-link">Tribal Totems & Pillars</Link>
                          <Link to="/shop?category=swings" className="desktop-flyout-link">Courtyard Swings (Jhula)</Link>
                          <Link to="/shop?category=cabinets" className="desktop-flyout-link">Damchiya Bridal Chests</Link>
                          <Link to="/shop?category=decor" className="desktop-flyout-link">Brass Bells & Urulis</Link>
                          <Link to="/shop?category=panels" className="desktop-flyout-link">Carved Architectural Panels</Link>
                        </div>
                      )}
                    </div>

                    {/* Soft Furnishings with Flyout */}
                    <div
                      className={`desktop-dropdown-item ${activeSubmenu === 'furnishings' ? 'has-submenu-open' : ''}`}
                      onMouseEnter={() => setActiveSubmenu('furnishings')}
                    >
                      <div
                        className="desktop-dropdown-link has-flyout-trigger"
                        onClick={() => navigate('/shop')}
                      >
                        <span>Soft Furnishings</span>
                        <ChevronRight size={13} strokeWidth={1.5} />
                      </div>
                      {activeSubmenu === 'furnishings' && (
                        <div className="desktop-submenu-flyout">
                          <Link to="/shop?category=cushions" className="desktop-flyout-link">Courtyard Cushion Covers</Link>
                          <Link to="/shop?category=throws" className="desktop-flyout-link">Handwoven Vintage Throws</Link>
                          <Link to="/shop?category=rugs" className="desktop-flyout-link">Heritage Rugs & Dhurries</Link>
                          <Link to="/shop?category=linens" className="desktop-flyout-link">Blockprint Table Linens</Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>

              {/* 3. Shop by Material */}
              <li
                className={`desktop-nav-item has-dropdown ${activeDropdown === 'material' ? 'has-dropdown-open' : ''}`}
                onMouseEnter={() => setActiveDropdown('material')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div
                  className="desktop-nav-link"
                  onClick={() => navigate('/shop')}
                >
                  <span>Shop by Material</span>
                  {activeDropdown === 'material' ? (
                    <ChevronUp size={14} strokeWidth={2} />
                  ) : (
                    <ChevronDown size={14} strokeWidth={2} />
                  )}
                </div>

                {activeDropdown === 'material' && (
                  <div className="desktop-dropdown-menu">
                    <Link to="/shop?material=brass" className="desktop-dropdown-link">Brass & Metal</Link>
                    <Link to="/shop?material=kansa" className="desktop-dropdown-link">Kansa</Link>
                    <Link to="/shop?material=clay" className="desktop-dropdown-link">Ceramic & Clay</Link>
                    <Link to="/shop?material=stone" className="desktop-dropdown-link">Stone & Marble</Link>
                    <Link to="/shop?material=wood" className="desktop-dropdown-link">Wood & Teak</Link>
                    <Link to="/shop?material=textile" className="desktop-dropdown-link">Fabric & Textile</Link>
                    <Link to="/shop?material=cane" className="desktop-dropdown-link">Rattan & Cane</Link>
                  </div>
                )}
              </li>

              {/* 4. Collections */}
              <li
                className={`desktop-nav-item has-dropdown ${activeDropdown === 'collections' ? 'has-dropdown-open' : ''}`}
                onMouseEnter={() => setActiveDropdown('collections')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div
                  className="desktop-nav-link"
                  onClick={() => navigate('/shop')}
                >
                  <span>Collections</span>
                  {activeDropdown === 'collections' ? (
                    <ChevronUp size={14} strokeWidth={2} />
                  ) : (
                    <ChevronDown size={14} strokeWidth={2} />
                  )}
                </div>

                {activeDropdown === 'collections' && (
                  <div className="desktop-dropdown-menu">
                    <Link to="/shop?collection=manduva" className="desktop-dropdown-link">Manduva Courtyard Series</Link>
                    <Link to="/shop?collection=haveli" className="desktop-dropdown-link">Royal Haveli Heritage</Link>
                    <Link to="/shop?collection=chettinad" className="desktop-dropdown-link">Chettinad Teak Living</Link>
                    <Link to="/shop?collection=farmhouse" className="desktop-dropdown-link">Farmhouse & Resort Rustic</Link>
                    <Link to="/shop?collection=temple" className="desktop-dropdown-link">Temple Carvings & Totems</Link>
                  </div>
                )}
              </li>

              {/* 5. Lighting */}
              <li
                className={`desktop-nav-item has-dropdown ${activeDropdown === 'lighting' ? 'has-dropdown-open' : ''}`}
                onMouseEnter={() => setActiveDropdown('lighting')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div
                  className="desktop-nav-link"
                  onClick={() => navigate('/shop?category=lighting')}
                >
                  <span>Lighting</span>
                  {activeDropdown === 'lighting' ? (
                    <ChevronUp size={14} strokeWidth={2} />
                  ) : (
                    <ChevronDown size={14} strokeWidth={2} />
                  )}
                </div>

                {activeDropdown === 'lighting' && (
                  <div className="desktop-dropdown-menu">
                    <Link to="/shop?category=lighting&type=pendant" className="desktop-dropdown-link">Pendant Lamps</Link>
                    <Link to="/shop?category=lighting&type=table" className="desktop-dropdown-link">Table Lamps</Link>
                    <Link to="/shop?category=lighting&type=wall" className="desktop-dropdown-link">Wall Lamps</Link>
                    <Link to="/shop?category=lighting&type=macrame" className="desktop-dropdown-link">Macrame and Crochet lamps</Link>
                    <Link to="/shop?category=lighting&type=floor" className="desktop-dropdown-link">Floor Lamps</Link>
                  </div>
                )}
              </li>

              {/* 6. Gift Hampers */}
              <li className="desktop-nav-item">
                <Link
                  to="/shop?category=hampers"
                  className={`desktop-nav-link ${location.search.includes('category=hampers') ? 'active' : ''}`}
                >
                  Gift Hampers
                </Link>
              </li>

              {/* 7. About */}
              <li
                className={`desktop-nav-item has-dropdown ${activeDropdown === 'about' ? 'has-dropdown-open' : ''}`}
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div
                  className="desktop-nav-link"
                  onClick={() => navigate('/about')}
                >
                  <span>About</span>
                  {activeDropdown === 'about' ? (
                    <ChevronUp size={14} strokeWidth={2} />
                  ) : (
                    <ChevronDown size={14} strokeWidth={2} />
                  )}
                </div>

                {activeDropdown === 'about' && (
                  <div className="desktop-dropdown-menu">
                    <Link to="/about" className="desktop-dropdown-link">Our Story & Heritage</Link>
                    <Link to="/about" className="desktop-dropdown-link">Artisan Legacy</Link>
                    <Link to="/contact" className="desktop-dropdown-link">Visit Moinabad Showroom</Link>
                    <span
                      onClick={() => {
                        if (onOpenBookingModal) onOpenBookingModal();
                        setActiveDropdown(null);
                      }}
                      className="desktop-dropdown-link"
                    >
                      Book Showroom Appointment
                    </span>
                  </div>
                )}
              </li>

              {/* 8. Sale */}
              <li className="desktop-nav-item">
                <Link
                  to="/shop?filter=sale"
                  className={`desktop-nav-link ${location.search.includes('filter=sale') ? 'active' : ''}`}
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-out Drawer */}
      <div
        className={`modal-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: mobileMenuOpen ? '0' : '-320px',
          width: '300px',
          height: '100vh',
          background: '#ffffff',
          zIndex: 1100,
          boxShadow: 'var(--shadow-modal)',
          transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ padding: "20px", borderBottom: "1px solid var(--color-border-light)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/images/logo.jpg" alt="Logo" style={{ height: "38px", borderRadius: "var(--radius-sm)" }} />
            <span style={{ fontFamily: "var(--font-serif-header)", fontSize: "1.15rem", color: "var(--color-primary-darker)" }}>Manduva Logillu</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Search */}
        <div style={{ padding: "16px" }}>
          <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "10px 36px 10px 14px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem" }}
            />
            <button
              type="submit"
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none" }}
            >
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Featured New In Tile */}
        <Link
          to="/shop"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            margin: "0 16px 12px",
            padding: "10px 14px",
            background: "linear-gradient(135deg, #f7f3ee 0%, #ede5da 100%)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            border: "1px solid #e2d8cc"
          }}
        >
          <img
            src="/images/product-totem.jpg"
            alt="New Arrivals"
            style={{ width: "46px", height: "46px", borderRadius: "4px", objectFit: "cover" }}
          />
          <div>
            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-primary)", fontWeight: "700" }}>
              ✦ New Arrivals
            </div>
            <div style={{ fontFamily: "var(--font-serif-header)", fontSize: "0.95rem", color: "#332a21", fontWeight: "600" }}>
              Explore Collection
            </div>
          </div>
          <ChevronRight size={18} style={{ marginLeft: "auto", color: "#8a7b6c" }} />
        </Link>

        {/* Section Label */}
        <div style={{ padding: "6px 16px 6px", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#8f8273" }}>
          Heritage Collections
        </div>

        {/* Mobile Category Sections with Real Photos */}
        <div style={{ flex: "1", overflowY: "auto", padding: "0 16px" }}>
          {categorySections.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "9px 0",
                borderBottom: "1px solid #f2ede7",
                textDecoration: "none"
              }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "6px", overflow: "hidden", background: "#f8f5f0", flexShrink: 0, border: "1px solid #ebe4dc" }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: "600", color: "#362e26" }}>
                  {cat.name}
                </div>
              </div>
              {cat.badge && (
                <span style={{ fontSize: "0.6rem", background: "#8f6c4a", color: "#ffffff", padding: "2px 6px", borderRadius: "3px", textTransform: "uppercase", fontWeight: "700" }}>
                  {cat.badge}
                </span>
              )}
              <ChevronRight size={15} style={{ color: "#b3a696" }} />
            </Link>
          ))}

          {/* Shop by Material Section in Mobile Drawer */}
          <div style={{ padding: "14px 0 6px", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#8f8273" }}>
            Shop by Material
          </div>
          {materialSections.map((mat) => (
            <Link
              key={mat.name}
              to={mat.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 0",
                borderBottom: "1px solid #f2ede7",
                textDecoration: "none"
              }}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "6px", overflow: "hidden", background: "#f8f5f0", flexShrink: 0, border: "1px solid #ebe4dc" }}>
                <img
                  src={mat.image}
                  alt={mat.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", fontWeight: "600", color: "#362e26" }}>
                  {mat.name}
                </div>
              </div>
              <ChevronRight size={15} style={{ color: "#b3a696" }} />
            </Link>
          ))}

          {/* More Links */}
          <div style={{ padding: "14px 0 6px", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#8f8273" }}>
            Information
          </div>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f2ede7", fontSize: "0.84rem", fontWeight: "600", color: "#443c33", textDecoration: "none" }}
          >
            <span>Our Heritage</span>
            <ChevronRight size={15} style={{ color: "#b3a696" }} />
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f2ede7", fontSize: "0.84rem", fontWeight: "600", color: "#443c33", textDecoration: "none" }}
          >
            <span>Visit Showroom</span>
            <ChevronRight size={15} style={{ color: "#b3a696" }} />
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBookingModal();
            }}
            style={{ width: "100%", marginTop: "16px", marginBottom: "16px", textAlign: "center" }}
            className="btn btn-primary btn-sm"
          >
            Book Showroom Visit
          </button>
        </div>

        <div style={{ padding: "14px 16px", borderTop: "1px solid var(--color-border-light)", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
          📍 1st Floor opp. Gurukul, Moinabad, Hyderabad
        </div>
      </div>

      {/* Tesu India Floating Browse Pill */}
      <div className="tesu-floating-pill-wrap">
        <Link to="/shop" className="tesu-browse-pill">
          <span className="pill-star">✦</span>
          <span>Browse this collection?</span>
        </Link>
      </div>

      {/* Tesu India Mobile Bottom Sticky Navigation Bar */}
      <nav className="tesu-bottom-bar" aria-label="Mobile Bottom Navigation">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <Home size={19} strokeWidth={1.5} />
          <span>Home</span>
        </Link>
        <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
          <LayoutGrid size={19} strokeWidth={1.5} />
          <span>Collections</span>
        </Link>
        <button
          onClick={openCart}
          aria-label="View shopping cart"
        >
          <ShoppingBag size={19} strokeWidth={1.5} />
          {totalItems > 0 && <span className="bottom-badge-count">{totalItems}</span>}
          <span>Bag</span>
        </button>
        <button
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Search furniture"
        >
          <Search size={19} strokeWidth={1.5} />
          <span>Search</span>
        </button>
        <button
          onClick={() => {
            if (isAuthenticated) navigate('/profile');
            else openAuthModal('login');
          }}
          aria-label="Account profile"
        >
          <User size={19} strokeWidth={1.5} />
          <span>Account</span>
        </button>
      </nav>
    </>
  );
}
