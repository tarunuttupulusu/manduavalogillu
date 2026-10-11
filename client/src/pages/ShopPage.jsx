import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, RotateCcw, SlidersHorizontal, Eye, Check } from 'lucide-react';
import { api } from '../services/api';

export default function ShopPage({ onQuickView }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialMaterial = searchParams.get('material') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeMaterial, setActiveMaterial] = useState(initialMaterial);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [viewMode, setViewMode] = useState('grid2'); // 'grid2' (2-col) or 'list' (1-col)
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' or 'in_stock'

  // Accordion open/close states inside the Tesu Filter Drawer
  const [openSections, setOpenSections] = useState({
    availability: true,
    material: true,
    category: true,
    price: true,
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    { label: 'All Pieces', val: 'all', img: '/images/product-totem.jpg' },
    { label: 'Tribal Totems & Pillars', val: 'totems', img: '/images/product-totem.jpg' },
    { label: 'Courtyard Swings (Jhula)', val: 'swings', img: '/images/product-jhula.jpg' },
    { label: 'Showcase Almirahs', val: 'almirah', img: '/images/product-almirah.jpg' },
    { label: 'Vintage Mirrors', val: 'mirrors', img: '/images/product-mirror.jpg' },
    { label: 'Sofa Sets', val: 'sofas', img: '/images/product-sofa.jpg' },
    { label: 'Dining Tables', val: 'tables', img: '/images/product-table.jpg' },
    { label: 'Chairs & Rockers', val: 'chairs', img: '/images/product-chair.jpg' },
    { label: 'Cabinets & Damchiya', val: 'cabinets', img: '/images/product-damchiya.jpg' },
    { label: 'Bookshelves', val: 'shelves', img: '/images/product-shelf.jpg' },
    { label: 'Heritage Lighting', val: 'lighting', img: '/images/product-pendant-lamp.jpg' },
    { label: 'Brass Decor & Vessels', val: 'decor', img: '/images/product-brass-uruli.jpg' }
  ];

  const materials = [
    { label: 'All Materials', val: 'all', img: null, icon: '✦' },
    { label: 'Brass & Metal', val: 'brass', img: '/images/product-brass-uruli.jpg' },
    { label: 'Pure Kansa', val: 'kansa', img: '/images/product-kansa-set.jpg' },
    { label: 'Ceramic & Clay', val: 'clay', img: '/images/product-terracotta-urn.jpg' },
    { label: 'Stone & Marble', val: 'stone', img: '/images/product-marble-platter.jpg' },
    { label: 'Wood & Teak', val: 'wood', img: '/images/product-totem.jpg' },
    { label: 'Fabric & Textile', val: 'textile', img: '/images/product-kilim-rug.jpg' },
    { label: 'Rattan & Cane', val: 'cane', img: '/images/product-cane-screen.jpg' }
  ];

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const mat = searchParams.get('material') || 'all';
    const q = searchParams.get('search') || '';
    setActiveCategory(cat);
    setActiveMaterial(mat);
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory && activeCategory !== 'all') {
          params.category = activeCategory;
        }
        if (activeMaterial && activeMaterial !== 'all') {
          params.material = activeMaterial;
        }
        if (searchQuery) {
          params.search = searchQuery;
        }
        const res = await api.getProducts(params);
        let list = res.products || [];

        // Apply max price filter
        list = list.filter(p => Number(p.price) <= maxPrice);

        // Apply availability filter
        if (availabilityFilter === 'in_stock') {
          list = list.filter(p => !p.badge || !p.badge.toLowerCase().includes('sold'));
        }

        // Apply sorting matching Tesu India
        if (sortBy === 'price-low') {
          list.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === 'price-high') {
          list.sort((a, b) => Number(b.price) - Number(a.price));
        } else if (sortBy === 'alpha-asc') {
          list.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'rating') {
          list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        }

        setProducts(list);
      } catch (err) {
        console.error('Failed to fetch shop products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [activeCategory, activeMaterial, searchQuery, sortBy, maxPrice, availabilityFilter]);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleMaterialSelect = (mat) => {
    setActiveMaterial(mat);
    if (mat === 'all') {
      searchParams.delete('material');
    } else {
      searchParams.set('material', mat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveMaterial('all');
    setSearchQuery('');
    setSortBy('default');
    setMaxPrice(250000);
    setAvailabilityFilter('all');
    setSearchParams({});
    setFilterModalOpen(false);
  };

  const formatPrice = (price) => '₹ ' + Number(price).toLocaleString('en-IN');

  const selectedMaterialObj = materials.find(m => m.val === activeMaterial);
  const selectedCategoryObj = categories.find(c => c.val === activeCategory);

  // Dynamic titles and breadcrumbs matching Tesu India
  let pageTitle = 'Products';

  if (searchQuery) {
    pageTitle = `Search: "${searchQuery}"`;
  } else if (activeMaterial !== 'all' && selectedMaterialObj) {
    pageTitle = `${selectedMaterialObj.label}`;
  } else if (activeCategory !== 'all' && selectedCategoryObj) {
    pageTitle = selectedCategoryObj.label;
  }

  const activeFilterCount = [
    activeCategory !== 'all',
    activeMaterial !== 'all',
    searchQuery !== '',
    availabilityFilter !== 'all',
    maxPrice < 250000
  ].filter(Boolean).length;

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "85vh", paddingBottom: "90px" }}>
      {/* 1. Tesu India Collection Header & Breadcrumbs */}
      <div className="tesu-collection-header">
        <h1 className="tesu-collection-title">{pageTitle}</h1>

        <div className="tesu-breadcrumbs" role="navigation" aria-label="breadcrumbs">
          <Link to="/">Home</Link>
          <span className="tesu-breadcrumb-sep" aria-hidden="true">
            <svg width="8" height="8" viewBox="0 0 256 512" fill="currentColor">
              <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/>
            </svg>
          </span>
          <Link to="/shop" onClick={() => handleResetFilters()}>Products</Link>
          {activeMaterial !== 'all' && selectedMaterialObj && (
            <>
              <span className="tesu-breadcrumb-sep" aria-hidden="true">
                <svg width="8" height="8" viewBox="0 0 256 512" fill="currentColor">
                  <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/>
                </svg>
              </span>
              <span>{selectedMaterialObj.label}</span>
            </>
          )}
          {activeCategory !== 'all' && selectedCategoryObj && (
            <>
              <span className="tesu-breadcrumb-sep" aria-hidden="true">
                <svg width="8" height="8" viewBox="0 0 256 512" fill="currentColor">
                  <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/>
                </svg>
              </span>
              <span>{selectedCategoryObj.label}</span>
            </>
          )}
        </div>

        <p className="tesu-collection-desc">
          {activeMaterial !== 'all'
            ? `Discover handcrafted heirlooms sculpted from authentic ${selectedMaterialObj?.label}. Each piece reflects generational Indian artistry and timeless courtyard estate elegance.`
            : 'Say hello to fresh finds and modern classics. Explore our newest collection and bring home designs that feel current, warm, and beautifully crafted.'}
        </p>
      </div>

      <div className="container" style={{ padding: "0 16px" }}>
        {/* 2. Interactive "Shop by Material" Luxury Swatch Pill Bar */}
        <div className="shop-material-filter-bar">
          <div className="material-section-eyebrow">
            <span>Explore Handcrafted Materials</span>
          </div>
          <div className="material-filter-scroll-wrap">
            {materials.map((m) => {
              const isSelected = activeMaterial === m.val;
              return (
                <button
                  key={m.val}
                  onClick={() => handleMaterialSelect(m.val)}
                  className={`material-pill-item ${isSelected ? 'active' : ''}`}
                >
                  {m.img ? (
                    <img src={m.img} alt={m.label} className="material-pill-swatch-img" />
                  ) : (
                    <span className="material-swatch-all">✦</span>
                  )}
                  <span className="material-pill-text">{m.label}</span>
                  {isSelected && m.val !== 'all' && (
                    <span
                      className="material-pill-remove"
                      title="Clear material filter"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMaterialSelect('all');
                      }}
                    >
                      ×
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Tesu India Toolbar: Filter, Sort & View Mode Switcher */}
        <div className="tesu-toolbar">
          <div className="tesu-toolbar-left">
            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setFilterModalOpen(true)}
              className="tesu-filter-dropdown-btn"
              aria-label="Open filter options"
            >
              <SlidersHorizontal size={15} />
              <span>Filters ({activeFilterCount})</span>
              <ChevronDown size={14} />
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="tesu-clean-reset-pill"
                title="Clear all active filters"
              >
                Clear all filters ×
              </button>
            )}

            {/* Sort Dropdown */}
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: "var(--font-serif-body)",
                  fontSize: "1rem",
                  color: "#3c352d",
                  cursor: "pointer",
                  paddingRight: "18px",
                  outline: "none"
                }}
              >
                <option value="default">Featured</option>
                <option value="alpha-asc">Alphabetically, A-Z</option>
                <option value="price-low">Price, low to high</option>
                <option value="price-high">Price, high to low</option>
                <option value="rating">Artisan Rating</option>
              </select>
              <ChevronDown size={14} style={{ position: "absolute", right: 0, pointerEvents: "none", color: "#555" }} />
            </div>
          </div>

          {/* View Mode Switcher: 1-Column vs 2-Column Grid */}
          <div className="tesu-toolbar-right">
            <button
              onClick={() => setViewMode('list')}
              className={`tesu-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="List view (1 column)"
              title="1 Column View"
            >
              <Menu size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid2')}
              className={`tesu-view-btn ${viewMode === 'grid2' ? 'active' : ''}`}
              aria-label="Grid view (2 columns)"
              title="2 Columns View"
            >
              <span style={{ fontWeight: "700", letterSpacing: "-2px", fontSize: "13px" }}>||</span>
            </button>
          </div>
        </div>

        {/* 4. Products Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--color-text-muted)", fontFamily: "var(--font-serif-body)" }}>
            Loading handcrafted pieces...
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--color-warm-bg)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--color-border)" }}>
            <h3 style={{ fontFamily: "var(--font-serif-header)", marginBottom: "8px" }}>No matching pieces found</h3>
            <p style={{ color: "var(--color-text-body)", maxWidth: "480px", margin: "0 auto 24px", fontSize: "0.95rem" }}>
              We couldn't find any pieces matching your current filter selection. Try selecting another material or clearing filters.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              View All Heritage Pieces
            </button>
          </div>
        ) : (
          <div className={`tesu-products-grid ${viewMode === 'grid2' ? 'tesu-grid-2' : 'tesu-grid-1'}`}>
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id || product.slug}`}
                className="tesu-product-card"
              >
                <div className="tesu-product-image-box">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  {product.material && (
                    <span className="product-material-tag">
                      {product.material.split('&')[0].trim()}
                    </span>
                  )}
                  {onQuickView && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="tesu-quick-view-overlay-btn"
                      title="Quick View"
                    >
                      <Eye size={16} /> Quick View
                    </button>
                  )}
                </div>
                <h3 className="tesu-product-title">{product.name}</h3>
                <div className="tesu-product-price">{formatPrice(product.price)}</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 5. Authentic Tesu India Sliding Filter Drawer */}
      <div 
        className={`tesu-drawer-backdrop ${filterModalOpen ? 'open' : ''}`} 
        onClick={() => setFilterModalOpen(false)} 
      />
      <aside 
        className={`tesu-filter-drawer ${filterModalOpen ? 'open' : ''}`}
        aria-label="Filter collection"
      >
        <div className="tesu-drawer-header">
          <h3 className="tesu-drawer-title">Filters</h3>
          <button
            onClick={() => setFilterModalOpen(false)}
            className="tesu-drawer-close-btn"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="tesu-drawer-body">
          {/* Accordion 1: Availability */}
          <div className="tesu-filter-accordion-item">
            <button
              type="button"
              className="tesu-filter-accordion-btn"
              onClick={() => toggleSection('availability')}
            >
              <span>Availability</span>
              {openSections.availability ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.availability && (
              <div className="tesu-filter-accordion-content">
                <ul className="tesu-facet-list">
                  <li
                    className={`tesu-facet-label ${availabilityFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setAvailabilityFilter('all')}
                  >
                    <span className="tesu-facet-box">
                      {availabilityFilter === 'all' && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className="tesu-facet-name">All Collection</span>
                    <span className="tesu-facet-count">({products.length})</span>
                  </li>
                  <li
                    className={`tesu-facet-label ${availabilityFilter === 'in_stock' ? 'active' : ''}`}
                    onClick={() => setAvailabilityFilter('in_stock')}
                  >
                    <span className="tesu-facet-box">
                      {availabilityFilter === 'in_stock' && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className="tesu-facet-name">In Stock & Ready to Ship</span>
                    <span className="tesu-facet-count">({products.filter(p => !p.badge || !p.badge.toLowerCase().includes('sold')).length})</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Accordion 2: Shop by Material */}
          <div className="tesu-filter-accordion-item">
            <button
              type="button"
              className="tesu-filter-accordion-btn"
              onClick={() => toggleSection('material')}
            >
              <span>Material</span>
              {openSections.material ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.material && (
              <div className="tesu-filter-accordion-content">
                <ul className="tesu-facet-list">
                  {materials.map((m) => {
                    const isSelected = activeMaterial === m.val;
                    return (
                      <li
                        key={m.val}
                        className={`tesu-facet-label ${isSelected ? 'active' : ''}`}
                        onClick={() => handleMaterialSelect(m.val)}
                      >
                        <span className="tesu-facet-box">
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </span>
                        {m.img ? (
                          <img src={m.img} alt={m.label} className="tesu-facet-thumb" />
                        ) : (
                          <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#8f6c4a", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", flexShrink: 0 }}>✦</span>
                        )}
                        <span className="tesu-facet-name">{m.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Accordion 3: Heritage Categories */}
          <div className="tesu-filter-accordion-item">
            <button
              type="button"
              className="tesu-filter-accordion-btn"
              onClick={() => toggleSection('category')}
            >
              <span>Heritage Category</span>
              {openSections.category ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.category && (
              <div className="tesu-filter-accordion-content">
                <ul className="tesu-facet-list">
                  {categories.map((c) => {
                    const isSelected = activeCategory === c.val;
                    return (
                      <li
                        key={c.val}
                        className={`tesu-facet-label ${isSelected ? 'active' : ''}`}
                        onClick={() => handleCategorySelect(c.val)}
                      >
                        <span className="tesu-facet-box">
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </span>
                        <img src={c.img} alt={c.label} className="tesu-facet-thumb" />
                        <span className="tesu-facet-name">{c.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Accordion 4: Price Range */}
          <div className="tesu-filter-accordion-item">
            <button
              type="button"
              className="tesu-filter-accordion-btn"
              onClick={() => toggleSection('price')}
            >
              <span>Price</span>
              {openSections.price ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.price && (
              <div className="tesu-filter-accordion-content">
                <div className="tesu-price-fields">
                  <div className="tesu-price-field">
                    <span>₹</span>
                    <input type="text" readOnly value="15,000" />
                  </div>
                  <span className="tesu-price-to">to</span>
                  <div className="tesu-price-field">
                    <span>₹</span>
                    <input type="text" readOnly value={maxPrice.toLocaleString('en-IN')} />
                  </div>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="250000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: "100%", cursor: "pointer", accentColor: "#8f6c4a" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sticky Drawer Footer */}
        <div className="tesu-drawer-footer">
          <button
            type="button"
            onClick={handleResetFilters}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
          >
            <RotateCcw size={14} /> Clear All
          </button>
          <button
            type="button"
            onClick={() => setFilterModalOpen(false)}
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
          >
            Apply ({products.length})
          </button>
        </div>
      </aside>
    </div>
  );
}

