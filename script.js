/* =========================================================
   Zay. — shared chrome + interactions (Vanilla ES6+)
   Works across all pages. Header/footer injected once.
   ========================================================= */
'use strict';

/* ---------- Shared nav model ---------- */
const NAV = [
  { label: 'Home', href: 'index.html', key: 'home' },
  { label: 'Shop', href: 'shop.html', key: 'shop' },
  { label: 'Women', href: 'shop.html?cat=Women', key: 'women' },
  { label: 'Men', href: 'shop.html?cat=Men', key: 'men' },
  { label: 'Kids', href: 'shop.html?cat=Kids', key: 'kids' },
  { label: 'Sportswear', href: 'shop.html?cat=Sportswear', key: 'sportswear' },
  { label: 'Accessories', href: 'shop.html?cat=Accessories', key: 'acc' },
  { label: 'About Us', href: 'about.html', key: 'about' },
  { label: 'Contact Us', href: 'contact.html', key: 'contact' },
  { label: 'Blog', href: 'blog.html', key: 'blog' },
];

/* ---------- External placeholder destinations ----------
   This is a static front-end demo with no real social accounts or
   backend. Rather than leaving dead `#` links, share/social icons point
   to the real platform's homepage in a new tab, and internal utility
   links (Terms, Privacy, Returns, Shipping) point to a real in-project
   policies page instead of nowhere. */
const SOCIAL = {
  facebook: 'https://www.facebook.com/',
  twitter: 'https://twitter.com/',
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/',
  linkedin: 'https://www.linkedin.com/',
};

const ICON = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  heart:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  heartFill:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" fill="currentColor"/></svg>',
  cart:   '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2.5 3h2l2.2 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 7H6"/></svg>',
  user:   '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  truck:  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="6" width="13" height="11" rx="1"/><path d="M14 9h4l3 3v5h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5z"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>',
  bag:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></svg>',
  globe:  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  mail:   '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock:  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrowUp:'<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  ig:     '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  fb:     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  tw:     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
  yt:     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/></svg>',
  bagHand:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  check:  '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  trash:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7h14z"/></svg>',
  lock:   '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  box:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8 12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><line x1="12" y1="13" x2="12" y2="21"/></svg>',
  alert:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.7 3.86a2 2 0 0 0-3.4 0z"/></svg>',
  home:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9"/></svg>',
};

const ACTIVE = document.body.dataset.page || 'home';

/* ---------- Build header + promo ---------- */
function buildTop() {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}" class="nav__link${n.key === ACTIVE ? ' is-active' : ''}">${n.label}</a></li>`
  ).join('');
  /* Account has no slot in the mobile bottom tab bar (home/shop/search/
     wishlist/cart), so it stays reachable here inside the drawer. */
  const utilityLinks = `
    <li class="nav__util-sep" role="separator" aria-hidden="true"></li>
    <li class="nav__util-item"><a href="account.html" class="nav__link${ACTIVE === 'account' ? ' is-active' : ''}">Account</a></li>`;

  return `
  <div class="promo-bar" id="promoBar">
    <div class="container promo-bar__inner">
      <span class="promo-bar__support">Support <a href="tel:+20221234567">+20 2 2123 4567</a></span>
      <p class="promo-bar__text">Sign up and <strong>GET 25% OFF</strong> for your first order.<a href="account.html" class="promo-bar__link">Sign up now</a></p>
      <button class="promo-bar__close" id="promoClose" aria-label="Close announcement">&times;</button>
    </div>
  </div>

  <header class="header" id="header">
    <div class="container header__inner">
      <a href="index.html" class="logo" aria-label="Zay home">
        <span class="logo__mark" aria-hidden="true">Z</span>
        <span class="logo__text">Zay<span class="logo__dot">.</span></span>
      </a>
      <nav class="nav" id="primaryNav" aria-label="Primary">
        <div class="nav__head">
          <span class="nav__head-label">Menu</span>
          <button class="nav__close" id="navClose" aria-label="Close menu">&times;</button>
        </div>
        <ul class="nav__list">${links}${utilityLinks}</ul>
      </nav>
      <div class="nav-backdrop" id="navBackdrop"></div>
      <div class="header__actions">
        <button class="icon-btn" style="display: none;"  id="searchTrigger" aria-label="Search" aria-haspopup="dialog">${ICON.search}</button>
        <a class="icon-btn" href="wishlist.html" style="display: none;" aria-label="Wishlist">${ICON.heart}<span class="cart-badge" id="wishBadge">0</span></a>
        <a class="icon-btn icon-btn--cart" style="display: none;" href="cart.html" aria-label="Cart">${ICON.cart}<span class="cart-badge" id="cartBadge">0</span></a>
        <a class="icon-btn" href="account.html" style="display: none;" aria-label="Account">${ICON.user}</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>

  <nav class="mobile-tabbar" aria-label="Primary mobile">
    <a href="index.html" class="mobile-tabbar__item${ACTIVE === 'home' ? ' is-active' : ''}">
      <span class="mobile-tabbar__icon">${ICON.home}</span>
      <span>الرئيسية</span>
    </a>
    <a href="shop.html" class="mobile-tabbar__item${ACTIVE === 'shop' ? ' is-active' : ''}">
      <span class="mobile-tabbar__icon">${ICON.bag}</span>
      <span>المتجر</span>
    </a>
    <button type="button" class="mobile-tabbar__item" id="mobileSearchTrigger" aria-haspopup="dialog">
      <span class="mobile-tabbar__icon">${ICON.search}</span>
      <span>البحث</span>
    </button>
    <a href="wishlist.html" class="mobile-tabbar__item${ACTIVE === 'wishlist' ? ' is-active' : ''}">
      <span class="mobile-tabbar__icon">${ICON.heart}<span class="cart-badge" id="wishBadgeMobile">0</span></span>
      <span>المفضلة</span>
    </a>
    <a href="cart.html" class="mobile-tabbar__item${ACTIVE === 'cart' ? ' is-active' : ''}">
      <span class="mobile-tabbar__icon">${ICON.cart}<span class="cart-badge" id="cartBadgeMobile">0</span></span>
      <span>السلة</span>
    </a>
  </nav>`;
}

/* ---------- Build footer ---------- */
function buildBottom() {
  return `
  <footer class="footer" id="footer">
    <div class="container footer__grid">
      <div class="footer__col footer__brand">
        <a href="index.html" class="logo logo--light"><span class="logo__mark" aria-hidden="true">Z</span><span class="logo__text">Zay<span class="logo__dot">.</span></span></a>
        <p>A curated edit of modern fashion essentials — designed in our atelier, crafted for everyday confidence, delivered to your door.</p>
        <div class="footer__social">
          <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
          <a href="${SOCIAL.twitter}" target="_blank" rel="noopener" aria-label="Twitter">${ICON.tw}</a>
          <a href="${SOCIAL.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
          <a href="${SOCIAL.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ICON.yt}</a>
        </div>
      </div>
      <div class="footer__col"><h4>Information</h4><ul><li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="policies.html#terms">Terms &amp; Conditions</a></li><li><a href="policies.html#privacy">Privacy Policy</a></li></ul></div>
      <div class="footer__col"><h4>Quick Links</h4><ul><li><a href="shop.html?cat=Women">Women</a></li><li><a href="shop.html?cat=Men">Men</a></li><li><a href="shop.html?cat=Accessories">Accessories</a></li><li><a href="shop.html?sort=newest">New Arrivals</a></li></ul></div>
      <div class="footer__col"><h4>Customer Service</h4><ul><li><a href="account.html">My Account</a></li><li><a href="account.html#orders">Track Order</a></li><li><a href="policies.html#returns">Returns</a></li><li><a href="policies.html#shipping">Shipping Info</a></li></ul></div>
      <div class="footer__col"><h4>Contact</h4><ul class="footer__contact"><li>${ICON.pin} 18 Talaat Harb St, Downtown, Cairo, Egypt</li><li>${ICON.phone} <a href="tel:+20221234567">+20 2 2123 4567</a></li><li>${ICON.mail} <a href="mailto:hello@zay.eg">hello@zay.eg</a></li></ul></div>
    </div>
    <div class="footer__bar">
      <div class="container footer__bar-inner">
        <p>&copy; 2026 Zay. — Crafted with care.</p>
        <div class="footer__pay">
          <span>VISA</span><span>MC</span><span>Fawry</span><span>Vodafone Cash</span><span>Cash on Delivery</span>
        </div>
        <p>Designed for fashion lovers.</p>
      </div>
    </div>
  </footer>
  <button class="to-top" id="toTop" aria-label="Back to top">${ICON.arrowUp}</button>`;
}

/* ---------- Inject chrome ---------- */
const topSlot = document.getElementById('siteTop');
const bottomSlot = document.getElementById('siteBottom');
if (topSlot) topSlot.outerHTML = buildTop();
if (bottomSlot) bottomSlot.innerHTML = buildBottom();

/* =========================================================
   Scroll reveal (declared early so shop apply() can use it)
   ========================================================= */
let io = null;
function revealScan() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  if (!io)
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
}
window.revealScan = revealScan;

/* =========================================================
   Product catalog (shared)
   ========================================================= */
const STARS = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

