/* ============================================
   MANDUVA LOGILLU FURNITURES - Main Application JS
   Full E-commerce Functionality
   ============================================ */

// ---- Product Data Store ----
const PRODUCTS = [
  {
    id: 10,
    name: "Naga Ancestor Totem Wood Carving",
    type: "Totems & Sculptures",
    category: "totems",
    price: 156000,
    originalPrice: 185000,
    image: "assets/images/product-totem.jpg",
    images: ["assets/images/product-totem.jpg"],
    description: "Authentic antique Naga Ancestor carved dark weathered timber totem pillar sculpture. Hand-chiselled figures depicting ancestral tribal lore. An extraordinary statement piece for luxury resort interiors, farmhouses, and curated art spaces.",
    badge: "Rare Heirloom",
    rating: 5,
    sku: "ML-TOT-001",
    material: "Aged Weathered Hardwood",
    dimensions: "210cm x 28cm x 22cm",
    inStock: true
  },
  {
    id: 11,
    name: "Naga Bull Tribal Carved Pillar",
    type: "Tribal Pillars",
    category: "totems",
    price: 130000,
    originalPrice: 155000,
    image: "assets/images/product-bull-pillar.jpg",
    images: ["assets/images/product-bull-pillar.jpg"],
    description: "Hand-carved vintage Naga tribal timber pillar sculpture featuring a prominent horned bull head and warrior guardian figures. Finished in a rich scorched wood patina with organic textures.",
    badge: "Editorial Pick",
    rating: 5,
    sku: "ML-PIL-002",
    material: "Solid Reclaimed Timber",
    dimensions: "195cm x 32cm x 26cm",
    inStock: true
  },
  {
    id: 12,
    name: "Heritage Manduva Courtyard Carved Jhula",
    type: "Courtyard Swings",
    category: "swings",
    price: 185000,
    originalPrice: 220000,
    image: "assets/images/product-jhula.jpg",
    images: ["assets/images/product-jhula.jpg"],
    description: "Traditional South Indian Manduva Logillu carved swing (Oonjal / Jhula) crafted from solid seasoned teak wood. Suspended by heavy cast ornamental brass chains with parrot and peacock links. A timeless centerpiece for central courtyards and open verandas.",
    badge: "Heritage Icon",
    rating: 5,
    sku: "ML-JHU-001",
    material: "Aged Seasoned Teak Wood & Solid Cast Brass",
    dimensions: "180cm x 85cm x 75cm",
    inStock: true
  },
  {
    id: 13,
    name: "Antique Carved Damchiya Bridal Chest",
    type: "Chests & Consoles",
    category: "cabinets",
    price: 95000,
    originalPrice: 120000,
    image: "assets/images/product-damchiya.jpg",
    images: ["assets/images/product-damchiya.jpg"],
    description: "Museum-grade antique Damchiya bridal chest sideboard console featuring relief-carved elephant panels, geometric friezes, inset mirror glass accents, and traditional wrought-iron hardware. Perfect as an entryway statement or resort lounge console.",
    badge: "One of a Kind",
    rating: 5,
    sku: "ML-DAM-001",
    material: "Antique Teak Wood, Mirror Inlay & Wrought Iron",
    dimensions: "135cm x 50cm x 92cm",
    inStock: true
  },
  {
    id: 1,
    name: "Royal Carved Showcase Almirah",
    type: "Showcase Almirah",
    category: "almirah",
    price: 45999,
    originalPrice: 59999,
    image: "assets/images/product-almirah.jpg",
    images: ["assets/images/product-almirah.jpg"],
    description: "Handcrafted vintage showcase almirah made from premium teak wood. Features intricate floral carvings, glass-paneled doors, and four spacious drawers with brass knobs. Perfect for resort and farmhouse interiors.",
    badge: "Best Seller",
    rating: 5,
    sku: "ML-ALM-001",
    material: "Teak Wood",
    dimensions: "180cm x 90cm x 45cm",
    inStock: true
  },
  {
    id: 2,
    name: "Antique Ornate Wall Mirror",
    type: "Mirrors",
    category: "mirrors",
    price: 18999,
    originalPrice: 24999,
    image: "assets/images/product-mirror.jpg",
    images: ["assets/images/product-mirror.jpg"],
    description: "Stunning vintage ornate wall mirror with intricate Indian motifs and floral carvings. Antique teak wood frame with gold accents. A statement piece for resort and farmhouse decor.",
    badge: "New",
    rating: 5,
    sku: "ML-MIR-001",
    material: "Reclaimed Wood & Glass",
    dimensions: "120cm x 80cm",
    inStock: true
  },
  {
    id: 3,
    name: "Victorian Carved Sofa Set",
    type: "Sofa Sets",
    category: "sofas",
    price: 89999,
    originalPrice: 115000,
    image: "assets/images/product-sofa.jpg",
    images: ["assets/images/product-sofa.jpg"],
    description: "Beautiful vintage handcrafted wooden sofa set (3+1+1) with intricate carvings. Upholstered in premium cream fabric cushions. Pure teak wood construction for lasting elegance.",
    badge: "Premium",
    rating: 5,
    sku: "ML-SOF-001",
    material: "Teak Wood & Premium Fabric",
    dimensions: "Sofa: 180cm, Chairs: 80cm",
    inStock: true
  },
  {
    id: 4,
    name: "Heritage Carved Dining Table",
    type: "Tables",
    category: "tables",
    price: 55999,
    originalPrice: 72000,
    image: "assets/images/product-table.jpg",
    images: ["assets/images/product-table.jpg"],
    description: "Vintage handcrafted dining table with ornately carved legs and rich detailing. Made from solid reclaimed wood. Seats 6 comfortably. Perfect centerpiece for farmhouse dining rooms.",
    badge: "Sale",
    badgeType: "sale",
    rating: 4,
    sku: "ML-TBL-001",
    material: "Reclaimed Teak Wood",
    dimensions: "180cm x 90cm x 78cm",
    inStock: true
  },
  {
    id: 5,
    name: "Colonial Cane Rocking Chair",
    type: "Chairs",
    category: "chairs",
    price: 22999,
    originalPrice: 28999,
    image: "assets/images/product-chair.jpg",
    images: ["assets/images/product-chair.jpg"],
    description: "Beautiful vintage handcrafted rocking chair with intricate Indian carvings and woven cane seat. Premium teak wood construction. Perfect for verandas, living rooms, and resort patios.",
    badge: "Popular",
    rating: 5,
    sku: "ML-CHR-001",
    material: "Teak Wood & Cane",
    dimensions: "110cm x 65cm x 85cm",
    inStock: true
  },
  {
    id: 6,
    name: "Rajasthani Carved Sideboard",
    type: "Cabinets",
    category: "cabinets",
    price: 38999,
    originalPrice: 49999,
    image: "assets/images/product-cabinet.jpg",
    images: ["assets/images/product-cabinet.jpg"],
    description: "Vintage Indian wooden sideboard cabinet with carved doors and brass hardware. Reclaimed wood with a beautifully distressed finish. Heritage craftsmanship meets modern storage.",
    badge: "",
    rating: 4,
    sku: "ML-CAB-001",
    material: "Reclaimed Mango Wood & Brass",
    dimensions: "150cm x 85cm x 45cm",
    inStock: true
  },
  {
    id: 7,
    name: "Mughal Arch Bookshelf",
    type: "Shelves",
    category: "shelves",
    price: 32999,
    originalPrice: 42000,
    image: "assets/images/product-shelf.jpg",
    images: ["assets/images/product-shelf.jpg"],
    description: "Vintage wooden bookshelf featuring a beautiful Mughal arch design with carved frame and five spacious shelves. Natural teak grain finish. Ideal for farmhouse and resort libraries.",
    badge: "New",
    rating: 5,
    sku: "ML-SHF-001",
    material: "Teak Wood",
    dimensions: "190cm x 100cm x 35cm",
    inStock: true
  },
  {
    id: 8,
    name: "Antique Console Table",
    type: "Tables",
    category: "tables",
    price: 28999,
    originalPrice: 35000,
    image: "assets/images/product-table.jpg",
    images: ["assets/images/product-table.jpg"],
    description: "Handcrafted vintage console table with ornate carvings and elegant curved legs. Made from solid reclaimed teak wood. A perfect entryway statement piece for resort lobbies and homes.",
    badge: "",
    rating: 4,
    sku: "ML-TBL-002",
    material: "Reclaimed Teak Wood",
    dimensions: "120cm x 40cm x 85cm",
    inStock: true,
    materialGroup: "wood"
  },
  {
    id: 14,
    name: "Handcrafted Cast Brass Peacock Uruli Bowl",
    type: "Brass & Metal",
    category: "decor",
    materialGroup: "brass",
    price: 24500,
    originalPrice: 32000,
    image: "assets/images/product-brass-uruli.jpg",
    images: ["assets/images/product-brass-uruli.jpg"],
    description: "Centuries-old lost-wax cast antique brass Uruli floating water basin featuring handcrafted peacock handle finials and embossed temple floral gadroons. Fills courtyard entrances with fresh marigolds, floating jasmine, and tea light candles.",
    badge: "Artisan Brass",
    rating: 5,
    sku: "ML-BRS-001",
    material: "Solid Cast Antique Brass",
    dimensions: "45cm Dia x 28cm H",
    inStock: true
  },
  {
    id: 15,
    name: "Heritage Hand-Beaten Pure Kansa Dinner Thali Set",
    type: "Kansa Bronze Dining",
    category: "dining",
    materialGroup: "kansa",
    price: 16500,
    originalPrice: 21000,
    image: "assets/images/product-kansa-set.jpg",
    images: ["assets/images/product-kansa-set.jpg"],
    description: "Authentic 7-piece hand-beaten pure Kansa (78% copper, 22% tin bell metal) royal thali feast set. Crafted in traditional Indian foundry workshops, scientifically known to balance doshas and enhance dining wellness in heritage homes.",
    badge: "Pure Kansa",
    rating: 5,
    sku: "ML-KAN-001",
    material: "Pure Hand-Beaten Kansa (Bell Metal)",
    dimensions: "Thali 34cm Dia, 4 Bowls, 1 Tumbler, 1 Spoon",
    inStock: true
  },
  {
    id: 16,
    name: "Hand-Thrust Terracotta Courtyard Urns (Pair)",
    type: "Ceramic & Terracotta",
    category: "decor",
    materialGroup: "clay",
    price: 18500,
    originalPrice: 24000,
    image: "assets/images/product-terracotta-urn.jpg",
    images: ["assets/images/product-terracotta-urn.jpg"],
    description: "Pair of monumental hand-thrown red clay terracotta courtyard urns featuring tribal geometric relief friezes and weathered antique patina. Sourced from generational potter guilds, perfect for verandas, bougainvillea pots, and rustic resort entryways.",
    badge: "Earth & Clay",
    rating: 5,
    sku: "ML-CLY-001",
    material: "Natural Terracotta Red Clay",
    dimensions: "75cm H x 48cm Dia each",
    inStock: true
  },
  {
    id: 17,
    name: "Makrana White Marble Hand-Carved Water Platter",
    type: "Stone & Marble Inlay",
    category: "decor",
    materialGroup: "stone",
    price: 36000,
    originalPrice: 48000,
    image: "assets/images/product-marble-platter.jpg",
    images: ["assets/images/product-marble-platter.jpg"],
    description: "Hand-sculpted fluted water vessel basin platter chiselled from pure Makrana white marble. Adorned with delicate floral Pietra Dura semi-precious lapis, malachite, and carnelian stone inlay along the scalloped rim.",
    badge: "Pietra Dura",
    rating: 5,
    sku: "ML-STN-001",
    material: "Makrana White Marble & Pietra Dura Inlay",
    dimensions: "42cm Dia x 22cm H",
    inStock: true
  },
  {
    id: 18,
    name: "Heritage Handwoven Vintage Kilim Wool Rug",
    type: "Textiles & Rugs",
    category: "decor",
    materialGroup: "textile",
    price: 28500,
    originalPrice: 38000,
    image: "assets/images/product-kilim-rug.jpg",
    images: ["assets/images/product-kilim-rug.jpg"],
    description: "Masterpiece flat-weave heritage Kilim rug handspun with 100% pure mountain wool and naturally dyed with madder root, indigo, and turmeric saffron. Geometric tribal amulets and diamond motifs designed to grace courtyard verandas and living salons.",
    badge: "Handwoven",
    rating: 5,
    sku: "ML-TXT-001",
    material: "100% Handspun Pure Wool",
    dimensions: "240cm L x 150cm W (8ft x 5ft)",
    inStock: true
  },
  {
    id: 19,
    name: "3-Panel Hand-Woven Cane Partition Screen",
    type: "Rattan & Screens",
    category: "chairs",
    materialGroup: "cane",
    price: 34500,
    originalPrice: 44000,
    image: "assets/images/product-cane-screen.jpg",
    images: ["assets/images/product-cane-screen.jpg"],
    description: "Tri-fold architectural room divider handcrafted in solid seasoned teak wood with woven natural octagonal rattan cane webbing. Provides breezy tropical airflow and visual privacy for resort bedrooms, verandas, and luxury dressing suites.",
    badge: "Artisan Cane",
    rating: 5,
    sku: "ML-CAN-002",
    material: "Seasoned Teak Wood & Natural Rattan Cane",
    dimensions: "182cm H x 155cm W total (3 Panels x 50cm)",
    inStock: true
  },
  {
    id: 20,
    name: "Handcrafted Perforated Brass & Cane Pendant Lamp",
    type: "Heritage Lighting",
    category: "lighting",
    materialGroup: "brass",
    price: 14500,
    originalPrice: 19500,
    image: "assets/images/product-pendant-lamp.jpg",
    images: ["assets/images/product-pendant-lamp.jpg"],
    description: "Atmospheric celestial hanging pendant lamp handcrafted from hand-hammered perforated brass and fine woven natural cane. Casts enchanting jali shadow patterns across heritage verandas, dining tables, and courtyard arches.",
    badge: "Lighting Icon",
    rating: 5,
    sku: "ML-LGT-001",
    material: "Perforated Antiqued Brass & Woven Cane",
    dimensions: "40cm Dia x 45cm H (with 1.5m brass chain)",
    inStock: true
  }
];

// ---- Application State ----
const AppState = {
  cart: JSON.parse(localStorage.getItem('ml_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('ml_wishlist') || '[]'),
  user: JSON.parse(localStorage.getItem('ml_user') || 'null'),
  currentPage: 'home',
  searchQuery: '',
  activeCategory: 'all',
  activeMaterial: 'all',
  shopViewMode: 'grid2',
  shopSort: 'featured'
};

// ---- Cart Management ----
const Cart = {
  add(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = AppState.cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      AppState.cart.push({ id: productId, qty });
    }
    this.save();
    this.updateUI();
    showToast(`${product.name} added to cart!`, 'success');
  },

  remove(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    this.save();
    this.updateUI();
    renderCartSidebar();
  },

  updateQty(productId, qty) {
    const item = AppState.cart.find(i => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      this.save();
      this.updateUI();
      renderCartSidebar();
    }
  },

  getTotal() {
    return AppState.cart.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  },

  getCount() {
    return AppState.cart.reduce((sum, item) => sum + item.qty, 0);
  },

  save() {
    localStorage.setItem('ml_cart', JSON.stringify(AppState.cart));
  },

  updateUI() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.getCount();
      el.style.display = this.getCount() > 0 ? 'flex' : 'none';
    });
  },

  clear() {
    AppState.cart = [];
    this.save();
    this.updateUI();
    renderCartSidebar();
  }
};