// Unsplash images are remote (kept from original), local sportswear uses img dir
const CATALOG = [
  /* === Original 17 === */
  { id: 'brown-coat',     name: 'Brown Wool Coat',         nameAr: 'كوت صوف بني', cat: 'Women', color: 'Brown', desc: 'A rich chestnut-brown wool coat cut for Cairo\'s cooler winter evenings — structured enough for the office, warm enough for a Sinai weekend getaway.', material: 'Wool blend', sizes: 'S, M, L, XL', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80', now: 1600,  old: 2200, rating: 5, badge: '-27%' },
  { id: 'classy-coat',    name: 'Lightweight Beige Coat',       nameAr: 'كوت بيج خفيف', cat: 'Women', color: 'Beige', desc: 'A lightweight beige coat that layers easily over an evening dress, perfect for the mild months between Cairo\'s long summer and short winter.', material: 'Cotton-poly blend', sizes: 'S, M, L, XL', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80', now: 1680,  old: 2200, rating: 4, badge: '-24%' },
  { id: 'brown-dress',    name: 'Relaxed Fit Brown Dress',      nameAr: 'فستان بني كاجوال', cat: 'Women', color: 'Brown', desc: 'A relaxed brown dress in breathable fabric, easy to dress up for a family gathering or down for a day at the office.', material: 'Viscose blend', sizes: 'XS, S, M, L, XL', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80', now: 900,  old: 1300, rating: 5, badge: 'New' },
  { id: 'white-shirt',    name: 'Classic White Shirt',     nameAr: 'قميص أبيض كلاسيك', cat: 'Women', color: 'White', desc: 'A crisp white cotton shirt that stays cool through a Cairo afternoon and pairs effortlessly with everything from tailored trousers to a midi skirt.', material: '100% Cotton', sizes: 'XS, S, M, L, XL', img: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=500&q=80', now: 750,  old: 1100, rating: 4, badge: '-32%' },
  { id: 'black-dress',    name: 'Black Evening Dress',     nameAr: 'فستان سواريه أسود', cat: 'Women', color: 'Black', desc: 'An elegant black evening dress designed for engagement parties and weddings, with a flattering silhouette that photographs beautifully under any kosha lighting.', material: 'Satin blend', sizes: 'XS, S, M, L, XL', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80', now: 1200,  old: 1600, rating: 5, badge: 'Hot' },
  { id: 'brown-sweater',  name: 'Lightweight Brown Sweater',     nameAr: 'سويتر بني خفيف', cat: 'Women', color: 'Brown', desc: 'A soft, lightweight knit in warm brown — just enough coverage for Cairo\'s brief winter chill without ever feeling heavy.', material: 'Cotton-wool blend', sizes: 'S, M, L, XL', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80', now: 630,  old: 900,  rating: 4, badge: '-30%' },
  { id: 'white-skirt',    name: 'White Midi Skirt',     nameAr: 'جيبة ميدي بيضاء', cat: 'Women', color: 'White', desc: 'A clean white midi skirt that works from a Friday brunch downtown to a summer evening on the North Coast.', material: '100% Cotton', sizes: 'XS, S, M, L', img: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=500&q=80', now: 450,  old: 700,  rating: 5, badge: 'New' },
  { id: 'beige-dress',    name: 'Beige Party Dress',       nameAr: 'فستان سهرة بيج', cat: 'Women', color: 'Beige', desc: 'A beige party dress with just the right amount of shimmer for Eid celebrations and evening gatherings.', material: 'Chiffon blend', sizes: 'XS, S, M, L, XL', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=500&q=80', now: 900,  old: 1300, rating: 4, badge: '-31%' },
  { id: 'denim-jacket',   name: 'Blue Denim Jacket',            nameAr: 'جاكيت جينز أزرق', cat: 'Men',   color: 'Blue',  desc: 'A classic denim jacket, light enough to wear over a tee through Cairo\'s mild winter without ever feeling bulky.', material: '100% Cotton denim', sizes: 'S, M, L, XL, XXL', img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=500&q=80', now: 1100,  old: 1500, rating: 5, badge: '-26%' },
  { id: 'grey-blazer',    name: 'Grey Wool Blazer',        nameAr: 'بليزر صوف رمادي', cat: 'Men',   color: 'Grey',  desc: 'A tailored grey wool blazer built for the office or a formal evening — sharp enough for a boardroom, comfortable enough for a long day.', material: 'Wool blend', sizes: '48, 50, 52, 54', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80', now: 1400,  old: 1900, rating: 5, badge: 'Hot' },
  { id: 'leather-bag',    name: 'Leather Handbag',         nameAr: 'شنطة يد جلد', cat: 'Accessories', color: 'Brown', desc: 'A structured leather handbag roomy enough for the everyday essentials, from a day at work to an evening out.', material: 'Genuine leather', sizes: 'One Size', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80', now: 850,  old: 1200, rating: 5, badge: '-29%' },
  { id: 'sunglasses',     name: 'Retro Sunglasses',        nameAr: 'نظارة شمس ريترو', cat: 'Accessories', color: 'Black', desc: 'Retro-inspired sunglasses with real UV protection — an essential for Cairo\'s near year-round sunshine.', material: 'Acetate frame, UV400 lenses', sizes: 'One Size', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80', now: 400,  old: 650, rating: 4, badge: 'New' },

  /* Sportswear line */
  { id: 'jacket-black',   name: 'Black Training Jacket',      nameAr: 'جاكيت رياضي أسود', cat: 'Men', color: 'Black', desc: 'A lightweight black training jacket built for early morning runs along the Nile Corniche before the day heats up.', material: 'Polyester, moisture-wicking', sizes: 'S, M, L, XL', img: 'assets/img/product1.webp', now: 990,  old: 1400, rating: 5, badge: '-29%', tag: 'sportswear' },
  { id: 'jacket-red',     name: 'Red Hooded Jacket',       nameAr: 'جاكيت أحمر بغطاء راس', cat: 'Men', color: 'Red',   desc: 'A bold red hooded jacket with just enough warmth for a cool evening jog or a weekend at the gym.', material: 'Polyester-cotton blend', sizes: 'S, M, L, XL', img: 'assets/img/product2.webp', now: 1100,  old: 1500, rating: 5, badge: 'Hot',  tag: 'sportswear' },
  { id: 'jacket-navy',    name: 'Navy Training Jacket', nameAr: 'جاكيت رياضي كحلي', cat: 'Men', color: 'Navy',  desc: 'A breathable navy performance jacket designed to move with you, whether it\'s a 6am workout or a weekend match.', material: 'Polyester, breathable mesh lining', sizes: 'S, M, L, XL', img: 'assets/img/product3.webp', now: 1200,  old: 1650, rating: 5, badge: 'New',  tag: 'sportswear' },
  { id: 'jacket-camo',    name: 'Camo Puffer Jacket',      nameAr: 'جاكيت بافر كامو', cat: 'Men', color: 'Grey',  desc: 'An insulated camo puffer built for genuinely cold days — ideal for a winter trip to Sinai\'s mountains or St. Catherine.', material: 'Polyester shell, synthetic fill', sizes: 'S, M, L, XL, XXL', img: 'assets/img/product4.webp', now: 1300,  old: 1800, rating: 4, badge: '-28%', tag: 'sportswear' },
  { id: 'tee-black',      name: 'Classic Black T-Shirt',       nameAr: 'تي شيرت أسود كلاسيك', cat: 'Men', color: 'Black', desc: 'A soft, breathable cotton tee built to handle Cairo\'s heat — the everyday essential every wardrobe needs.', material: '100% Cotton', sizes: 'S, M, L, XL, XXL', img: 'assets/img/product5.webp', now: 280,  old: 450,  rating: 5, badge: '-38%', tag: 'sportswear' },

  /* === 30 NEW DIVERSE PRODUCTS === */

  /* Women's (10) */
  { id: 'silk-wrap-dress',   name: 'Silk Wrap Midi Dress',     nameAr: 'فستان حرير ميدي', cat: 'Women', color: 'Black', desc: 'A silky, wrap-front midi dress that drapes beautifully — a go-to for engagement parties, henna nights, or a polished dinner out.', material: '100% Silk', sizes: 'XS, S, M, L', img: 'assets/img/products/silk-wrap-dress.webp', now: 1450,  old: 1950, rating: 5, badge: 'Hot' },
  { id: 'cashmere-crew',     name: 'Cashmere Crew Sweater',    nameAr: 'سويتر كشمير', cat: 'Women', color: 'Beige', desc: 'A soft cashmere crewneck built for Cairo\'s short but genuinely chilly winter nights — light enough to layer under a coat, warm enough to wear alone.', material: '100% Cashmere', sizes: 'S, M, L, XL', img: 'assets/img/products/cashmere-crew.webp', now: 1850,  old: 2400, rating: 5, badge: '-23%' },
  { id: 'mom-jeans',         name: 'Blue High-Waist Jeans',     nameAr: 'بنطلون جينز أزرق هاي ويست', cat: 'Women', color: 'Blue',  desc: 'Relaxed, high-waisted denim with a flattering straight leg — comfortable enough for a full day out at the mall or a weekend at the souk.', material: '98% Cotton, 2% Elastane', sizes: '24, 26, 28, 30, 32 (waist)', img: 'assets/img/products/mom-jeans.webp', now: 780,  old: 1100, rating: 4, badge: '-29%' },
  { id: 'linen-blazer',      name: 'Relaxed Linen Blazer',     nameAr: 'بليزر كتان كاجوال', cat: 'Women', color: 'White', desc: 'An unlined linen blazer that breathes through Cairo\'s heat while still looking sharp enough for a business meeting or a summer wedding.', material: '100% Linen', sizes: 'S, M, L, XL', img: 'assets/img/products/linen-blazer.webp', now: 1650,  old: 2200, rating: 5, badge: 'New' },
  { id: 'pleated-midi',      name: 'Pleated Midi Skirt',       nameAr: 'جيبة ميدي بليسيه', cat: 'Women', color: 'Camel', desc: 'A flowing pleated midi skirt in warm camel — a comfortable length with easy movement and enough versatility to dress up or down.', material: 'Polyester blend', sizes: 'XS, S, M, L, XL', img: 'assets/img/products/pleated-midi.webp', now: 950,  old: 1300, rating: 4, badge: '-27%' },
  { id: 'oversized-shirt',   name: 'Oversized Cotton Shirt',   nameAr: 'قميص قطن أوفرسايز', cat: 'Women', color: 'White', desc: 'A breathable, oversized cotton shirt made for hot Cairo afternoons — wear it open over a tank or buttoned up on its own.', material: '100% Cotton', sizes: 'S, M, L (oversized fit)', img: 'assets/img/products/oversized-shirt.webp', now: 580,  old: 850,  rating: 5, badge: '-32%' },
  { id: 'leather-leggings',  name: 'Faux Leather Leggings',    nameAr: 'ليجن جلد صناعي', cat: 'Women', color: 'Black', desc: 'Stretch faux-leather leggings that layer easily under a long tunic or oversized sweater on cooler evenings.', material: 'Faux leather, cotton lining', sizes: 'XS, S, M, L, XL', img: 'assets/img/products/leather-leggings.webp', now: 680,  old: 950,  rating: 4, badge: '-28%' },
  { id: 'floral-maxi',       name: 'Floral Print Maxi Dress',  nameAr: 'فستان ماكسي ورد', cat: 'Women', color: 'Multi', desc: 'A breezy floor-length floral dress, lightweight enough for a Sahel summer evening and easy to style modestly for any family occasion.', material: 'Rayon blend', sizes: 'XS, S, M, L, XL', img: 'assets/img/products/floral-maxi.webp', now: 1180,  old: 1600, rating: 5, badge: 'Hot' },
  { id: 'knit-cardigan',     name: 'Chunky Knit Cardigan',     nameAr: 'كارديجان تريكو', cat: 'Women', color: 'Cream', desc: 'An oversized cream cardigan — the easiest way to add warmth on Cairo\'s cooler winter mornings without giving up comfort.', material: 'Acrylic-wool blend', sizes: 'S, M, L, XL', img: 'assets/img/products/knit-cardigan.webp', now: 980,  old: 1400, rating: 4, badge: '-30%' },
  { id: 'tailored-trousers', name: 'Tailored Wool Trousers',   nameAr: 'بنطلون صوف كلاسيك', cat: 'Women', color: 'Grey',  desc: 'Sharp, straight-leg wool trousers for the office or an evening out, tailored to sit comfortably at the waist.', material: 'Wool blend', sizes: 'XS, S, M, L, XL', img: 'assets/img/products/tailored-trousers.webp', now: 1050,  old: 1450, rating: 5, badge: '-28%' },

  /* Men's (8) */
  { id: 'oxford-shirt',      name: 'Slim Fit Oxford Shirt',    nameAr: 'قميص أوكسفورد سليم فيت', cat: 'Men', color: 'Blue',      desc: 'A slim-fit Oxford shirt in breathable cotton, sharp enough for the office and cool enough to wear all day.', material: '100% Cotton', sizes: 'S, M, L, XL', img: 'assets/img/products/oxford-shirt.webp', now: 650,  old: 950,  rating: 4, badge: '-32%' },
  { id: 'merino-sweater',    name: 'Merino Wool Sweater',      nameAr: 'سويتر صوف ميرينو', cat: 'Men', color: 'Navy',      desc: 'A fine-gauge merino sweater — warm enough for Cairo\'s short winter, light enough to layer under a jacket on cooler trips.', material: '100% Merino Wool', sizes: 'S, M, L, XL', img: 'assets/img/products/merino-sweater.webp', now: 1250,  old: 1700, rating: 5, badge: '-26%' },
  { id: 'chino-pants',       name: 'Slim Fit Chino Pants',         nameAr: 'بنطلون تشينو سليم فيت', cat: 'Men', color: 'Khaki',     desc: 'Comfortable slim-fit chinos in khaki, easy to dress up for work or down for a weekend out.', material: '98% Cotton, 2% Elastane', sizes: '30, 32, 34, 36, 38 (waist)', img: 'assets/img/products/chino-pants.webp', now: 720,  old: 1000, rating: 4, badge: '-28%' },
  { id: 'polo-shirt',        name: 'Classic Cotton Polo Shirt',       nameAr: 'تي شيرت بولو قطن', cat: 'Men', color: 'White',     desc: 'A breathable pique polo that keeps its shape through a full day out, from the office to a casual dinner.', material: '100% Pique Cotton', sizes: 'S, M, L, XL, XXL', img: 'assets/img/products/polo-shirt.webp', now: 480,  old: 700,  rating: 5, badge: '-31%' },
  { id: 'bomber-jacket',     name: 'Quilted Bomber Jacket',    nameAr: 'جاكيت بمبر مبطن', cat: 'Men', color: 'Olive',     desc: 'A quilted olive bomber with just enough warmth for Cairo\'s cooler evenings, worn open over a simple tee.', material: 'Polyester shell, quilted lining', sizes: 'S, M, L, XL', img: 'assets/img/products/bomber-jacket.webp', now: 1580,  old: 2100, rating: 5, badge: 'New' },
  { id: 'suit-blazer',       name: 'Tailored Suit Blazer',     nameAr: 'بليزر بدلة كلاسيك', cat: 'Men', color: 'Charcoal',  desc: 'A sharply tailored charcoal blazer built for weddings, engagement parties, and important meetings alike.', material: 'Wool blend', sizes: '48, 50, 52, 54, 56', img: 'assets/img/products/suit-blazer.webp', now: 2200,  old: 2950, rating: 5, badge: '-25%' },
  { id: 'linen-shorts',      name: 'Linen Summer Shorts',      nameAr: 'شورت كتان صيفي', cat: 'Men', color: 'Sand',      desc: 'Breathable linen shorts made for the hottest Cairo afternoons and long weekends on the North Coast.', material: '100% Linen', sizes: 'S, M, L, XL', img: 'assets/img/products/linen-shorts.webp', now: 550,  old: 800,  rating: 4, badge: '-31%' },
  { id: 'graphic-hoodie',    name: 'Heavyweight Cotton Hoodie', nameAr: 'هودي قطن تقيل', cat: 'Men', color: 'Grey',      desc: 'A heavyweight cotton hoodie with enough warmth for a cool winter evening, without ever feeling too heavy for Cairo\'s mild season.', material: 'Heavyweight cotton fleece', sizes: 'S, M, L, XL, XXL', img: 'assets/img/products/graphic-hoodie.webp', now: 720,  old: 1000, rating: 5, badge: '-28%' },

  /* Kids (4) */
  { id: 'kids-rainbow-tee',  name: 'Kids Rainbow Stripe T-Shirt',  nameAr: 'تي شيرت أطفال مقلم', cat: 'Kids', color: 'Multi',  desc: 'A soft, breathable cotton tee in playful stripes — built to survive a full day of school, play and everything in between.', material: '100% Cotton', sizes: '2–3Y, 4–5Y, 6–7Y, 8–9Y', img: 'assets/img/products/kids-rainbow-tee.webp', now: 240,  old: 380, rating: 5, badge: 'New' },
  { id: 'kids-overalls',     name: 'Kids Denim Overalls',      nameAr: 'أوفرول جينز أطفال', cat: 'Kids', color: 'Blue',   desc: 'Durable denim overalls with easy-clip straps, made for a day of play without a single worry about wear and tear.', material: '100% Cotton denim', sizes: '2–3Y, 4–5Y, 6–7Y, 8–9Y', img: 'assets/img/products/kids-overalls.webp', now: 480,  old: 680, rating: 4, badge: '-29%' },
  { id: 'kids-puffer',       name: 'Kids Puffer Jacket',       nameAr: 'جاكيت بافر أطفال', cat: 'Kids', color: 'Pink',   desc: 'A cozy, lightweight puffer for Cairo\'s cooler winter mornings — warm enough for the school run, easy enough to pack away by noon.', material: 'Polyester shell, synthetic fill', sizes: '2–3Y, 4–5Y, 6–7Y, 8–9Y', img: 'assets/img/products/kids-puffer.webp', now: 680,  old: 950, rating: 5, badge: 'Hot' },
  { id: 'kids-hoodie',       name: 'Kids Cotton Hoodie',       nameAr: 'هودي قطن أطفال', cat: 'Kids', color: 'Grey',   desc: 'A soft cotton hoodie that\'s just right for cool evenings, easy to layer over any outfit without any fuss.', material: 'Cotton fleece', sizes: '2–3Y, 4–5Y, 6–7Y, 8–9Y', img: 'assets/img/products/kids-hoodie.webp', now: 360,  old: 520, rating: 4, badge: '-31%' },

  /* Sportswear (4) */
  { id: 'leggings-black',    name: 'Black High-Waist Leggings', nameAr: 'ليجن أسود هاي ويست', cat: 'Sportswear', color: 'Black',    desc: 'Squat-proof, high-waist leggings built to move — from a sunrise gym session to a full day of errands.', material: 'Nylon-spandex blend', sizes: 'XS, S, M, L, XL', img: 'assets/img/products/leggings-black.webp', now: 480,  old: 720, rating: 5, badge: '-33%' },
  { id: 'running-sneakers',  name: 'Lightweight Running Sneakers',   nameAr: 'جزمة جري خفيفة', cat: 'Sportswear', color: 'White',    desc: 'Lightweight, breathable running sneakers built for Cairo\'s pavements, whether it\'s an early morning Corniche run or a gym session.', material: 'Mesh upper, rubber sole', sizes: '38, 39, 40, 41, 42, 43, 44 (EU)', img: 'assets/img/products/running-sneakers.webp', now: 1100,  old: 1500, rating: 5, badge: 'Hot' },
  { id: 'yoga-tank',         name: 'Stretch Yoga Tank Top',          nameAr: 'توب يوجا', cat: 'Sportswear', color: 'Purple',   desc: 'A soft, stretchy tank built to move with every pose — breathable enough for a hot studio or an outdoor session.', material: 'Cotton-spandex blend', sizes: 'XS, S, M, L, XL', img: 'assets/img/products/yoga-tank.webp', now: 320,  old: 480, rating: 4, badge: '-33%' },
  { id: 'track-pants',       name: 'Tapered Track Pants',            nameAr: 'بنطلون رياضي', cat: 'Sportswear', color: 'Charcoal', desc: 'Tapered track pants that go from the gym to running errands without missing a beat — soft, breathable, and easy to move in.', material: 'Polyester-spandex blend', sizes: 'S, M, L, XL', img: 'assets/img/products/track-pants.webp', now: 580,  old: 850, rating: 5, badge: '-32%' },

  /* Accessories (4) */
  { id: 'crossbody-bag',     name: 'Leather Crossbody Bag',      nameAr: 'شنطة كروس جلد', cat: 'Accessories', color: 'Tan',      desc: 'A compact leather crossbody, hands-free and practical for a busy day moving between work, errands and everything after.', material: 'Genuine leather', sizes: 'One Size', img: 'assets/img/products/crossbody-bag.webp', now: 950,  old: 1350, rating: 5, badge: '-30%' },
  { id: 'aviator-sun',       name: 'Classic Aviator Sunglasses', nameAr: 'نظارة شمس افياتور', cat: 'Accessories', color: 'Gold',     desc: 'Timeless gold-framed aviators with full UV protection, built for Egypt\'s sun almost every day of the year.', material: 'Metal frame, UV400 lenses', sizes: 'One Size', img: 'assets/img/products/aviator-sun.webp', now: 780,  old: 1150, rating: 4, badge: '-32%' },
  { id: 'cashmere-scarf',    name: 'Cashmere Scarf',        nameAr: 'شال كشمير', cat: 'Accessories', color: 'Burgundy', desc: 'A soft cashmere scarf in deep burgundy — the easiest way to add warmth on a cool Cairo evening without changing the whole outfit.', material: '100% Cashmere', sizes: 'One Size', img: 'assets/img/products/cashmere-scarf.webp', now: 650,  old: 950, rating: 5, badge: '-32%' },
  { id: 'minimal-watch',     name: 'Minimalist Leather Watch',   nameAr: 'ساعة جلد بسيطة', cat: 'Accessories', color: 'Silver',   desc: 'A clean, minimalist watch with a leather strap — understated enough for daily wear, polished enough for any occasion.', material: 'Stainless steel case, leather strap', sizes: 'One Size (adjustable strap)', img: 'assets/img/products/minimal-watch.webp', now: 1450,  old: 1950, rating: 5, badge: 'Hot' },
  { id: 'oatmeal-hoodie',    name: 'Oversized Cream Hoodie',    nameAr: 'هودي كريمي أوفرسايز', cat: 'Men',        color: 'Cream',    desc: "A relaxed oatmeal hoodie in soft brushed fleece — warm enough for a cool Cairo evening without ever feeling heavy.", material: 'Cotton fleece', sizes: 'S, M, L, XL, XXL', img: 'assets/img/products/oatmeal-hoodie.webp', now: 850,  old: 1100, rating: 5, badge: 'New' },
  { id: 'olive-kimono',      name: 'Olive Overshirt',   nameAr: 'أوفرشيرت زيتي', cat: 'Men',        color: 'Olive',    desc: "An open-front olive overshirt that layers easily over a tee — light enough for Cairo's mild winter, sharp enough to wear over anything.", material: 'Cotton-linen blend', sizes: 'S, M, L, XL', img: 'assets/img/products/olive-kimono.webp', now: 980,  old: 1350, rating: 4, badge: 'New' },
  { id: 'oversized-black-tee', name: 'Black Oversized Cotton T-Shirt',   nameAr: 'تي شيرت أسود أوفرسايز', cat: 'Men',        color: 'Black',    desc: 'A boxy, oversized black tee in heavyweight cotton — the everyday staple that works as well solo as it does layered under a jacket.', material: '100% Cotton', sizes: 'S, M, L, XL, XXL', img: 'assets/img/products/oversized-black-tee.webp', now: 380,  old: 480, rating: 5, badge: 'New' },
  { id: 'trucker-cap',       name: 'Classic Trucker Cap',        nameAr: 'كاب تراكر كلاسيك', cat: 'Accessories', color: 'Multi',   desc: "A classic black-and-white trucker cap with a breathable mesh back — built for Cairo's sunny afternoons.", material: 'Cotton twill, mesh back', sizes: 'One Size (adjustable)', img: 'assets/img/products/trucker-cap.webp', now: 320,  old: 420, rating: 4, badge: 'New' },
  { id: 'pink-crop-tee',     name: 'Pink Crop T-Shirt',         nameAr: 'توب كروب وردي', cat: 'Women',      color: 'Pink',     desc: 'A relaxed, cropped pink tee that pairs easily with high-waist denim or a midi skirt for an easy everyday look.', material: '100% Cotton', sizes: 'XS, S, M, L', img: 'assets/img/products/pink-crop-tee.webp', now: 340,  old: 420, rating: 5, badge: 'New' },
];

const byId = (id) => CATALOG.find((p) => p.id === id);

/* Egyptian Pound formatting — whole numbers with thousand separators
   (piastras/decimals aren't used in everyday EGP retail pricing). */
function money(n) { return 'EGP ' + Math.round(n).toLocaleString('en-US'); }

/* Escapes free-typed text (search queries, account name/email typed into
   the demo sign-in form) before it's inserted via innerHTML, so someone
   typing HTML/script into a text field can't have it interpreted as
   markup — this data is echoed straight back to the same browser via
   localStorage/DOM with no server round-trip, but it should still never
   be treated as trusted markup. */
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* Sets a <meta> tag's content by selector — used to keep the page
   <title>/description AND Open Graph tags (og:title, og:description,
   og:image) in sync with whichever product or article is actually being
   viewed, since these pages render their content client-side. */
function setMeta(selector, content) {
  document.querySelector(selector)?.setAttribute('content', content);
}

/* Care instructions derived from each product's material text, so a
   cashmere scarf and a pair of sneakers don't both claim the same wash
   instructions the old static "Cotton blend / machine wash" spec did. */
function careFor(material) {
  const m = material.toLowerCase();
  if (m.includes('cashmere') || m.includes('silk') || m.includes('merino')) return 'Hand wash cold or dry clean, lay flat to dry';
  if (m.includes('wool')) return 'Dry clean only';
  if (m.includes('leather')) return 'Wipe clean with a soft, dry cloth';
  if (m.includes('mesh upper')) return 'Wipe clean with a damp cloth, air dry';
  if (m.includes('acetate') || m.includes('metal frame')) return 'Wipe with a microfiber cloth, store in a case';
  if (m.includes('stainless steel')) return 'Wipe clean, avoid water submersion';
  if (m.includes('spandex') || m.includes('elastane') || m.includes('nylon')) return 'Machine wash cold, do not tumble dry';
  return 'Machine wash cold, tumble dry low';
}

/* Hex swatches for every color used across the catalog, so the shop's
   color filter always covers every product (not just an original subset). */
const COLOR_HEX = {
  Black: '#222', White: '#f3f0ea', Brown: '#a6783f', Beige: '#d8c3a5',
  Grey: '#9b9b9b', Blue: '#6c8ab0', Navy: '#2b3a55', Olive: '#6b6e3e',
  Pink: '#e8a8b8', Burgundy: '#7a2438', Tan: '#c8a878', Camel: '#b08d57',
  Cream: '#f2e9d8', Multi: 'linear-gradient(135deg,#c98f3e,#7a2438,#2b3a55)',
  Purple: '#8467a8', Charcoal: '#3d3a36', Gold: '#c9a227', Silver: '#b9bcc2',
  Khaki: '#a89a6b', Sand: '#d9c4a0', Red: '#a83232',
};

/* =========================================================
   BLOG — shared dataset used by both blog.html (listing) and
   blog-details.html (article page), keyed by a stable `id` rather than
   the raw title text, so every article opens with its own real title,
   cover image, date and body instead of always showing the same one.
   ========================================================= */
const BLOG_POSTS = [
  {
    id: 'fall-fashion-frenzy',
    title: 'Fall Fashion Frenzy: The Ultimate Style Guide',
    tags: ['Women', 'Fashion', 'Sale'],
    tag: 'Fashion',
    date: '26 March 2026',
    readTime: '5 min read',
    excerpt: 'Discover the must-have pieces, layering tricks and seasonal palettes that will keep you ahead of every trend this fall — from caramel knits to structured outerwear.',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    body: [
      { p: 'There is a particular kind of anticipation that comes with the turn of every season — the chance to reset, to reconsider what we wear, and to find new confidence in a considered wardrobe. This fall, we are leaning into warmth: caramel and cinnamon, deep olive, soft cream and unexpected touches of gold.' },
      { h3: 'Mixing Textures & Tones' },
      { p: 'The secret to a layered fall look is contrast. A chunky wool knit over a silk slip dress. A structured leather bag against the softness of brushed cotton. The textures do the talking — colour only needs to whisper.' },
      { quote: 'Fashion is the armor to survive the reality of everyday life — wear it with confidence.' },
      { h3: 'Building a Capsule Wardrobe' },
      { p: 'The best wardrobes are built slowly, piece by piece. Start with neutral, timeless basics that work in every combination. Add seasonal statement pieces that feel right for you. And accessorize — the right bag, watch or pair of sunglasses can refresh any look without effort.' },
      { list: ['Start with neutral, timeless basics', 'Add seasonal statement pieces', 'Accessorize to refresh any look', 'Choose natural fabrics — they age beautifully'] },
      { h3: 'The Final Word' },
      { p: 'Style is personal, and the most interesting wardrobes are the ones that tell a story. This fall, we invite you to invest in fewer, better pieces — and wear them with intention.' },
    ],
  },
  {
    id: 'kids-casual-looks',
    title: 'Top 10 Casual Looks to Dress Up Your Kids',
    tags: ['Kids', 'Casual', 'Everyday'],
    tag: 'Kids',
    date: '22 March 2026',
    readTime: '4 min read',
    excerpt: 'Effortless weekend outfits that photograph beautifully and survive real life.',
    img: 'https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?auto=format&fit=crop&w=900&q=80',
    body: [
      { p: 'Dressing kids is a balancing act: the outfit needs to look put-together in photos, survive a playground, and — most importantly — actually be comfortable enough that your child forgets they are wearing it at all. Here is how we approach it.' },
      { h3: 'Comfort Comes First' },
      { p: 'Soft, breathable cotton and stretch-knit blends win every time over stiff, structured fabrics. Look for flat seams, tagless labels and elastic waistbands that move with an active day rather than fighting it.' },
      { h3: 'Build Around Easy Basics' },
      { p: 'A handful of well-made staples — plain tees, soft joggers, a versatile hoodie — mix and match into a week of outfits without any real effort. Let bold colour or a fun print do the personality work on top of a simple base.' },
      { list: ['Choose soft, tagless, breathable fabrics', 'Stick to easy-care pieces that machine wash well', 'Let one bold item lead, keep the rest simple', 'Save the delicate fabrics for special occasions'] },
      { h3: 'Let Them Choose' },
      { p: 'Giving kids a say — even just picking between two approved outfits — builds confidence and cuts down on morning battles. A wardrobe that is easy to mix and match makes that freedom low-risk for parents too.' },
    ],
  },
  {
    id: 'street-wear-trends',
    title: 'Latest Trends of Wearing Street Wear Supremely',
    tags: ['Street', 'Menswear', 'Trends'],
    tag: 'Street',
    date: '25 March 2026',
    readTime: '4 min read',
    excerpt: 'How to mix technical fabrics and tailoring without losing yourself.',
    img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    body: [
      { p: 'Street style has outgrown its "just sneakers and a hoodie" reputation. The strongest looks right now balance relaxed, technical pieces against sharper tailoring — proof that comfort and polish were never mutually exclusive.' },
      { h3: 'Proportion Is Everything' },
      { p: 'An oversized jacket reads intentional next to slim, tapered trousers. The same jacket over baggy fits can look sloppy. Street style lives and dies on proportion — pick one silhouette to go big, and keep the rest closer to the body.' },
      { h3: 'Let the Sneakers Lead' },
      { p: 'Footwear is often the anchor of a street look. Choose one hero pair and let the rest of the outfit support it in tone rather than compete with it — a neutral fit lets a statement sneaker do the talking.' },
      { list: ['Pick one silhouette to exaggerate, keep the rest fitted', 'Layer a technical jacket over simple knitwear', 'Let one accent colour repeat through the outfit', 'Invest in one hero sneaker and build around it'] },
      { h3: 'Confidence Is the Real Trend' },
      { p: 'Every trend cycle eventually circles back to the same truth: the outfit only works if you wear it like you mean it. Start with pieces you genuinely reach for, then experiment from there.' },
    ],
  },
  {
    id: 'comfortable-clothes-women',
    title: 'Types of Comfortable Clothes for Women',
    tags: ['Women', 'Comfort', 'Basics'],
    tag: 'Women',
    date: '23 March 2026',
    readTime: '4 min read',
    excerpt: 'Soft fabrics, considered cuts and the silhouettes worth investing in.',
    img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80',
    body: [
      { p: 'Comfort and style used to feel like a trade-off. Not anymore. "Elevated loungewear" — soft, relaxed pieces cut with real intention — has become a wardrobe category of its own, and it deserves a permanent place in every rotation.' },
      { h3: 'Fabric Is the Foundation' },
      { p: 'Natural fibres like cotton, linen and modal breathe better and age more gracefully than synthetic blends. They soften with every wash instead of pilling, which makes them worth the slightly higher price tag.' },
      { h3: 'Relaxed Doesn’t Mean Shapeless' },
      { p: 'A well-cut wide-leg trouser or a softly structured wrap dress can be just as comfortable as sweatpants while still holding its shape. Look for pieces with a defined waist or a considered drape rather than anything fully boxy.' },
      { list: ['Prioritise natural, breathable fabrics', 'Look for a defined waist or drape, not just "loose"', 'Knitwear is the easiest way to layer comfortably', 'One elevated loungewear set can double as errands-to-evening'] },
      { h3: 'Comfort That Travels Well' },
      { p: 'The best test of a comfortable wardrobe is a long day — errands, work, dinner. Pieces that move with you through all three, without a single outfit change, are the ones worth repeating.' },
    ],
  },
  {
    id: 'brown-coat-styling',
    title: 'How to Style a Classic Brown Coat',
    tags: ['Guide', 'Outerwear', 'Women'],
    tag: 'Guide',
    date: '20 March 2026',
    readTime: '3 min read',
    excerpt: 'Four ways to wear the most versatile piece in your wardrobe.',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
    body: [
      { p: 'A well-made brown coat is one of those rare pieces that works with almost everything already in your closet. Its warm, neutral tone pairs as easily with black as it does with cream, olive or navy. Here are four ways we wear ours.' },
      { h3: '1. Over Tailoring, for the Office' },
      { p: 'Layer it over a crisp shirt and straight trousers for a polished, put-together commute look. Let the coat hang open to show the tailoring underneath rather than buttoning it all the way.' },
      { h3: '2. With Denim, for the Weekend' },
      { p: 'A brown coat instantly elevates a simple jeans-and-sweater combination. Add ankle boots and a structured bag to keep the whole outfit feeling deliberate rather than thrown together.' },
      { list: ['Office: over tailoring, worn open', 'Weekend: with denim and boots', 'Cold days: layered over a chunky knit', 'Evening: over a slip dress with heels'] },
      { h3: '3–4. Layered for Cold Days, Dressed Up for Evening' },
      { p: 'On colder days, add a chunky knit underneath for warmth without bulk. Come evening, the same coat draped over a slip dress instantly dresses the look up — proof that one great coat can carry an entire season.' },
    ],
  },
  {
    id: 'accessories-elevate-outfit',
    title: 'Accessories That Elevate Any Outfit',
    tags: ['Accessories', 'Styling'],
    tag: 'Accessories',
    date: '18 March 2026',
    readTime: '4 min read',
    excerpt: 'The small details — bag, belt, watch — that quietly change everything.',
    img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
    body: [
      { p: 'It is rarely the clothes alone that make an outfit memorable — it is what is layered, clasped or slung over them. A handful of well-chosen accessories can make the same five outfits feel like fifty.' },
      { h3: 'The Bag Sets the Tone' },
      { p: 'A structured bag reads formal even over the simplest outfit; a slouchy tote instantly relaxes a sharp look. Before reaching for a new piece of clothing, try switching the bag first — it changes more than you would expect.' },
      { h3: 'Belts Define, Scarves Polish' },
      { p: 'A belt at the waist turns a straight silhouette into a shaped one in seconds. A silk scarf — knotted at the neck or tied to a bag handle — adds a finishing touch that looks intentional rather than accidental.' },
      { list: ['Switch the bag before buying something new', 'Use a belt to define your silhouette', 'One good scarf works a dozen different ways', 'Layer jewellery in varied lengths, not matched sets'] },
      { h3: 'Fewer, Better Pieces' },
      { p: 'Accessories are one area where quality really does outperform quantity. A handful of well-made pieces you reach for constantly will always look better than a drawer full of things you never quite wear.' },
    ],
  },
  {
    id: 'summer-color-palettes',
    title: 'Summer Color Palettes You Will Love',
    tags: ['Trends', 'Color', 'Summer'],
    tag: 'Trends',
    date: '15 March 2026',
    readTime: '3 min read',
    excerpt: 'From warm sand to soft sage — the colours we are wearing all season.',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
    body: [
      { p: 'Summer is the season where colour finally gets permission to lead. This year, the palette we keep returning to is warm and sun-soaked — built around tones that look as good against tanned skin as they do in low evening light.' },
      { h3: 'Warm Neutrals as a Base' },
      { p: 'Sand, terracotta and soft caramel work as a base layer for almost any summer palette. They read as neutral as black or white, but bring far more warmth to photos and to skin tones across the board.' },
      { h3: 'One Confident Accent' },
      { p: 'Against that warm base, a single confident accent — soft sage, dusty pink or a deep marine blue — goes a long way. Resist the urge to add a second; let one colour have the room to stand out.' },
      { list: ['Build outfits around one warm neutral base', 'Add a single accent colour, not several', 'Crisp white grounds any bold palette', 'Repeat your accent colour in accessories for cohesion'] },
      { h3: 'Confidence Over Rules' },
      { p: 'Colour theory is a helpful starting point, not a rulebook. The palettes that actually work are the ones you feel most like yourself in — everything else is just guidance.' },
    ],
  },
];
const blogById = (id) => BLOG_POSTS.find((p) => p.id === id);

/* ---------- Product card ---------- */
function badgeClass(label) {
  if (!label) return 'card__badge';
  if (/^new$/i.test(label)) return 'card__badge card__badge--new';
  if (/^hot$/i.test(label)) return 'card__badge card__badge--hot';
  return 'card__badge';
}

function cardHTML(p) {
  return `
  <article class="card reveal">
    <div class="card__media">
      <span class="${badgeClass(p.badge)}">${p.badge}</span>
      <button class="card__wish" aria-label="Add ${p.name} to wishlist" data-wish="${p.id}">${ICON.heart}</button>
      <a href="product.html?id=${p.id}" aria-label="View ${p.name}"><img class="card__img" src="${p.img}" alt="${p.name}" loading="lazy" /></a>
      <button class="card__quick" data-quick="${p.id}" aria-label="Quick view ${p.name}">Quick View</button>
      <button class="card__cart" data-add="${p.id}" aria-label="Add ${p.name} to cart">${ICON.bag} Add To Cart</button>
    </div>
    <div class="card__body">
      <span class="card__cat">${p.cat}</span>
      <h3 class="card__name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <span class="card__name-ar" dir="rtl" lang="ar">${p.nameAr}</span>
      <span class="card__rating"><span class="card__stars">${STARS(p.rating)}</span> ${p.rating}.0</span>
      <div class="card__price"><span class="card__price-now">${money(p.now)}</span><span class="card__price-old">${money(p.old)}</span></div>
    </div>
  </article>`;
}
function renderProducts(id, list) {
  const grid = document.getElementById(id);
  if (grid) grid.innerHTML = list.map(cardHTML).join('');
}

/* ---------- Shared pagination ----------
   Renders real page-count controls into `nav` for `totalItems` at
   `pageSize` per page, calling onChange(page) when a control is used.
   Used by both Shop and Blog so neither ships fake "1 2 3 Next" buttons
   that don't correspond to the actual amount of content. */
function renderPagination(nav, totalItems, pageSize, currentPage, onChange) {
  if (!nav) return;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  currentPage = Math.min(Math.max(1, currentPage), totalPages);
  if (totalPages <= 1) { nav.innerHTML = ''; nav.hidden = true; return; }
  nav.hidden = false;
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pagination__btn${i === currentPage ? ' is-active' : ''}" data-page="${i}" aria-current="${i === currentPage ? 'page' : 'false'}" aria-label="Page ${i}">${i}</button>`;
  }
  html += `<button class="pagination__btn pagination__next" data-page="${Math.min(currentPage + 1, totalPages)}"${currentPage === totalPages ? ' disabled' : ''} aria-label="Next page">Next →</button>`;
  nav.innerHTML = html;
  nav.querySelectorAll('[data-page]').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      onChange(parseInt(btn.dataset.page, 10));
      nav.closest('main, section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );
  return totalPages;
}

/* ---------- Home grids ---------- */
// Deals of the day: 4 hot/discounted picks (mix of categories)
renderProducts('dealsGrid', [
  CATALOG.find((p) => p.id === 'white-shirt'),
  CATALOG.find((p) => p.id === 'leggings-black'),
  CATALOG.find((p) => p.id === 'mom-jeans'),
  CATALOG.find((p) => p.id === 'kids-hoodie'),
]);
// Latest Collection: 4 newest arrivals across women/men
renderProducts('latestGrid', [
  CATALOG.find((p) => p.id === 'linen-blazer'),
  CATALOG.find((p) => p.id === 'bomber-jacket'),
  CATALOG.find((p) => p.id === 'floral-maxi'),
  CATALOG.find((p) => p.id === 'polo-shirt'),
]);
// Trending Now: Hot + New + Best rated
renderProducts('trendingGrid', [
  CATALOG.find((p) => p.id === 'silk-wrap-dress'),
  CATALOG.find((p) => p.id === 'suit-blazer'),
  CATALOG.find((p) => p.id === 'running-sneakers'),
  CATALOG.find((p) => p.id === 'minimal-watch'),
]);
// Sportswear Collection: all tagged + sportswear category
renderProducts('sportsGrid', CATALOG.filter((p) => p.tag === 'sportswear' || p.cat === 'Sportswear').slice(0, 5));
// New Arrivals: latest 6 by reverse index
renderProducts('newArrivalsGrid', CATALOG.slice(-6));
// Featured Brand (Puma) — mixed sportswear + menswear picks
renderProducts('featuredBrandGrid', [
  CATALOG.find((p) => p.id === 'jacket-black'),
  CATALOG.find((p) => p.id === 'track-pants'),
  CATALOG.find((p) => p.id === 'running-sneakers'),
  CATALOG.find((p) => p.id === 'yoga-tank'),
]);

/* =========================================================
   Cart (localStorage) + wishlist
   ========================================================= */
const cartBadge = () => document.getElementById('cartBadge');
function getCart() { try { return JSON.parse(localStorage.getItem('cl_cart') || '[]'); } catch { return []; } }
function setCart(c) { localStorage.setItem('cl_cart', JSON.stringify(c)); paintCart(); }
function paintCart() {
  const n = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartBadge, #cartBadgeMobile').forEach((b) => {
    b.textContent = n; b.style.display = n ? 'grid' : 'none';
  });
}
function addToCart(id, qty = 1) {
  // Clamp here too (not just in setCartQty) so a stray/uncapped quantity
  // from the product page's stepper, or repeated Quick View adds, can
  // never push a cart line past a sane 1–99 range.
  qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
  const c = getCart();
  const ex = c.find((i) => i.id === id);
  if (ex) ex.qty = Math.max(1, Math.min(99, ex.qty + qty));
  else c.push({ id, qty });
  setCart(c);
  const p = byId(id);
  toast(p ? `${p.name} added to cart` : 'Added to cart');
}
function removeFromCart(id) {
  setCart(getCart().filter((i) => i.id !== id));
}
function setCartQty(id, qty) {
  const c = getCart();
  const item = c.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(99, qty | 0));
  setCart(c);
}
const SHIP_THRESHOLD = 1000; // EGP — free shipping over EGP 1,000
const SHIP_FLAT = 60;        // EGP — flat domestic courier rate
function cartLines() {
  return getCart()
    .map((i) => ({ ...i, product: byId(i.id) }))
    .filter((i) => i.product);
}
function cartTotals() {
  const lines = cartLines();
  const subtotal = lines.reduce((s, l) => s + l.product.now * l.qty, 0);
  const shipping = lines.length === 0 || subtotal >= SHIP_THRESHOLD ? 0 : SHIP_FLAT;
  const total = subtotal + shipping;
  return { lines, subtotal, shipping, total };
}
paintCart();

function getWishlist() { try { return JSON.parse(localStorage.getItem('cl_wish') || '[]'); } catch { return []; } }
function setWishlist(arr) { localStorage.setItem('cl_wish', JSON.stringify(arr)); paintWishlistBadge(); }
function toggleWish(id) {
  const w = getWishlist();
  const i = w.indexOf(id);
  if (i >= 0) { w.splice(i, 1); toast('Removed from wishlist'); }
  else { w.push(id); const p = byId(id); toast(p ? `${p.name} saved` : 'Saved to wishlist'); }
  setWishlist(w);
}
function paintWishlist() {
  const w = getWishlist();
  document.querySelectorAll('[data-wish]').forEach((el) => {
    const id = el.dataset.wish;
    const saved = w.includes(id);
    el.classList.toggle('is-active', saved);
    el.innerHTML = saved ? ICON.heartFill : ICON.heart;
  });
  paintWishlistBadge();
}
function paintWishlistBadge() {
  const n = getWishlist().length;
  document.querySelectorAll('#wishBadge, #wishBadgeMobile').forEach((b) => {
    b.textContent = n; b.style.display = n ? 'grid' : 'none';
  });
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-show'), 2400);
}

/* ---------- Global click delegation ---------- */
document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add, parseInt(add.dataset.qty || '1', 10));
    const b = cartBadge();
    b?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 320, easing: 'cubic-bezier(.22,.61,.36,1)' });
  }
  const wish = e.target.closest('[data-wish]');
  if (wish) {
    e.preventDefault();
    toggleWish(wish.dataset.wish);
    paintWishlist();
  }
  const quick = e.target.closest('[data-quick]');
  if (quick) { e.preventDefault(); openQuickView(quick.dataset.quick); }
  // Only the dark backdrop itself (a direct click on .qv-overlay) or the
  // explicit close button should dismiss Quick View — matching with
  // closest('.qv-overlay') previously also matched every click *inside*
  // the modal (Add to Cart, View Details, etc.), closing it instantly.
  if (e.target.classList.contains('qv-overlay') || e.target.closest('.qv__close')) closeQuickView();
  const shareBtn = e.target.closest('[data-share]');
  if (shareBtn) {
    e.preventDefault();
    const network = shareBtn.dataset.share;
    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent(document.title);
    // Facebook & Twitter/X support real link-share intents; Instagram and
    // YouTube have no equivalent web share URL, so those open the
    // platform itself rather than doing nothing (no more dead `#` links).
    const dest = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      instagram: SOCIAL.instagram,
      youtube: SOCIAL.youtube,
    }[network];
    if (dest) window.open(dest, '_blank', 'noopener,width=600,height=560');
  }
});
paintWishlist();

/* ---------- Quick view modal ---------- */
let qvLastFocused = null;
function openQuickView(id) {
  const p = byId(id); if (!p) return;
  qvLastFocused = document.activeElement;
  let qv = document.getElementById('quickView');
  if (!qv) {
    qv = document.createElement('div');
    qv.id = 'quickView'; qv.className = 'qv-overlay';
    document.body.appendChild(qv);
  }
  qv.innerHTML = `
    <div class="qv" role="dialog" aria-modal="true" aria-label="Quick view: ${p.name}">
      <button class="qv__close" aria-label="Close quick view">×</button>
      <img class="qv__img" src="${p.img}" alt="${p.name}" />
      <div>
        <span class="qv__cat">${p.cat}</span>
        <h3 class="qv__name">${p.name}</h3>
        <span class="qv__name-ar" dir="rtl" lang="ar">${p.nameAr}</span>
        <div class="qv__price">
          <span class="card__price-now">${money(p.now)}</span>
          <span class="card__price-old">${money(p.old)}</span>
        </div>
        <div class="card__rating" style="margin-bottom:16px"><span class="card__stars">${STARS(p.rating)}</span> ${p.rating}.0 (${20 + p.rating} reviews)</div>
        <p class="qv__desc">${p.desc}</p>
        <div class="qv__actions">
          <a href="product.html?id=${p.id}" class="btn btn--primary">View Full Details <span class="btn__arrow">→</span></a>
          <button class="btn btn--ghost" data-add="${p.id}">${ICON.bag} Add To Cart</button>
        </div>
      </div>
    </div>`;
  qv.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => qv.querySelector('.qv__close')?.focus(), 50);
}
function closeQuickView() {
  const qv = document.getElementById('quickView');
  if (!qv?.classList.contains('is-open')) return;
  qv.classList.remove('is-open');
  document.body.style.overflow = '';
  qvLastFocused?.focus();
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeQuickView(); });

/* =========================================================
   SHOP page
   ========================================================= */
const shopGrid = document.getElementById('shopGrid');
if (shopGrid) {
  const VALID_CATS = ['Women', 'Men', 'Kids', 'Sportswear', 'Accessories'];
  const urlParams = new URLSearchParams(location.search);
  const urlCat = urlParams.get('cat');
  const initialCat = VALID_CATS.includes(urlCat) ? urlCat : 'All';
  const initialQ = urlParams.get('q') || '';
  const initialSort = urlParams.get('sort') === 'newest' ? 'newest' : 'default';
  const PAGE_SIZE = 12;
  const PRICE_RANGES = {
    'under-500':  { label: 'Under EGP 500',        test: (p) => p.now < 500 },
    '500-900':    { label: 'EGP 500 — 900',        test: (p) => p.now >= 500 && p.now <= 900 },
    '900-1300':   { label: 'EGP 900 — 1,300',      test: (p) => p.now > 900 && p.now <= 1300 },
    'over-1300':  { label: 'Over EGP 1,300',       test: (p) => p.now > 1300 },
  };
  const state = { cat: initialCat, color: 'All', price: 'All', sort: initialSort, q: initialQ, page: 1 };
  const countEl = document.getElementById('shopCount');
  const paginationNav = document.getElementById('shopPagination');

  // Build the color swatches from every color actually present in the
  // catalog (not a hand-picked subset), so filtering always covers 100%
  // of products.
  const swatchWrap = document.getElementById('shopSwatches');
  if (swatchWrap) {
    const colors = [...new Set(CATALOG.map((p) => p.color))].sort();
    swatchWrap.innerHTML = [
      `<button data-filter-color="All" class="swatch is-active" style="--sw:linear-gradient(135deg,#a6783f,#3a2a1c)" aria-label="All colors" title="All colors"></button>`,
      ...colors.map((c) => `<button data-filter-color="${c}" class="swatch" style="--sw:${COLOR_HEX[c] || '#ccc'}" aria-label="${c}" title="${c}"></button>`),
    ].join('');
  }

  // Build the price buttons with a working toggle (click again to clear).
  const priceWrap = document.getElementById('shopPriceList');
  if (priceWrap) {
    priceWrap.innerHTML = Object.entries(PRICE_RANGES).map(([key, r]) =>
      `<li><button data-filter-price="${key}" class="filter-list__btn">${r.label}</button></li>`).join('');
  }

  function matches(p) {
    return (state.cat === 'All' || p.cat === state.cat) &&
      (state.color === 'All' || p.color === state.color) &&
      (state.price === 'All' || PRICE_RANGES[state.price]?.test(p)) &&
      (!state.q || p.name.toLowerCase().includes(state.q) || (p.nameAr && p.nameAr.includes(state.q)) || p.cat.toLowerCase().includes(state.q) || p.color.toLowerCase().includes(state.q));
  }

  function apply(resetPage = true) {
    if (resetPage) state.page = 1;
    let list = CATALOG.filter(matches);
    if (state.sort === 'low') list.sort((a, b) => a.now - b.now);
    if (state.sort === 'high') list.sort((a, b) => b.now - a.now);
    if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (state.sort === 'newest') list = [...list].reverse();

    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    state.page = Math.min(state.page, totalPages);
    const pageItems = list.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

    if (total === 0) {
      shopGrid.innerHTML = `<div class="shop__empty"><h4>No products match your filters</h4><p>Try adjusting the category, color or price to see more results.</p></div>`;
    } else {
      shopGrid.innerHTML = pageItems.map(cardHTML).join('');
    }
    if (countEl) {
      const from = total === 0 ? 0 : (state.page - 1) * PAGE_SIZE + 1;
      const to = Math.min(state.page * PAGE_SIZE, total);
      countEl.innerHTML = total === 0
        ? `Showing <strong>0</strong> of <strong>${CATALOG.length}</strong> products`
        : `Showing <strong>${from}–${to}</strong> of <strong>${total}</strong> products`;
    }
    renderPagination(paginationNav, total, PAGE_SIZE, state.page, (p) => { state.page = p; apply(false); });
    revealScan();
    paintWishlist();
  }

  document.querySelectorAll('[data-filter-cat]').forEach((el) =>
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-cat]').forEach((x) => x.classList.remove('is-active'));
      el.classList.add('is-active'); state.cat = el.dataset.filterCat; apply();
    })
  );
  document.addEventListener('click', (e) => {
    const sw = e.target.closest('[data-filter-color]');
    if (sw) {
      document.querySelectorAll('[data-filter-color]').forEach((x) => x.classList.remove('is-active'));
      sw.classList.add('is-active'); state.color = sw.dataset.filterColor; apply();
    }
    const pr = e.target.closest('[data-filter-price]');
    if (pr) {
      const already = pr.classList.contains('is-active');
      document.querySelectorAll('[data-filter-price]').forEach((x) => x.classList.remove('is-active'));
      state.price = already ? 'All' : pr.dataset.filterPrice;
      if (!already) pr.classList.add('is-active');
      apply();
    }
  });
  document.getElementById('shopSort')?.addEventListener('change', (e) => { state.sort = e.target.value; apply(); });
  const shopSearchInput = document.getElementById('shopSearch');
  if (shopSearchInput) {
    shopSearchInput.value = initialQ;
    shopSearchInput.addEventListener('input', (e) => { state.q = e.target.value.toLowerCase().trim(); apply(); });
  }

  // Reflect the initial category (from ?cat=) on the sidebar buttons
  const initialCatBtn = document.querySelector(`[data-filter-cat="${state.cat}"]`);
  if (initialCatBtn) {
    document.querySelectorAll('[data-filter-cat]').forEach((x) => x.classList.remove('is-active'));
    initialCatBtn.classList.add('is-active');
  }
  const sortSelect = document.getElementById('shopSort');
  if (sortSelect) sortSelect.value = state.sort;

  apply();

  // Append count badges
  ['All', 'Women', 'Men', 'Kids', 'Sportswear', 'Accessories'].forEach((c) => {
    const btn = document.querySelector(`[data-filter-cat="${c}"]`);
    if (!btn) return;
    const n = c === 'All' ? CATALOG.length : CATALOG.filter((p) => p.cat === c).length;
    const span = document.createElement('span');
    span.className = 'count'; span.textContent = n;
    btn.appendChild(span);
  });
}