// ---- Wishlist Management ----
const Wishlist = {
  toggle(productId) {
    const idx = AppState.wishlist.indexOf(productId);
    if (idx > -1) {
      AppState.wishlist.splice(idx, 1);
      showToast('Removed from wishlist', 'info');
    } else {
      AppState.wishlist.push(productId);
      const product = PRODUCTS.find(p => p.id === productId);
      showToast(`${product.name} added to wishlist!`, 'success');
    }
    localStorage.setItem('ml_wishlist', JSON.stringify(AppState.wishlist));
    this.updateUI();
  },

  isInWishlist(productId) {
    return AppState.wishlist.includes(productId);
  },

  updateUI() {
    document.querySelectorAll('.wishlist-count').forEach(el => {
      el.textContent = AppState.wishlist.length;
      el.style.display = AppState.wishlist.length > 0 ? 'flex' : 'none';
    });
  }
};

// ---- Auth Management ----
const Auth = {
  login(email, password) {
    const users = JSON.parse(localStorage.getItem('ml_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      AppState.user = { name: user.name, email: user.email };
      localStorage.setItem('ml_user', JSON.stringify(AppState.user));
      showToast(`Welcome back, ${user.name}!`, 'success');
      closeAuthModal();
      updateAuthUI();
      return true;
    }
    showToast('Invalid email or password', 'error');
    return false;
  },

  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('ml_users') || '[]');
    if (users.find(u => u.email === email)) {
      showToast('Email already registered', 'error');
      return false;
    }
    users.push({ name, email, password });
    localStorage.setItem('ml_users', JSON.stringify(users));
    AppState.user = { name, email };
    localStorage.setItem('ml_user', JSON.stringify(AppState.user));
    showToast(`Welcome, ${name}! Account created successfully.`, 'success');
    closeAuthModal();
    updateAuthUI();
    return true;
  },

  logout() {
    AppState.user = null;
    localStorage.removeItem('ml_user');
    showToast('Logged out successfully', 'success');
    updateAuthUI();
  }
};

// ---- Utility Functions ----
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function renderStars(rating) {
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      html += '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    } else {
      html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
  }
  return html;
}