/* =========================================================
   PRODUCT DETAILS page
   ========================================================= */
const pdRoot = document.getElementById('pdRoot');
if (pdRoot) {
  const params = new URLSearchParams(location.search);
  const p = byId(params.get('id')) || CATALOG[0];
  // Only one real photo exists per product — showing unrelated stock
  // photos as fake "other angles" was misleading, so the thumbnail strip
  // is only used when there truly is more than one image to browse.
  const gallery = [p.img];

  document.getElementById('pdCrumb').textContent = p.name;
  document.getElementById('pdMainImg').src = p.img;
  document.getElementById('pdMainImg').alt = p.name;
  const pdThumbsEl = document.getElementById('pdThumbs');
  if (gallery.length > 1) {
    pdThumbsEl.hidden = false;
    pdThumbsEl.innerHTML = gallery.map((g, i) =>
      `<button class="pd__thumb${i === 0 ? ' is-active' : ''}" data-img="${g}" aria-label="View image ${i + 1}"><img src="${g}" alt="${p.name} view ${i + 1}" loading="lazy"></button>`).join('');
  } else {
    pdThumbsEl.hidden = true;
  }
  document.getElementById('pdName').textContent = p.name;
  document.getElementById('pdNameAr').textContent = p.nameAr;
  document.getElementById('pdDesc').textContent = p.desc;
  document.getElementById('pdDescLong').textContent = p.desc;
  document.getElementById('specMaterial').textContent = p.material;
  document.getElementById('specSizes').textContent = p.sizes;
  document.getElementById('specColors').textContent = p.color;
  document.getElementById('specCare').textContent = careFor(p.material);
  document.getElementById('pdStars').innerHTML = `<span class="card__stars">${STARS(p.rating)}</span> <span class="pd__rcount">(${20 + p.rating} reviews)</span>`;
  const save = (p.old - p.now).toFixed(0);
  document.getElementById('pdPrice').innerHTML =
    `<span class="card__price-now">${money(p.now)}</span>
     <span class="card__price-old">${money(p.old)}</span>
     <span class="pd__save">Save ${money(save)}</span>`;
  document.getElementById('pdCat').textContent = p.cat;
  document.getElementById('pdSku').textContent = p.id.toUpperCase();

  // Inject the perks block before .pd__meta
  const perks = document.createElement('div');
  perks.className = 'pd__perks';
  perks.innerHTML = `
    <div class="pd__perk">${ICON.truck} Free shipping over EGP 1,000</div>
    <div class="pd__perk">${ICON.refresh} 30-day returns</div>
    <div class="pd__perk">${ICON.shield} Secure checkout`;
  pdRoot.querySelector('.pd__buy').after(perks);

  pdRoot.addEventListener('click', (e) => {
    const th = e.target.closest('.pd__thumb');
    if (th) {
      document.getElementById('pdMainImg').src = th.dataset.img;
      pdRoot.querySelectorAll('.pd__thumb').forEach((x) => x.classList.remove('is-active'));
      th.classList.add('is-active');
    }
    if (e.target.closest('.qty__minus')) { const i = document.getElementById('pdQty'); i.value = Math.max(1, +i.value - 1); }
    if (e.target.closest('.qty__plus')) { const i = document.getElementById('pdQty'); i.value = Math.min(99, +i.value + 1); }
  });
  pdRoot.querySelectorAll('[data-opt]').forEach((b) =>
    b.addEventListener('click', () => {
      b.parentElement.querySelectorAll('[data-opt]').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      // Update label value if present
      const label = b.parentElement.previousElementSibling;
      if (label?.classList.contains('pd__opt-label')) {
        const valEl = label.querySelector('.pd__opt-value');
        if (valEl) valEl.textContent = ': ' + b.textContent.trim();
      }
    })
  );
  document.getElementById('pdQty')?.addEventListener('change', (e) => {
    // Someone can still type a value directly (not just use +/-), so
    // clamp on change too — otherwise the field could visibly show e.g.
    // 9999 while Add to Cart silently only adds 99, which would look
    // like a bug even though the cart total is correctly capped.
    e.target.value = Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 1));
  });
  document.getElementById('pdAdd')?.addEventListener('click', () =>
    addToCart(p.id, parseInt(document.getElementById('pdQty').value, 10) || 1)
  );
  document.querySelectorAll('.tabs__btn').forEach((b) =>
    b.addEventListener('click', () => {
      document.querySelectorAll('.tabs__btn').forEach((x) => x.classList.remove('is-active'));
      document.querySelectorAll('.tabs__panel').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      document.getElementById(b.dataset.tab)?.classList.add('is-active');
    })
  );
  // Related products: prefer same category, top up with others if needed
  const sameCategory = CATALOG.filter((x) => x.id !== p.id && x.cat === p.cat);
  const others = CATALOG.filter((x) => x.id !== p.id && x.cat !== p.cat);
  renderProducts('relatedGrid', [...sameCategory, ...others].slice(0, 4));

  // Wire the wishlist heart into the shared wishlist system + paint its state
  pdRoot.querySelector('.pd__wish')?.setAttribute('data-wish', p.id);
  document.title = `${p.name} — Zay.`;
  const pdMetaDesc = `${p.desc} ${money(p.now)} · Free shipping over EGP 1,000, easy 30-day returns.`;
  setMeta('meta[name="description"]', pdMetaDesc);
  setMeta('meta[property="og:title"]', `${p.name} — Zay.`);
  setMeta('meta[property="og:description"]', pdMetaDesc);
  setMeta('meta[property="og:image"]', p.img);
  paintWishlist();
}