// ---- Product Card Component ----
function createProductCard(product) {
  const isWishlisted = Wishlist.isInWishlist(product.id);
  return `
    <div class="product-card animate-on-scroll" data-product-id="${product.id}">
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-card-badge ${product.badgeType || ''}">${product.badge}</span>` : ''}
        <div class="product-card-actions">
          <button class="product-action-btn" onclick="Wishlist.toggle(${product.id})" title="Wishlist">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="product-action-btn" onclick="showProductDetail(${product.id})" title="Quick View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        <div class="product-card-quick-add">
          <button onclick="Cart.add(${product.id})">Add to Cart</button>
        </div>
      </div>
      <div class="product-card-info">
        <div class="product-card-type">${product.type}</div>
        <h4 class="product-card-title">
          <a href="#" onclick="showProductDetail(${product.id}); return false;">${product.name}</a>
        </h4>
        <div class="product-card-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-card-rating">${renderStars(product.rating)}</div>
      </div>
    </div>
  `;
}

// ---- Page Renderers ----
function renderHomePage() {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <!-- Hero Section (Clean photographic showcase) -->
    <section class="hero" id="hero">
      <div class="hero-slide">
        <a href="#" onclick="navigateTo('shop'); return false;" aria-label="Explore Collection" style="display: block; width: 100%; height: 100%;">
          <img src="assets/images/hero-banner.jpg" alt="Manduva Logillu Furnitures - Resort & Farm Furnitures">
        </a>
      </div>
    </section>

    <!-- Features Bar -->
    <section class="features-bar">
      <div class="container">
        <div class="features-grid">
          <div class="feature-item animate-on-scroll">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div class="feature-text">
              <h5>Free Delivery</h5>
              <p>On orders above ₹10,000</p>
            </div>
          </div>
          <div class="feature-item animate-on-scroll">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="feature-text">
              <h5>Quality Assured</h5>
              <p>Premium teak & reclaimed wood</p>
            </div>
          </div>
          <div class="feature-item animate-on-scroll">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="feature-text">
              <h5>Expert Support</h5>
              <p>WhatsApp & Call support</p>
            </div>
          </div>
          <div class="feature-item animate-on-scroll">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div class="feature-text">
              <h5>Secure Payment</h5>
              <p>100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop by Category (8 Curated Heritage Categories) -->
    <section class="section" id="categories">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>Shop by Category</h2>
          <p>Explore our curated collection of handcrafted vintage furniture and resort decor</p>
        </div>
        <div class="category-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px;">
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'totems')">
            <img src="assets/images/product-totem.jpg" alt="Tribal Totems & Carvings">
            <div class="category-card-overlay">
              <h3>Tribal Totems & Pillars</h3>
              <span>Explore Collection</span>
            </div>
          </div>
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'swings')">
            <img src="assets/images/product-jhula.jpg" alt="Courtyard Swings">
            <div class="category-card-overlay">
              <h3>Courtyard Swings (Jhula)</h3>
              <span>Explore Collection</span>
            </div>
          </div>
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'cabinets')">
            <img src="assets/images/product-damchiya.jpg" alt="Damchiya Bridal Chests">
            <div class="category-card-overlay">
              <h3>Damchiya Bridal Chests</h3>
              <span>Explore Collection</span>
            </div>
          </div>
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'totems')">
            <img src="assets/images/product-bull-pillar.jpg" alt="Carved Tribal Pillars">
            <div class="category-card-overlay">
              <h3>Carved Tribal Pillars</h3>
              <span>Explore Collection</span>
            </div>
          </div>
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'almirah')">
            <img src="assets/images/product-almirah.jpg" alt="Showcase Almirahs">
            <div class="category-card-overlay">
              <h3>Showcase Almirahs</h3>
              <span>Explore Collection</span>
            </div>
          </div>
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'mirrors')">
            <img src="assets/images/product-mirror.jpg" alt="Vintage Mirrors">
            <div class="category-card-overlay">
              <h3>Vintage Mirrors</h3>
              <span>Explore Collection</span>
            </div>
          </div>
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'sofas')">
            <img src="assets/images/product-sofa.jpg" alt="Carved Sofa Sets">
            <div class="category-card-overlay">
              <h3>Carved Sofa Sets</h3>
              <span>Explore Collection</span>
            </div>
          </div>
          <div class="category-card animate-on-scroll" onclick="navigateTo('shop', 'tables')">
            <img src="assets/images/product-table.jpg" alt="Farmhouse Dining Tables">
            <div class="category-card-overlay">
              <h3>Farmhouse Tables</h3>
              <span>Explore Collection</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products (8 Realistic Pieces) -->
    <section class="section" id="featured-products" style="background: #faf7f4;">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>Featured Collection</h2>
          <p>Our most loved handcrafted pieces, chosen for their rare beauty and timeless craftsmanship</p>
        </div>
        <div class="products-grid">
          ${PRODUCTS.slice(0, 8).map(p => createProductCard(p)).join('')}
        </div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="#" class="btn btn-secondary" onclick="navigateTo('shop'); return false;">View All Products</a>
        </div>
      </div>
    </section>

    <!-- Split Banner -->
    <section class="split-banner animate-on-scroll">
      <div class="split-banner-image">
        <img src="assets/images/hero-banner.jpg" alt="Our Craftsmanship">
      </div>
      <div class="split-banner-content">
        <h2>The Art of Indian Craftsmanship</h2>
        <p>At Manduva Logillu, every piece of furniture carries the soul of Indian artisan heritage. Our skilled craftsmen use time-honored techniques passed down through generations to create furniture that's not just functional — it's a work of art.</p>
        <p>From hand-carved teak wood almirahs to intricately designed mirrors, each piece is a testament to the rich cultural legacy of Indian woodworking. We source only the finest reclaimed and sustainable woods.</p>
        <a href="#" class="btn btn-primary" onclick="navigateTo('about'); return false;">Discover Our Story</a>
      </div>
    </section>

    <!-- New Arrivals (8 Curated Pieces) -->
    <section class="section" id="new-arrivals">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>New Arrivals</h2>
          <p>Fresh additions to our vintage collection — just landed at our Moinabad showroom</p>
        </div>
        <div class="products-grid">
          ${PRODUCTS.slice(0, 8).map(p => createProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section testimonials" id="testimonials">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>What Our Customers Say</h2>
          <p>Hear from our valued customers about their experience with Manduva Logillu</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card animate-on-scroll">
            <div class="testimonial-stars">${renderStars(5)}</div>
            <p class="testimonial-text">"Absolutely stunning furniture! The carved almirah I bought is a masterpiece. The quality of teak wood and the intricate detailing is beyond what I expected. Highly recommended!"</p>
            <div class="testimonial-author">Priya Sharma</div>
            <div class="testimonial-location">Hyderabad, Telangana</div>
          </div>
          <div class="testimonial-card animate-on-scroll">
            <div class="testimonial-stars">${renderStars(5)}</div>
            <p class="testimonial-text">"We furnished our entire farmhouse with Manduva Logillu pieces. The vintage charm and handcrafted quality is unmatched. Their team was very helpful with the delivery and setup."</p>
            <div class="testimonial-author">Rajesh Reddy</div>
            <div class="testimonial-location">Moinabad, Telangana</div>
          </div>
          <div class="testimonial-card animate-on-scroll">
            <div class="testimonial-stars">${renderStars(5)}</div>
            <p class="testimonial-text">"The antique mirror I purchased is a showstopper in my living room. Every guest asks about it! The craftsmanship is exceptional and worth every rupee. Will definitely buy more."</p>
            <div class="testimonial-author">Anita Desai</div>
            <div class="testimonial-location">Jubilee Hills, Hyderabad</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter" id="newsletter">
      <div class="container">
        <h2>Stay in Touch</h2>
        <p>Subscribe to get updates on new arrivals, special offers, and interior design inspiration</p>
        <form class="newsletter-form" onsubmit="handleNewsletter(event)">
          <input type="email" placeholder="Enter your email address" required>
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>

    <!-- Instagram Feed (8 Different Realistic Images) -->
    <section class="section" id="instagram" style="padding-bottom: 20px;">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>Follow Us on Instagram</h2>
          <p><a href="https://www.instagram.com/manduva_logillu_furnitures/" target="_blank" style="color: var(--color-primary);">@manduva_logillu_furnitures</a> — 15.4K Followers</p>
        </div>
      </div>
      <div class="instagram-feed-grid">
        <div class="instagram-item"><img src="assets/images/product-totem.jpg" alt="Naga Ancestor Totem Wood Carving" loading="lazy"></div>
        <div class="instagram-item"><img src="assets/images/product-bull-pillar.jpg" alt="Naga Bull Tribal Carved Pillar" loading="lazy"></div>
        <div class="instagram-item"><img src="assets/images/product-jhula.jpg" alt="Heritage Manduva Courtyard Carved Jhula" loading="lazy"></div>
        <div class="instagram-item"><img src="assets/images/product-damchiya.jpg" alt="Antique Carved Damchiya Bridal Chest" loading="lazy"></div>
        <div class="instagram-item"><img src="assets/images/product-almirah.jpg" alt="Royal Carved Showcase Almirah" loading="lazy"></div>
        <div class="instagram-item"><img src="assets/images/product-mirror.jpg" alt="Antique Ornate Wall Mirror" loading="lazy"></div>
        <div class="instagram-item"><img src="assets/images/product-sofa.jpg" alt="Victorian Carved Sofa Set" loading="lazy"></div>
        <div class="instagram-item"><img src="assets/images/hero-banner.jpg" alt="Traditional Manduva Courtyard" loading="lazy"></div>
      </div>
    </section>
  `;
  initScrollAnimations();
}

const SHOP_MATERIALS = [
  { val: 'all', label: 'All Materials', img: null },
  { val: 'brass', label: 'Brass & Metal', img: 'assets/images/product-brass-uruli.jpg' },
  { val: 'kansa', label: 'Pure Kansa', img: 'assets/images/product-kansa-set.jpg' },
  { val: 'clay', label: 'Ceramic & Clay', img: 'assets/images/product-terracotta-urn.jpg' },
  { val: 'stone', label: 'Stone & Marble', img: 'assets/images/product-marble-platter.jpg' },
  { val: 'wood', label: 'Wood & Teak', img: 'assets/images/product-totem.jpg' },
  { val: 'textile', label: 'Fabric & Textile', img: 'assets/images/product-kilim-rug.jpg' },
  { val: 'cane', label: 'Rattan & Cane', img: 'assets/images/product-cane-screen.jpg' }
];