/* =========================================================
   BLOG ARTICLE page (blog-details.html) — fully data-driven.
   Previously this page only swapped the title text based on the ?t=
   URL param while the cover image, date, tags and entire body stayed
   hardcoded to one article — so clicking any post except "Fall Fashion
   Frenzy" showed a mismatched title paired with the wrong content.
   ========================================================= */
function blogBodyHTML(blocks) {
  return blocks.map((b) => {
    if (b.h3) return `<h3>${b.h3}</h3>`;
    if (b.quote) return `<blockquote>"${b.quote}"</blockquote>`;
    if (b.list) return `<ul class="ticks">${b.list.map((li) => `<li>${li}</li>`).join('')}</ul>`;
    return `<p>${b.p}</p>`;
  }).join('');
}
const articleRoot = document.getElementById('articleRoot');
if (articleRoot) {
  const params = new URLSearchParams(location.search);
  const reqId = params.get('id');
  // Fall back gracefully for old-style ?t=<title text> links (e.g. any
  // bookmarked/shared URL from before this page became data-driven).
  const reqTitle = params.get('t');
  const post = blogById(reqId) ||
    (reqTitle && BLOG_POSTS.find((p) => p.title.toLowerCase() === decodeURIComponent(reqTitle).toLowerCase())) ||
    BLOG_POSTS[0];

  document.getElementById('blogTags').innerHTML = post.tags.map((t) => `<span>${t}</span>`).join('');
  document.getElementById('blogPostTitle').textContent = post.title;
  document.getElementById('blogCrumb').textContent = post.title;
  document.getElementById('blogMetaDate').textContent = post.date;
  document.getElementById('blogMetaRead').textContent = post.readTime;
  document.getElementById('articleHero').src = post.img;
  document.getElementById('articleHero').alt = post.title;
  document.getElementById('articleBody').innerHTML = blogBodyHTML(post.body);
  document.title = `${post.title} — Zay.`;
  setMeta('meta[name="description"]', post.excerpt);
  setMeta('meta[property="og:title"]', `${post.title} — Zay.`);
  setMeta('meta[property="og:description"]', post.excerpt);
  setMeta('meta[property="og:image"]', post.img);

  // Related articles: prefer the same tag, top up with others, always
  // excluding the article currently being read.
  const related = [
    ...BLOG_POSTS.filter((p) => p.id !== post.id && p.tag === post.tag),
    ...BLOG_POSTS.filter((p) => p.id !== post.id && p.tag !== post.tag),
  ].slice(0, 3);
  document.getElementById('relatedArticles').innerHTML = related.map((p) => `
    <a class="post" href="blog-details.html?id=${p.id}">
      <div class="post__media"><img src="${p.img}" alt="${p.title}" loading="lazy"><span class="post__tag">${p.tag}</span></div>
      <div class="post__body">
        <span class="post__date">${p.date}</span>
        <h3 class="post__title">${p.title}</h3>
        <p class="post__excerpt">${p.excerpt}</p>
        <span class="link-arrow">Read More <span>→</span></span>
      </div>
    </a>`).join('');
}

/* =========================================================
   Testimonials (home + about)
   ========================================================= */
const testiTrack = document.getElementById('testiTrack');
if (testiTrack) {
  const testimonials = [
    { quote: 'Absolutely love the quality and the fit. The fabric feels premium and the delivery was faster than expected. Will definitely shop here again.', name: 'Salma Hassan', role: 'Verified Buyer', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80' },
    { quote: 'Best fashion store I have come across this year. Customer support was helpful and the pieces are exactly as pictured. Highly recommended.', name: 'Ahmed Mostafa', role: 'Verified Buyer', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' },
    { quote: 'Stylish, affordable and well made. I have ordered three times now and every single order exceeded my expectations. A genuine five stars.', name: 'Nourhan Ibrahim', role: 'Verified Buyer', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80' },
  ];
  testiTrack.innerHTML = `<div class="testi__track">${testimonials.map((t) => `
    <div class="testi__slide">
      <p class="testi__quote">${t.quote}</p>
      <div class="testi__stars">${STARS(t.rating)}</div>
      <img class="testi__avatar" src="${t.avatar}" alt="${t.name}" loading="lazy" />
      <div class="testi__name">${t.name}</div>
      <div class="testi__role">${t.role}</div>
    </div>`).join('')}</div>`;
  const track = testiTrack.querySelector('.testi__track');
  let idx = 0;
  const go = (n) => { idx = (n + testimonials.length) % testimonials.length; track.style.transform = `translateX(-${idx * 100}%)`; };
  document.getElementById('testiPrev')?.addEventListener('click', () => go(idx - 1));
  document.getElementById('testiNext')?.addEventListener('click', () => go(idx + 1));
  let auto = setInterval(() => go(idx + 1), 6000);
  testiTrack.addEventListener('mouseenter', () => clearInterval(auto));
  testiTrack.addEventListener('mouseleave', () => { auto = setInterval(() => go(idx + 1), 6000); });
}

/* =========================================================
   Countdown (deals)
   ========================================================= */
const cd = document.getElementById('countdown');
if (cd) {
  const end = Date.now() + 1000 * 60 * 60 * 26;
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    let d = Math.max(0, end - Date.now());
    const h = Math.floor(d / 3.6e6); d -= h * 3.6e6;
    const m = Math.floor(d / 6e4); d -= m * 6e4;
    const s = Math.floor(d / 1e3);
    cd.innerHTML = `<span>${pad(h)}</span><span class="sep">:</span><span>${pad(m)}</span><span class="sep">:</span><span>${pad(s)}</span>`;
  };
  tick(); setInterval(tick, 1000);
}

/* =========================================================
   Mobile nav / header scroll / back-to-top / promo / newsletter
   ========================================================= */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('primaryNav');
const navBackdrop = document.getElementById('navBackdrop');
function setNavOpen(open) {
  if (open) syncHeaderStackHeight();
  nav.classList.toggle('is-open', open);
  navBackdrop?.classList.toggle('is-open', open);
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.documentElement.classList.toggle('nav-open', open);
}
navToggle?.addEventListener('click', () => setNavOpen(!nav.classList.contains('is-open')));
document.getElementById('navClose')?.addEventListener('click', () => setNavOpen(false));
navBackdrop?.addEventListener('click', () => setNavOpen(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNavOpen(false); });
nav?.querySelectorAll('.nav__link').forEach((l) =>
  l.addEventListener('click', () => setNavOpen(false))
);

const header = document.getElementById('header');
const toTop = document.getElementById('toTop');

function syncHeaderStackHeight() {
  const promo = document.getElementById('promoBar');
  const promoH = (promo && !promo.classList.contains('is-hidden')) ? promo.offsetHeight : 0;
  const headerH = header ? header.offsetHeight : 0;
  document.documentElement.style.setProperty('--header-stack-h', (promoH + headerH) + 'px');
}
window.addEventListener('resize', syncHeaderStackHeight, { passive: true });
syncHeaderStackHeight();

const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 10);
  toTop?.classList.toggle('is-visible', y > 500);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('promoClose')?.addEventListener('click', () => {
  document.getElementById('promoBar')?.classList.add('is-hidden');
  syncHeaderStackHeight();
});

/* =========================================================
   Site-wide search overlay (header search icon)
   ========================================================= */
function buildSearchOverlay() {
  let ov = document.getElementById('searchOverlay');
  if (ov) return ov;
  ov = document.createElement('div');
  ov.id = 'searchOverlay';
  ov.className = 'search-overlay';
  ov.innerHTML = `
    <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search products">
      <form class="search-panel__form" id="searchPanelForm">
        <span class="search-panel__icon" aria-hidden="true">${ICON.search}</span>
        <input type="search" id="searchPanelInput" placeholder="Search for products, categories, colors…" aria-label="Search products" autocomplete="off" />
        <button type="button" class="search-panel__close" id="searchPanelClose" aria-label="Close search">&times;</button>
      </form>
      <div class="search-panel__results" id="searchPanelResults"></div>
    </div>`;
  document.body.appendChild(ov);
  return ov;
}
function renderSearchResults(raw) {
  const box = document.getElementById('searchPanelResults');
  if (!box) return;
  const q = raw.trim().toLowerCase();
  if (!q) { box.innerHTML = `<p class="search-panel__hint">Try “dress”, “Men”, “Black”, or a product name.</p>`; return; }
  const matches = CATALOG.filter((p) =>
    p.name.toLowerCase().includes(q) || (p.nameAr && p.nameAr.includes(q)) || p.cat.toLowerCase().includes(q) || p.color.toLowerCase().includes(q)
  ).slice(0, 6);
  if (matches.length === 0) {
    box.innerHTML = `<p class="search-panel__hint">No products found for “${escapeHTML(raw)}”. <a href="shop.html?q=${encodeURIComponent(raw)}">Browse the full shop →</a></p>`;
    return;
  }
  box.innerHTML = matches.map((p) => `
    <a class="search-result" href="product.html?id=${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <span><strong>${p.name}</strong><em dir="rtl" lang="ar">${p.nameAr}</em><em>${p.cat} · ${money(p.now)}</em></span>
    </a>`).join('') + `<a class="search-panel__viewall link-arrow" href="shop.html?q=${encodeURIComponent(raw)}">View all results <span>→</span></a>`;
}
let lastFocused = null;
function openSearch() {
  lastFocused = document.activeElement;
  const ov = buildSearchOverlay();
  ov.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  const input = document.getElementById('searchPanelInput');
  input.value = '';
  renderSearchResults('');
  setTimeout(() => input.focus(), 60);
}
function closeSearch() {
  const ov = document.getElementById('searchOverlay');
  if (!ov?.classList.contains('is-open')) return;
  ov.classList.remove('is-open');
  document.body.style.overflow = '';
  lastFocused?.focus();
}
document.getElementById('searchTrigger')?.addEventListener('click', openSearch);
document.getElementById('mobileSearchTrigger')?.addEventListener('click', openSearch);
document.addEventListener('click', (e) => {
  if (e.target.id === 'searchOverlay' || e.target.closest('#searchPanelClose')) closeSearch();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });
document.addEventListener('input', (e) => { if (e.target.id === 'searchPanelInput') renderSearchResults(e.target.value); });
document.addEventListener('submit', (e) => {
  if (e.target.id === 'searchPanelForm') {
    e.preventDefault();
    const q = document.getElementById('searchPanelInput').value.trim();
    if (q) location.href = `shop.html?q=${encodeURIComponent(q)}`;
  }
});

document.querySelectorAll('.js-fakeform').forEach((form) =>
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const btn = form.querySelector('button[type=submit], .btn');
    const old = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      btn.textContent = form.dataset.done || 'Done ✓';
      form.querySelectorAll('input,textarea').forEach((i) => (i.value = ''));
      setTimeout(() => { btn.textContent = old; btn.disabled = false; }, 2200);
    }, 550);
  })
);