function renderShopPage(category = 'all', searchQuery = '', material = 'all') {
  AppState.activeCategory = category;
  AppState.searchQuery = searchQuery;
  AppState.activeMaterial = material;
  let filtered = [...PRODUCTS];

  // 1. Filter by Category
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  // 2. Filter by Material
  if (material && material !== 'all') {
    const matKey = material.toLowerCase();
    filtered = filtered.filter(p => {
      const pGroup = (p.materialGroup || '').toLowerCase();
      const pMat = (p.material || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();

      if (matKey === 'brass') {
        return pGroup === 'brass' || pMat.includes('brass') || pMat.includes('metal') || pName.includes('brass');
      }
      if (matKey === 'kansa') {
        return pGroup === 'kansa' || pMat.includes('kansa') || pMat.includes('bell metal') || pMat.includes('bronze') || pName.includes('kansa');
      }
      if (matKey === 'clay') {
        return pGroup === 'clay' || pMat.includes('clay') || pMat.includes('terracotta') || pMat.includes('ceramic') || pName.includes('terracotta');
      }
      if (matKey === 'stone') {
        return pGroup === 'stone' || pMat.includes('stone') || pMat.includes('marble') || pName.includes('marble');
      }
      if (matKey === 'wood') {
        return pGroup === 'wood' || pMat.includes('wood') || pMat.includes('teak') || pMat.includes('timber') || pName.includes('teak');
      }
      if (matKey === 'textile') {
        return pGroup === 'textile' || pMat.includes('textile') || pMat.includes('wool') || pMat.includes('fabric') || pName.includes('kilim') || pName.includes('rug');
      }
      if (matKey === 'cane') {
        return pGroup === 'cane' || pMat.includes('cane') || pMat.includes('rattan') || pMat.includes('wicker') || pName.includes('cane');
      }
      return pGroup === matKey || pMat.includes(matKey);
    });
  }

  // 3. Filter by Search Query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.type.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) || 
      (p.material && p.material.toLowerCase().includes(q))
    );
  }

  // 4. Sorting matching Tesu India
  if (AppState.shopSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.shopSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.shopSort === 'alpha-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (AppState.shopSort === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const categoryTitles = {
    all: 'Products',
    almirah: 'Showcase Almirahs',
    mirrors: 'Antique Mirrors',
    sofas: 'Vintage Sofas',
    tables: 'Heritage Tables',
    chairs: 'Farm & Resort Chairs',
    cabinets: 'Storage Cabinets',
    totems: 'Tribal Totems & Pillars',
    swings: 'Courtyard Swings (Jhula)'
  };

  const selectedMaterialObj = SHOP_MATERIALS.find(m => m.val === material);

  let title = 'Products';
  if (searchQuery) {
    title = `Search: "${searchQuery}"`;
  } else if (material && material !== 'all') {
    title = `${selectedMaterialObj ? selectedMaterialObj.label : material}`;
  } else if (category && category !== 'all') {
    title = categoryTitles[category] || 'Heritage Pieces';
  }

  const breadcrumbName = searchQuery
    ? searchQuery
    : (material && material !== 'all')
      ? `${selectedMaterialObj ? selectedMaterialObj.label : material}`
      : (category === 'all' ? 'Products' : (categoryTitles[category] || category));

  const editorialDesc = (material && material !== 'all')
    ? `Discover handcrafted heirlooms sculpted from authentic ${selectedMaterialObj ? selectedMaterialObj.label : material}. Each piece reflects generational Indian artistry and timeless courtyard estate elegance.`
    : `Say hello to fresh finds and modern classics. Explore our newest collection and bring home designs that feel current, warm, and beautifully crafted.`;

  const gridClass = AppState.shopViewMode === 'grid1' ? 'tesu-grid-1' : 'tesu-grid-2';
  const activeCount = [AppState.activeCategory !== 'all', AppState.activeMaterial !== 'all', AppState.searchQuery].filter(Boolean).length;

  const app = document.getElementById('page-content');
  app.innerHTML = `
    <!-- Tesu India Style Collection Header -->
    <div class="tesu-collection-header">
      <h1 class="tesu-collection-title">${title}</h1>
      <div class="tesu-breadcrumbs" role="navigation" aria-label="breadcrumbs">
        <a href="#" onclick="navigateTo('home'); return false;">Home</a>
        <span class="tesu-breadcrumb-sep" aria-hidden="true">
          <svg width="8" height="8" viewBox="0 0 256 512" fill="currentColor"><path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/></svg>
        </span>
        <a href="#" onclick="renderShopPage('all', '', 'all'); return false;">Products</a>
        ${(material && material !== 'all') || (category && category !== 'all') || searchQuery ? `
          <span class="tesu-breadcrumb-sep" aria-hidden="true">
            <svg width="8" height="8" viewBox="0 0 256 512" fill="currentColor"><path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/></svg>
          </span>
          <span>${breadcrumbName}</span>
        ` : ''}
      </div>
      <p class="tesu-collection-desc">
        ${editorialDesc}
      </p>
    </div>

    <div class="container" style="padding: 0 16px;">
      <!-- Interactive Shop by Material Luxury Swatch Pill Bar -->
      <div class="shop-material-filter-bar">
        <div class="material-section-eyebrow">
          <span>Explore Handcrafted Materials</span>
        </div>
        <div class="material-filter-scroll-wrap">
          ${SHOP_MATERIALS.map(m => {
            const isSelected = (AppState.activeMaterial === m.val);
            return `
              <button class="material-pill-item ${isSelected ? 'active' : ''}" onclick="renderShopPage('${AppState.activeCategory}', '${AppState.searchQuery}', '${m.val}')">
                ${m.img ? `
                  <img src="${m.img}" alt="${m.label}" class="material-pill-swatch-img">
                ` : `
                  <span class="material-swatch-all">✦</span>
                `}
                <span class="material-pill-text">${m.label}</span>
                ${isSelected && m.val !== 'all' ? `
                  <span class="material-pill-remove" title="Clear material" onclick="event.stopPropagation(); renderShopPage('${AppState.activeCategory}', '${AppState.searchQuery}', 'all');">×</span>
                ` : ''}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Tesu India Filter & Sort Toolbar -->
      <div class="tesu-toolbar">
        <div class="tesu-toolbar-left">
          <button class="tesu-filter-dropdown-btn" onclick="toggleMobileCategoryDrawer(true)" aria-label="Open filter options">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            <span>Filters (${activeCount})</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          ${activeCount > 0 ? `
            <button class="tesu-clean-reset-pill" onclick="renderShopPage('all', '', 'all')" title="Clear all filters">
              Clear all filters ×
            </button>
          ` : ''}
          <div style="position: relative; display: inline-flex; align-items: center;">
            <select onchange="handleShopSortChange(this.value)" class="tesu-filter-dropdown-btn" style="appearance: none; -webkit-appearance: none; background: transparent; padding-right: 18px; cursor: pointer; outline: none;">
              <option value="featured" ${AppState.shopSort === 'featured' ? 'selected' : ''}>Featured</option>
              <option value="alpha-asc" ${AppState.shopSort === 'alpha-asc' ? 'selected' : ''}>Alphabetically, A-Z</option>
              <option value="price-low" ${AppState.shopSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${AppState.shopSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${AppState.shopSort === 'rating' ? 'selected' : ''}>Artisan Rating</option>
            </select>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position: absolute; right: 0; pointer-events: none;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
        <div class="tesu-toolbar-right">
          <button class="tesu-view-btn ${AppState.shopViewMode === 'grid1' ? 'active' : ''}" onclick="setShopViewMode('grid1')" title="1 column view" aria-label="1 column">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <button class="tesu-view-btn ${AppState.shopViewMode === 'grid2' ? 'active' : ''}" onclick="setShopViewMode('grid2')" title="2 columns view" aria-label="2 columns">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
          </button>
        </div>
      </div>

      <!-- Tesu Products Grid (2 columns on mobile, matching Tesu screenshot) -->
      <div class="tesu-products-grid ${gridClass}">
        ${filtered.map(p => `
          <div class="tesu-product-card" onclick="showProductDetail(${p.id})" style="cursor: pointer;">
            <div class="tesu-product-image-box">
              <img src="${p.image}" alt="${p.name}" loading="lazy">
              ${p.material ? `
                <span class="product-material-tag">${p.material.split('&')[0].trim()}</span>
              ` : ''}
            </div>
            <h3 class="tesu-product-title">${p.name}</h3>
            <div class="tesu-product-price">₹ ${p.price.toLocaleString('en-IN')}</div>
          </div>
        `).join('')}
      </div>

      ${filtered.length === 0 ? `
        <div style="text-align: center; padding: 60px 20px; color: var(--color-sub-text);">
          <p style="font-size: 18px; margin-bottom: 20px;">No products found matching your current filter selection.</p>
          <button class="btn btn-primary" onclick="renderShopPage('all', '', 'all')">View All Handcrafted Pieces</button>
        </div>
      ` : ''}
    </div>

    <!-- Authentic Tesu India Sliding Filter Drawer -->
    <div id="tesu-drawer-backdrop" class="tesu-drawer-backdrop" onclick="toggleMobileCategoryDrawer(false)"></div>
    <aside id="shop-category-drawer" class="tesu-filter-drawer" aria-label="Filter collection">
      <div class="tesu-drawer-header">
        <h3 class="tesu-drawer-title">Filters</h3>
        <button onclick="toggleMobileCategoryDrawer(false)" class="tesu-drawer-close-btn" aria-label="Close filters">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="tesu-drawer-body">
        <!-- Accordion 1: Availability -->
        <div class="tesu-filter-accordion-item">
          <div class="tesu-filter-accordion-btn">
            <span>Availability</span>
          </div>
          <div class="tesu-filter-accordion-content">
            <ul class="tesu-facet-list">
              <li class="tesu-facet-label active">
                <span class="tesu-facet-box">✓</span>
                <span class="tesu-facet-name">In Stock & Ready to Ship</span>
                <span class="tesu-facet-count">(${filtered.length})</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Accordion 2: Shop by Material -->
        <div class="tesu-filter-accordion-item">
          <div class="tesu-filter-accordion-btn">
            <span>Material</span>
          </div>
          <div class="tesu-filter-accordion-content">
            <ul class="tesu-facet-list">
              ${SHOP_MATERIALS.map(m => {
                const isSelected = (AppState.activeMaterial === m.val);
                return `
                  <li class="tesu-facet-label ${isSelected ? 'active' : ''}" onclick="toggleMobileCategoryDrawer(false); renderShopPage('${AppState.activeCategory}', '${AppState.searchQuery}', '${m.val}')">
                    <span class="tesu-facet-box">${isSelected ? '✓' : ''}</span>
                    ${m.img ? `<img src="${m.img}" alt="${m.label}" class="tesu-facet-thumb">` : `<span style="width: 24px; height: 24px; border-radius: 50%; background: #8f6c4a; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">✦</span>`}
                    <span class="tesu-facet-name">${m.label}</span>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        </div>

        <!-- Accordion 3: Heritage Category -->
        <div class="tesu-filter-accordion-item">
          <div class="tesu-filter-accordion-btn">
            <span>Heritage Category</span>
          </div>
          <div class="tesu-filter-accordion-content">
            <ul class="tesu-facet-list">
              ${[
                { val: 'all', label: 'All Pieces', img: 'assets/images/product-totem.jpg' },
                { val: 'totems', label: 'Tribal Totems & Pillars', img: 'assets/images/product-totem.jpg' },
                { val: 'swings', label: 'Courtyard Swings (Jhula)', img: 'assets/images/product-jhula.jpg' },
                { val: 'almirah', label: 'Showcase Almirahs', img: 'assets/images/product-almirah.jpg' },
                { val: 'mirrors', label: 'Vintage Mirrors', img: 'assets/images/product-mirror.jpg' },
                { val: 'sofas', label: 'Sofa Sets', img: 'assets/images/product-sofa.jpg' },
                { val: 'tables', label: 'Dining Tables', img: 'assets/images/product-table.jpg' },
                { val: 'chairs', label: 'Chairs & Rockers', img: 'assets/images/product-chair.jpg' },
                { val: 'cabinets', label: 'Damchiya & Cabinets', img: 'assets/images/product-damchiya.jpg' }
              ].map(c => {
                const isSelected = (AppState.activeCategory === c.val);
                return `
                  <li class="tesu-facet-label ${isSelected ? 'active' : ''}" onclick="toggleMobileCategoryDrawer(false); renderShopPage('${c.val}', '${AppState.searchQuery}', '${AppState.activeMaterial}')">
                    <span class="tesu-facet-box">${isSelected ? '✓' : ''}</span>
                    <img src="${c.img}" alt="${c.label}" class="tesu-facet-thumb">
                    <span class="tesu-facet-name">${c.label}</span>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="tesu-drawer-footer">
        <button type="button" onclick="toggleMobileCategoryDrawer(false); renderShopPage('all', '', 'all');" class="btn btn-secondary btn-sm" style="flex: 1;">
          Clear All
        </button>
        <button type="button" onclick="toggleMobileCategoryDrawer(false);" class="btn btn-primary btn-sm" style="flex: 1;">
          Apply (${filtered.length})
        </button>
      </div>
    </aside>
  `;
  initScrollAnimations();
}

function toggleMobileCategoryDrawer(force) {
  const drawer = document.getElementById('shop-category-drawer');
  const backdrop = document.getElementById('tesu-drawer-backdrop');
  if (drawer && backdrop) {
    const isOpen = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
}

function handleShopSortChange(val) {
  AppState.shopSort = val;
  renderShopPage(AppState.activeCategory, AppState.searchQuery, AppState.activeMaterial);
}

function setShopViewMode(mode) {
  AppState.shopViewMode = mode;
  renderShopPage(AppState.activeCategory, AppState.searchQuery, AppState.activeMaterial);
}

function renderWishlistPage() {
  const wishlistedProducts = PRODUCTS.filter(p => Wishlist.isInWishlist(p.id));
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="breadcrumb">
      <div class="container">
        <div class="breadcrumb-list">
          <a href="#" onclick="navigateTo('home'); return false;">Home</a>
          <span>/</span>
          <span>My Wishlist</span>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>My Wishlist (${wishlistedProducts.length})</h2>
          <p>Handcrafted pieces you've fallen in love with</p>
        </div>
        ${wishlistedProducts.length === 0 ? `
          <div style="text-align: center; padding: 60px 20px; color: var(--color-sub-text);">
            <svg style="width: 56px; height: 56px; margin: 0 auto 20px; display: block; stroke: var(--color-primary-light);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <h3 style="margin-bottom: 10px; font-family: var(--font-header);">Your wishlist is empty</h3>
            <p style="margin-bottom: 25px;">Explore our vintage resort and farm collection and save your favorites.</p>
            <button class="btn btn-primary" onclick="navigateTo('shop')">Explore Collection</button>
          </div>
        ` : `
          <div class="products-grid">
            ${wishlistedProducts.map(p => createProductCard(p)).join('')}
          </div>
        `}
      </div>
    </section>
  `;
  window.scrollTo(0, 0);
  initScrollAnimations();
}

function showProductDetail(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="breadcrumb">
      <div class="container">
        <div class="breadcrumb-list">
          <a href="#" onclick="navigateTo('home'); return false;">Home</a>
          <span>/</span>
          <a href="#" onclick="navigateTo('shop'); return false;">Shop</a>
          <span>/</span>
          <span>${product.name}</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="product-detail">
        <div class="product-gallery">
          <div class="product-gallery-main">
            <img src="${product.image}" alt="${product.name}" id="product-main-image">
          </div>
        </div>
        <div class="product-info">
          <div class="product-info-type">${product.type}</div>
          <h1>${product.name}</h1>
          <div class="product-card-rating" style="justify-content: flex-start; margin: 10px 0;">${renderStars(product.rating)}</div>
          <div class="product-info-price">
            ${formatPrice(product.price)}
            ${product.originalPrice ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <p class="product-info-desc">${product.description}</p>
          
          <div class="product-qty-selector">
            <label>Quantity:</label>
            <div class="qty-controls">
              <button onclick="updateDetailQty(-1)">−</button>
              <input type="number" id="detail-qty" value="1" min="1" max="10" readonly>
              <button onclick="updateDetailQty(1)">+</button>
            </div>
          </div>

          <div class="product-actions-btns">
            <button class="btn btn-primary" onclick="Cart.add(${product.id}, getDetailQty())" style="flex:1;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Add to Cart
            </button>
            <button class="btn btn-secondary" onclick="Wishlist.toggle(${product.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${Wishlist.isInWishlist(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              Wishlist
            </button>
          </div>

          <div class="product-meta">
            <p><strong>SKU:</strong> ${product.sku}</p>
            <p><strong>Material:</strong> ${product.material}</p>
            <p><strong>Dimensions:</strong> ${product.dimensions}</p>
            <p><strong>Availability:</strong> <span style="color: var(--color-success);">${product.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
            <p><strong>Category:</strong> ${product.type}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section class="section" style="background: #faf7f4;">
      <div class="container">
        <div class="section-header">
          <h2>You May Also Like</h2>
        </div>
        <div class="products-grid">
          ${PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => createProductCard(p)).join('')}
        </div>
      </div>
    </section>
  `;
  window.scrollTo(0, 0);
  initScrollAnimations();
}

function renderAboutPage() {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="breadcrumb">
      <div class="container">
        <div class="breadcrumb-list">
          <a href="#" onclick="navigateTo('home'); return false;">Home</a>
          <span>/</span>
          <span>About Us</span>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>Our Story</h2>
          <p>Preserving India's Rich Furniture Heritage</p>
        </div>
        <div class="split-banner animate-on-scroll" style="margin-bottom: 60px;">
          <div class="split-banner-image">
            <img src="assets/images/hero-banner.jpg" alt="Our Showroom">
          </div>
          <div class="split-banner-content">
            <h2>Manduva Logillu Furnitures</h2>
            <p>Located in the heart of Moinabad, Hyderabad, Manduva Logillu Furnitures is a vintage furniture store specializing in resort and farm furniture. Our showroom, on the 1st floor opposite Gurukul in Moinabad, R.R. District, showcases a stunning collection of handcrafted wooden pieces.</p>
            <p>We source the finest teak, mango, and reclaimed wood to create furniture that brings warmth and character to any space. Each piece is handcrafted by skilled artisans who keep alive the traditional woodworking techniques of India.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; text-align: center;" class="animate-on-scroll">
          <div style="padding: 30px;">
            <h2 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 10px;">15.4K+</h2>
            <p style="text-transform: uppercase; letter-spacing: 1px; font-size: 13px;">Instagram Followers</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 10px;">500+</h2>
            <p style="text-transform: uppercase; letter-spacing: 1px; font-size: 13px;">Unique Pieces</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 10px;">1000+</h2>
            <p style="text-transform: uppercase; letter-spacing: 1px; font-size: 13px;">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  `;
  window.scrollTo(0, 0);
  initScrollAnimations();
}

function renderContactPage() {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="breadcrumb">
      <div class="container">
        <div class="breadcrumb-list">
          <a href="#" onclick="navigateTo('home'); return false;">Home</a>
          <span>/</span>
          <span>Contact Us</span>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>Get in Touch</h2>
          <p>Visit our showroom or reach out to us online</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px;" class="animate-on-scroll">
          <div>
            <h3 style="margin-bottom: 20px;">Send us a Message</h3>
            <form onsubmit="handleContact(event)">
              <div class="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" required>
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" required>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number">
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea style="width: 100%; padding: 12px 16px; border: 1px solid var(--color-border); font-family: inherit; font-size: 14px; min-height: 120px; resize: vertical;" placeholder="Write your message..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
          <div>
            <h3 style="margin-bottom: 20px;">Visit Our Showroom</h3>
            <div style="margin-bottom: 25px;">
              <h5 style="color: var(--color-primary); margin-bottom: 8px;">📍 Address</h5>
              <p>Manduva Logillu, 1st Floor,<br>Opposite to Gurukul, Moinabad,<br>R.R. District, Chevella - 500075<br>Hyderabad, Telangana</p>
            </div>
            <div style="margin-bottom: 25px;">
              <h5 style="color: var(--color-primary); margin-bottom: 8px;">📞 Phone</h5>
              <p><a href="tel:+918602067751">+91 8602067751</a></p>
            </div>
            <div style="margin-bottom: 25px;">
              <h5 style="color: var(--color-primary); margin-bottom: 8px;">⏰ Working Hours</h5>
              <p>Monday - Saturday: 10:00 AM - 8:00 PM<br>Sunday: 11:00 AM - 6:00 PM</p>
            </div>
            <div style="margin-bottom: 25px;">
              <h5 style="color: var(--color-primary); margin-bottom: 8px;">🌐 Follow Us</h5>
              <p><a href="https://www.instagram.com/manduva_logillu_furnitures/" target="_blank">@manduva_logillu_furnitures</a></p>
            </div>
            <div style="margin-top: 30px;">
              <iframe src="https://maps.google.com/maps?q=Moinabad+Chevella+500075&output=embed" style="width: 100%; height: 250px; border: 1px solid var(--color-border);" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  window.scrollTo(0, 0);
  initScrollAnimations();
}

// ---- Admin Panel ----
function renderAdminPage() {
  if (!AppState.user) {
    showToast('Please login to access admin panel', 'error');
    openAuthModal();
    return;
  }

  const orders = JSON.parse(localStorage.getItem('ml_orders') || '[]');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-sidebar-logo">
          <h3>ML Admin</h3>
          <small>Content Management</small>
        </div>
        <nav class="admin-nav">
          <a href="#" class="active" onclick="return false;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </a>
          <a href="#" onclick="return false;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Orders (${orders.length})
          </a>
          <a href="#" onclick="return false;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            Products (${PRODUCTS.length})
          </a>
          <a href="#" onclick="return false;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Customers
          </a>
          <a href="#" onclick="navigateTo('home'); return false;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Back to Store
          </a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="admin-header">
          <h2>Dashboard</h2>
          <span style="color: var(--color-sub-text);">Welcome, ${AppState.user.name}</span>
        </div>
        <div class="admin-cards">
          <div class="admin-card">
            <h5>Total Revenue</h5>
            <div class="value">${formatPrice(totalRevenue)}</div>
          </div>
          <div class="admin-card">
            <h5>Total Orders</h5>
            <div class="value">${orders.length}</div>
          </div>
          <div class="admin-card">
            <h5>Products</h5>
            <div class="value">${PRODUCTS.length}</div>
          </div>
          <div class="admin-card">
            <h5>Customers</h5>
            <div class="value">${JSON.parse(localStorage.getItem('ml_users') || '[]').length}</div>
          </div>
        </div>
        <div class="admin-table-container">
          <div class="admin-table-header">
            <h4>Recent Orders</h4>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.length === 0 ? '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--color-sub-text);">No orders yet</td></tr>' :
                orders.slice().reverse().map(o => `
                  <tr>
                    <td>#ML${String(o.id).padStart(4, '0')}</td>
                    <td>${o.customer}</td>
                    <td>${o.items} items</td>
                    <td>${formatPrice(o.total)}</td>
                    <td>${o.date}</td>
                    <td><span class="status-badge ${o.status}">${o.status}</span></td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `;
}

// ---- Navigation ----
function navigateTo(page, category = 'all', searchQuery = '', material = 'all') {
  AppState.currentPage = page;
  updateActiveNav(page);

  switch (page) {
    case 'home': renderHomePage(); break;
    case 'shop': renderShopPage(category || 'all', searchQuery || '', material || 'all'); break;
    case 'wishlist': renderWishlistPage(); break;
    case 'about': renderAboutPage(); break;
    case 'contact': renderContactPage(); break;
    case 'admin': renderAdminPage(); break;
    default: renderHomePage();
  }
  if (page !== 'shop' || (!category && !searchQuery && !material)) window.scrollTo(0, 0);
}

function updateActiveNav(page) {
  document.querySelectorAll('.nav-menu a, .mobile-nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === page) link.classList.add('active');
  });
}

// ---- Cart Sidebar ----
function renderCartSidebar() {
  const body = document.getElementById('cart-sidebar-body');
  if (!body) return;

  if (AppState.cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p>Your cart is empty</p>
        <a href="#" class="btn btn-secondary" onclick="toggleCart(); navigateTo('shop'); return false;" style="margin-top: 15px;">Browse Products</a>
      </div>
    `;
  } else {
    body.innerHTML = AppState.cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-title">${product.name}</div>
            <div class="cart-item-price">${formatPrice(product.price)}</div>
            <div class="cart-item-qty">
              <button onclick="Cart.updateQty(${product.id}, ${item.qty - 1})">−</button>
              <span>${item.qty}</span>
              <button onclick="Cart.updateQty(${product.id}, ${item.qty + 1})">+</button>
            </div>
            <button class="cart-item-remove" onclick="Cart.remove(${product.id})">Remove</button>
          </div>
        </div>
      `;
    }).join('');
  }

  const totalEl = document.getElementById('cart-total-amount');
  if (totalEl) totalEl.textContent = formatPrice(Cart.getTotal());

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.style.display = AppState.cart.length > 0 ? 'block' : 'none';
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
  renderCartSidebar();
}

// ---- Auth Modal ----
function openAuthModal() {
  document.getElementById('auth-modal').classList.add('open');
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('open');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');
  document.getElementById(`${tab}-form`).classList.add('active');
}

function updateAuthUI() {
  const userBtn = document.getElementById('user-btn');
  if (!userBtn) return;
  if (AppState.user) {
    userBtn.innerHTML = `
      <span style="font-size: 13px; color: var(--color-primary); cursor: pointer;" onclick="showUserMenu()">${AppState.user.name.split(' ')[0]}</span>
    `;
  } else {
    userBtn.innerHTML = `
      <a class="header-icon" onclick="openAuthModal()" title="Account">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
    `;
  }
}

function showUserMenu() {
  if (confirm('Do you want to logout?')) {
    Auth.logout();
  }
}

// ---- Form Handlers ----
function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  Auth.login(form.email.value, form.password.value);
}

function handleRegister(e) {
  e.preventDefault();
  const form = e.target;
  Auth.register(form.name.value, form.email.value, form.password.value);
}

function handleNewsletter(e) {
  e.preventDefault();
  showToast('Thank you for subscribing!', 'success');
  e.target.reset();
}

function handleContact(e) {
  e.preventDefault();
  showToast('Message sent! We\'ll get back to you soon.', 'success');
  e.target.reset();
}

function handleCheckout() {
  if (!AppState.user) {
    showToast('Please login or create an account to checkout', 'error');
    toggleCart();
    openAuthModal();
    return;
  }
  if (AppState.cart.length === 0) return;

  const orders = JSON.parse(localStorage.getItem('ml_orders') || '[]');
  const order = {
    id: orders.length + 1,
    customer: AppState.user.name,
    email: AppState.user.email,
    items: Cart.getCount(),
    total: Cart.getTotal(),
    date: new Date().toLocaleDateString('en-IN'),
    status: 'pending',
    products: AppState.cart.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      return { name: p.name, qty: item.qty, price: p.price };
    })
  };
  orders.push(order);
  localStorage.setItem('ml_orders', JSON.stringify(orders));

  Cart.clear();
  toggleCart();
  showToast(`Order #ML${String(order.id).padStart(4, '0')} placed successfully!`, 'success');
}