/* =========================================================
   Contact form — real inline validation + loading/success/error states
   ========================================================= */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const statusEl = document.getElementById('contactStatus');
  const submitBtn = document.getElementById('contactSubmit');
  const submitLabel = submitBtn.innerHTML;
  const rules = {
    cfName: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    cfEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    cfMessage: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.',
  };
  function fieldWrap(el) { return el.closest('.field'); }
  function setFieldError(el, msg) {
    const wrap = fieldWrap(el);
    wrap.classList.toggle('is-invalid', !!msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    let err = wrap.querySelector('.field__error');
    if (!msg) { err?.remove(); return; }
    if (!err) { err = document.createElement('span'); err.className = 'field__error'; wrap.appendChild(err); }
    err.textContent = msg;
  }
  // Clear a field's error as soon as the person fixes it
  Object.keys(rules).forEach((id) => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => {
      const result = rules[id](el.value);
      if (result === true) setFieldError(el, null);
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    Object.entries(rules).forEach(([id, rule]) => {
      const el = document.getElementById(id);
      const result = rule(el.value);
      setFieldError(el, result === true ? null : result);
      if (result !== true && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      statusEl.className = 'form-status form-status--error';
      statusEl.textContent = 'Please fix the highlighted fields and try again.';
      firstInvalid.focus();
      return;
    }
    statusEl.className = 'form-status form-status--loading';
    statusEl.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending your message…';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
    setTimeout(() => {
      statusEl.className = 'form-status form-status--success';
      statusEl.textContent = 'Message sent! Our team will get back to you within 24 hours. (Demo form — nothing was actually emailed.)';
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitLabel;
      contactForm.reset();
    }, 900);
  });
}

/* =========================================================
   CART PAGE (cart.html)
   ========================================================= */
const cartRoot = document.getElementById('cartRoot');
if (cartRoot) {
  function renderCartPage() {
    const { lines, subtotal, shipping, total } = cartTotals();
    if (lines.length === 0) {
      cartRoot.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">${ICON.bag}</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Start exploring our latest arrivals.</p>
          <a href="shop.html" class="btn btn--primary">Continue Shopping</a>
        </div>`;
      return;
    }
    cartRoot.innerHTML = `
      <div class="cart-page__layout">
        <div class="cart-table">
          <div class="cart-table__head"><span>Product</span><span>Price</span><span>Quantity</span><span>Total</span><span></span></div>
          ${lines.map((l) => `
            <div class="cart-item">
              <div class="cart-item__product">
                <img class="cart-item__img" src="${l.product.img}" alt="${l.product.name}" loading="lazy" width="72" height="88" />
                <div>
                  <div class="cart-item__name"><a href="product.html?id=${l.id}">${l.product.name}</a></div>
                  <div class="cart-item__name-ar" dir="rtl" lang="ar">${l.product.nameAr}</div>
                  <div class="cart-item__meta">${l.product.cat} · ${l.product.color}</div>
                </div>
              </div>
              <div class="cart-item__price">${money(l.product.now)}</div>
              <div class="cart-item__qty qty">
                <button type="button" data-qty-down="${l.id}" aria-label="Decrease quantity of ${l.product.name}">−</button>
                <input type="number" min="1" max="99" value="${l.qty}" data-qty-input="${l.id}" aria-label="Quantity for ${l.product.name}" inputmode="numeric" />
                <button type="button" data-qty-up="${l.id}" aria-label="Increase quantity of ${l.product.name}">+</button>
              </div>
              <div class="cart-item__linetotal">${money((l.product.now * l.qty))}</div>
              <button type="button" class="cart-item__remove" data-remove="${l.id}" aria-label="Remove ${l.product.name} from cart">${ICON.trash}</button>
            </div>`).join('')}
        </div>
        <aside class="cart-summary">
          <h3>Order Summary</h3>
          <div class="cart-summary__row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="cart-summary__row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : money(shipping)}</span></div>
          <div class="cart-summary__row cart-summary__row--total"><span>Total</span><span>${money(total)}</span></div>
          <p class="cart-summary__note">${subtotal >= SHIP_THRESHOLD ? 'You’ve unlocked free shipping! 🎉' : `Add ${money((SHIP_THRESHOLD - subtotal))} more to your cart for free shipping.`}</p>
          <a href="checkout.html" class="btn btn--primary btn--lg">Proceed to Checkout →</a>
          <a href="shop.html" class="cart-summary__continue link-arrow">Continue Shopping <span>→</span></a>
        </aside>
      </div>`;
  }
  cartRoot.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-remove]');
    if (rm) { removeFromCart(rm.dataset.remove); renderCartPage(); return; }
    const up = e.target.closest('[data-qty-up]');
    if (up) { const id = up.dataset.qtyUp; setCartQty(id, (getCart().find((i) => i.id === id)?.qty || 0) + 1); renderCartPage(); return; }
    const down = e.target.closest('[data-qty-down]');
    if (down) { const id = down.dataset.qtyDown; setCartQty(id, (getCart().find((i) => i.id === id)?.qty || 1) - 1); renderCartPage(); }
  });
  cartRoot.addEventListener('change', (e) => {
    const inp = e.target.closest('[data-qty-input]');
    if (inp) { setCartQty(inp.dataset.qtyInput, parseInt(inp.value, 10) || 1); renderCartPage(); }
  });
  renderCartPage();
}

/* =========================================================
   WISHLIST PAGE (wishlist.html)
   ========================================================= */
const wishRoot = document.getElementById('wishRoot');
if (wishRoot) {
  function renderWishPage() {
    const ids = getWishlist();
    const items = ids.map(byId).filter(Boolean);
    if (items.length === 0) {
      wishRoot.innerHTML = `
        <div class="wishlist-empty">
          <div class="wishlist-empty__icon">${ICON.heart}</div>
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart icon on any product to save it here for later.</p>
          <a href="shop.html" class="btn btn--primary">Discover Products</a>
        </div>`;
      return;
    }
    wishRoot.innerHTML = `
      <div class="wishlist-page__bar">
        <p class="shop__count">Showing <strong>${items.length}</strong> saved item${items.length === 1 ? '' : 's'}</p>
        <button type="button" class="btn btn--outline" id="wishAddAll">Add All to Cart</button>
      </div>
      <div class="products__grid">${items.map(cardHTML).join('')}</div>`;
    paintWishlist();
    revealScan();
    document.getElementById('wishAddAll')?.addEventListener('click', () => {
      items.forEach((p) => addToCart(p.id, 1));
      toast('All wishlist items added to cart');
    });
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-wish]') && wishRoot) setTimeout(renderWishPage, 0);
  });
  renderWishPage();
}

/* =========================================================
   CHECKOUT PAGE (checkout.html)
   ========================================================= */
const checkoutRoot = document.getElementById('checkoutRoot');
if (checkoutRoot) {
  function getOrders() { try { return JSON.parse(localStorage.getItem('cl_orders') || '[]'); } catch { return []; } }
  function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('cl_orders', JSON.stringify(orders));
  }

  function renderCheckoutForm() {
    const { lines, subtotal, shipping, total } = cartTotals();
    if (lines.length === 0) {
      checkoutRoot.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">${ICON.bag}</div>
          <h2>Your cart is empty</h2>
          <p>Add a few things to your cart before checking out.</p>
          <a href="shop.html" class="btn btn--primary">Continue Shopping</a>
        </div>`;
      return;
    }
    checkoutRoot.innerHTML = `
      <div class="checkout-page__layout">
        <div>
          <div class="checkout-disclaimer">${ICON.alert}<span>This is a design demo. No real payment is collected and no order confirmation email is sent — placing an order only saves a demo record in this browser.</span></div>
          <form id="checkoutForm" novalidate>
            <div class="checkout__section">
              <h3><span class="checkout__step-num">1</span> Contact &amp; Shipping</h3>
              <p class="checkout__hint">Where should we (hypothetically) send your order?</p>
              <div class="field-row">
                <label class="field"><span>Full Name</span><input type="text" id="coName" required autocomplete="name" /></label>
                <label class="field"><span>Email</span><input type="email" id="coEmail" required autocomplete="email" /></label>
              </div>
              <div class="field-row">
                <label class="field"><span>Phone</span><input type="tel" id="coPhone" required autocomplete="tel" placeholder="+20 100 123 4567" /></label>
                <label class="field"><span>Country</span>
                  <select id="coCountry">
                    <option selected>Egypt</option>
                    <option>Saudi Arabia</option><option>United Arab Emirates</option>
                    <option>United States</option><option>United Kingdom</option><option>Canada</option><option>Other</option>
                  </select>
                </label>
              </div>
              <label class="field"><span>Street Address</span><input type="text" id="coAddress" required autocomplete="street-address" placeholder="e.g. 14 Abdel Khalek Tharwat St, Apt 5" /></label>
              <div class="field-row">
                <label class="field"><span>City / Governorate</span><input type="text" id="coCity" required autocomplete="address-level2" placeholder="e.g. Cairo" /></label>
                <label class="field"><span>Postal Code</span><input type="text" id="coZip" required autocomplete="postal-code" placeholder="e.g. 11511" /></label>
              </div>
            </div>

            <div class="checkout__section">
              <h3><span class="checkout__step-num">2</span> Payment Method</h3>
              <p class="checkout__hint">Demo only — no card details are collected on this site.</p>
              <div class="radio-options">
                <label class="radio-option">
                  <input type="radio" name="payment" value="cod" checked />
                  <span><span class="radio-option__title">Cash on Delivery</span><span class="radio-option__desc">Pay with cash when your order arrives.</span></span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="payment" value="wallet" />
                  <span><span class="radio-option__title">Mobile Wallet (Vodafone Cash / Fawry)</span><span class="radio-option__desc">Simulated for this demo — no real wallet is charged.</span></span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="payment" value="pickup" />
                  <span><span class="radio-option__title">Pay on Pickup</span><span class="radio-option__desc">Pay in-store when you collect your order.</span></span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="payment" value="demo-card" />
                  <span><span class="radio-option__title">Demo Card (simulated)</span><span class="radio-option__desc">Simulates a card payment — no real card number is requested or charged.</span></span>
                </label>
              </div>
            </div>
            <div class="form-status" id="checkoutStatus" role="status" aria-live="polite"></div>
            <button type="submit" class="btn btn--primary btn--lg" id="checkoutSubmit">Place Order (Demo) →</button>
          </form>
        </div>

        <aside class="checkout-summary">
          <h3>Order Summary</h3>
          <div class="checkout-summary__lines">
            ${lines.map((l) => `
              <div class="checkout-summary__line">
                <img src="${l.product.img}" alt="${l.product.name}" loading="lazy" />
                <div class="checkout-summary__line-info"><strong>${l.product.name}</strong><span dir="rtl" lang="ar">${l.product.nameAr}</span><span>Qty ${l.qty} · ${l.product.color}</span></div>
                <div class="checkout-summary__line-price">${money((l.product.now * l.qty))}</div>
              </div>`).join('')}
          </div>
          <div class="cart-summary__row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="cart-summary__row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : money(shipping)}</span></div>
          <div class="cart-summary__row cart-summary__row--total"><span>Total</span><span>${money(total)}</span></div>
        </aside>
      </div>`;

    const form = document.getElementById('checkoutForm');
    const statusEl = document.getElementById('checkoutStatus');
    const submitBtn = document.getElementById('checkoutSubmit');
    const submitLabel = submitBtn.innerHTML;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        statusEl.className = 'form-status form-status--error';
        statusEl.textContent = 'Please complete all required shipping fields.';
        return;
      }
      statusEl.className = 'form-status form-status--loading';
      statusEl.innerHTML = '<span class="spinner" aria-hidden="true"></span> Placing your order…';
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Placing Order…';
      const orderId = 'CL' + Date.now().toString().slice(-8);
      setTimeout(() => {
        saveOrder({
          id: orderId,
          date: new Date().toISOString(),
          name: document.getElementById('coName').value,
          email: document.getElementById('coEmail').value,
          items: lines.map((l) => ({ id: l.id, name: l.product.name, qty: l.qty, price: l.product.now, img: l.product.img })),
          subtotal, shipping, total,
        });
        setCart([]);
        renderOrderSuccess(orderId, total);
      }, 1000);
    });
  }

  function renderOrderSuccess(orderId, total) {
    checkoutRoot.innerHTML = `
      <div class="order-success">
        <div class="order-success__icon">${ICON.check}</div>
        <h2>Order Placed!</h2>
        <p>Thank you — your demo order has been recorded. (No real payment was processed and no email was sent.)</p>
        <span class="order-success__id">Order #${orderId} · ${money(total)}</span>
        <div class="order-success__actions">
          <a href="shop.html" class="btn btn--outline">Continue Shopping</a>
          <a href="account.html#orders" class="btn btn--primary">View Order in Account</a>
        </div>
      </div>`;
  }

  renderCheckoutForm();
}

/* =========================================================
   ACCOUNT PAGE (account.html)
   ========================================================= */
const accountRoot = document.getElementById('accountRoot');
if (accountRoot) {
  function getUser() { try { return JSON.parse(localStorage.getItem('cl_user') || 'null'); } catch { return null; } }
  function setUser(u) { localStorage.setItem('cl_user', JSON.stringify(u)); }
  function getAccOrders() { try { return JSON.parse(localStorage.getItem('cl_orders') || '[]'); } catch { return []; } }

  function renderAuth() {
    accountRoot.innerHTML = `
      <div class="account-auth">
        <div class="account-demo-note">${ICON.lock}<span>Demo mode — there's no real authentication backend. Your name and email are only kept in this browser's local storage.</span></div>
        <div class="account-auth__tabs">
          <button type="button" class="account-auth__tab is-active" data-tab="signin">Sign In</button>
          <button type="button" class="account-auth__tab" data-tab="register">Create Account</button>
        </div>
        <div class="account-auth__panel is-active" data-panel="signin">
          <form class="contact__form" id="signinForm" novalidate>
            <label class="field"><span>Email</span><input type="email" id="siEmail" required autocomplete="email" /></label>
            <label class="field"><span>Password</span><input type="password" id="siPassword" required minlength="4" autocomplete="current-password" /></label>
            <div class="form-status" id="signinStatus" role="status" aria-live="polite"></div>
            <button type="submit" class="btn btn--primary btn--lg">Sign In →</button>
          </form>
        </div>
        <div class="account-auth__panel" data-panel="register">
          <form class="contact__form" id="registerForm" novalidate>
            <label class="field"><span>Full Name</span><input type="text" id="rgName" required autocomplete="name" /></label>
            <label class="field"><span>Email</span><input type="email" id="rgEmail" required autocomplete="email" /></label>
            <label class="field"><span>Password</span><input type="password" id="rgPassword" required minlength="4" autocomplete="new-password" /></label>
            <div class="form-status" id="registerStatus" role="status" aria-live="polite"></div>
            <button type="submit" class="btn btn--primary btn--lg">Create Account →</button>
          </form>
        </div>
      </div>`;

    accountRoot.querySelectorAll('.account-auth__tab').forEach((tab) =>
      tab.addEventListener('click', () => {
        accountRoot.querySelectorAll('.account-auth__tab').forEach((t) => t.classList.remove('is-active'));
        accountRoot.querySelectorAll('.account-auth__panel').forEach((p) => p.classList.remove('is-active'));
        tab.classList.add('is-active');
        accountRoot.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('is-active');
      })
    );

    function handleAuthSubmit(formId, statusId, run) {
      const form = document.getElementById(formId);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusEl = document.getElementById(statusId);
        if (!form.checkValidity()) {
          form.reportValidity();
          statusEl.className = 'form-status form-status--error';
          statusEl.textContent = 'Please fill in all fields correctly.';
          return;
        }
        const btn = form.querySelector('button[type=submit]');
        const old = btn.innerHTML;
        statusEl.className = 'form-status form-status--loading';
        statusEl.innerHTML = '<span class="spinner" aria-hidden="true"></span> Just a moment…';
        btn.disabled = true;
        setTimeout(() => { run(); btn.disabled = false; btn.innerHTML = old; }, 700);
      });
    }
    handleAuthSubmit('signinForm', 'signinStatus', () => {
      const email = document.getElementById('siEmail').value;
      setUser({ name: email.split('@')[0], email });
      renderDashboard();
    });
    handleAuthSubmit('registerForm', 'registerStatus', () => {
      setUser({ name: document.getElementById('rgName').value, email: document.getElementById('rgEmail').value });
      renderDashboard();
    });
  }

  function renderDashboard() {
    const user = getUser();
    if (!user) { renderAuth(); return; }
    const orders = getAccOrders();
    const initial = (user.name || user.email || '?').trim().charAt(0).toUpperCase();
    accountRoot.innerHTML = `
      <div class="account-dash">
        <aside class="account-dash__side">
          <div class="account-dash__profile">
            <div class="account-dash__avatar">${initial}</div>
            <div><strong>${escapeHTML(user.name || 'Member')}</strong><span>${escapeHTML(user.email || '')}</span></div>
          </div>
          <nav class="account-dash__nav">
            <button type="button" data-panel="profile" class="is-active">${ICON.user} Profile</button>
            <button type="button" data-panel="orders">${ICON.box} Order History</button>
            <button type="button" data-panel="wishlist">${ICON.heart} Wishlist</button>
            <button type="button" id="accLogout" class="is-danger">${ICON.logout} Sign Out</button>
          </nav>
        </aside>
        <div>
          <div class="account-dash__panel is-active" data-content="profile">
            <div class="account-panel-box">
              <h2>Profile</h2>
              <div class="field-row">
                <label class="field"><span>Full Name</span><input type="text" value="${escapeHTML(user.name || '')}" disabled /></label>
                <label class="field"><span>Email</span><input type="email" value="${escapeHTML(user.email || '')}" disabled /></label>
              </div>
              <p class="checkout__hint">This is a demo profile stored only in your browser. Editing isn't wired to a backend yet.</p>
            </div>
          </div>
          <div class="account-dash__panel" data-content="orders">
            <div class="account-panel-box">
              <h2>Order History</h2>
              ${orders.length === 0 ? `<div class="account-orders-empty"><p>No orders yet.</p><a href="shop.html" class="btn btn--outline" style="margin-top:14px;display:inline-block;">Start Shopping</a></div>` :
                orders.map((o) => `
                  <div class="order-card">
                    <div class="order-card__head">
                      <div><div class="order-card__id">Order #${o.id}</div><div class="order-card__date">${new Date(o.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div></div>
                      <span class="order-card__status">Confirmed (Demo)</span>
                    </div>
                    <div class="order-card__items">
                      ${o.items.map((it) => `<div class="order-card__item"><span>${it.name} × ${it.qty}</span><span>${money((it.price * it.qty))}</span></div>`).join('')}
                    </div>
                    <div class="order-card__total"><span>Total</span><span>${money(o.total)}</span></div>
                  </div>`).join('')}
            </div>
          </div>
          <div class="account-dash__panel" data-content="wishlist">
            <div class="account-panel-box">
              <h2>Wishlist</h2>
              <p class="checkout__hint">Manage your saved items on the dedicated wishlist page.</p>
              <a href="wishlist.html" class="btn btn--primary" style="margin-top:10px;display:inline-block;">Go to Wishlist</a>
            </div>
          </div>
        </div>
      </div>`;

    accountRoot.querySelectorAll('.account-dash__nav button[data-panel]').forEach((btn) =>
      btn.addEventListener('click', () => {
        accountRoot.querySelectorAll('.account-dash__nav button').forEach((b) => b.classList.remove('is-active'));
        accountRoot.querySelectorAll('.account-dash__panel').forEach((p) => p.classList.remove('is-active'));
        btn.classList.add('is-active');
        accountRoot.querySelector(`[data-content="${btn.dataset.panel}"]`).classList.add('is-active');
      })
    );
    document.getElementById('accLogout')?.addEventListener('click', () => {
      localStorage.removeItem('cl_user');
      toast('Signed out');
      renderAuth();
    });
    // Deep link support: account.html#orders jumps straight to Order History
    if (location.hash === '#orders') {
      accountRoot.querySelector('[data-panel="orders"]')?.click();
    }
  }

  getUser() ? renderDashboard() : renderAuth();
}

/* =========================================================
   POLICIES PAGE — highlight the section in view in the side nav
   ========================================================= */
const policyNav = document.querySelector('.policies__nav');
if (policyNav) {
  const links = [...policyNav.querySelectorAll('a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  function syncPolicyNav() {
    const y = window.scrollY + 140;
    let current = sections[0];
    sections.forEach((s) => { if (s && s.offsetTop <= y) current = s; });
    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current?.id));
  }
  document.addEventListener('scroll', syncPolicyNav, { passive: true });
  syncPolicyNav();
}

/* =========================================================
   Initial reveal scan + auto-stagger
   ========================================================= */
revealScan();
// Failsafe: any .reveal still hidden after 2s gets revealed (covers headless screenshots & slow loads)
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 100 && r.bottom > -100) el.classList.add('is-visible');
  });
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
  }, 1200);
}, 200);

function autoStagger(parent, selector = '.reveal') {
  if (!parent) return;
  parent.querySelectorAll(selector).forEach((el, i) => {
    el.setAttribute('data-delay', Math.min(6, i + 1));
  });
}
autoStagger(document.querySelector('.hero__inner'));
autoStagger(document.querySelector('.features'));
autoStagger(document.querySelector('.categories'));
autoStagger(document.querySelector('.stats'));
autoStagger(document.querySelector('.values'));
autoStagger(document.querySelector('.team'));
autoStagger(document.querySelector('.instagram'));
autoStagger(document.querySelector('.brands'));
autoStagger(document.querySelector('.footer__grid'));
autoStagger(document.querySelector('.page-head'));
autoStagger(document.querySelector('.contact__grid'));
autoStagger(document.querySelector('.contact__form'));