// ---- Detail Page Helpers ----
function updateDetailQty(change) {
  const input = document.getElementById('detail-qty');
  if (!input) return;
  let val = parseInt(input.value) + change;
  if (val < 1) val = 1;
  if (val > 10) val = 10;
  input.value = val;
}

function getDetailQty() {
  const input = document.getElementById('detail-qty');
  return input ? parseInt(input.value) : 1;
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ---- Header Scroll Effect ----
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ---- Mobile Menu ----
function toggleMobileMenu() {
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');
  nav.classList.toggle('open');
  overlay.classList.toggle('show');
}

// ---- Search ----
function toggleMobileSearch() {
  const bar = document.getElementById('mobile-search-dropdown');
  if (bar) {
    const isHidden = bar.style.display === 'none' || !bar.style.display;
    bar.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      const inp = document.getElementById('mobile-search-input');
      if (inp) inp.focus();
    }
  }
}

function handleSearch(e) {
  e.preventDefault();
  const input = document.getElementById('search-input');
  const mobileInput = document.getElementById('mobile-search-input');
  const query = (input && input.value.trim()) || (mobileInput && mobileInput.value.trim()) || '';
  if (!query) return;
  const bar = document.getElementById('mobile-search-dropdown');
  if (bar) bar.style.display = 'none';
  navigateTo('shop', 'all', query);
  showToast(`Showing results for "${query}"`, 'info');
}

// ---- Demo Credentials Quick Fill ----
function fillDemoLogin() {
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  if (emailInput && passwordInput) {
    emailInput.value = 'admin@manduvalogillu.com';
    passwordInput.value = 'password123';
    showToast('Demo admin credentials filled. Logging in...', 'info');
    setTimeout(() => {
      Auth.login('admin@manduvalogillu.com', 'password123');
    }, 400);
  }
}

// ---- Initialize Application ----
document.addEventListener('DOMContentLoaded', () => {
  // Seed demo admin account if no users exist
  if (!localStorage.getItem('ml_users')) {
    localStorage.setItem('ml_users', JSON.stringify([
      { name: 'Admin Manduva', email: 'admin@manduvalogillu.com', password: 'password123' }
    ]));
  }

  renderHomePage();
  Cart.updateUI();
  Wishlist.updateUI();
  updateAuthUI();
  initHeaderScroll();
  renderCartSidebar();
});
