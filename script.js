/* =========================================================
   Clothing. — shared chrome + interactions (Vanilla ES6+)
   Works across all pages. Header/footer injected once.
   ========================================================= */
'use strict';

/* ---------- Shared nav model ---------- */
const NAV = [
  { label: 'Home', href: 'index.html', key: 'home' },
  { label: 'Shop', href: 'shop.html', key: 'shop' },
  { label: 'Women', href: 'shop.html?cat=Women', key: 'women' },
  { label: 'Men', href: 'shop.html?cat=Men', key: 'men' },
  { label: 'Accessories', href: 'shop.html?cat=Accessories', key: 'acc' },
  { label: 'About Us', href: 'about.html', key: 'about' },
  { label: 'Contact Us', href: 'contact.html', key: 'contact' },
  { label: 'Blog', href: 'blog.html', key: 'blog' },
];

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
};

const ACTIVE = document.body.dataset.page || 'home';

/* ---------- Build header + promo ---------- */
function buildTop() {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}" class="nav__link${n.key === ACTIVE ? ' is-active' : ''}">${n.label}</a></li>`
  ).join('');

  return `
  <div class="promo-bar" id="promoBar">
    <div class="container promo-bar__inner">
      <span class="promo-bar__support">Support <a href="tel:4065550120">(406) 555-0120</a></span>
      <p class="promo-bar__text">Sign up and <strong>GET 25% OFF</strong> for your first order.<a href="#" class="promo-bar__link">Sign up now</a></p>
      <button class="promo-bar__close" id="promoClose" aria-label="Close announcement">&times;</button>
    </div>
  </div>

  <header class="header" id="header">
    <div class="container header__inner">
      <a href="index.html" class="logo" aria-label="Clothing home">
        <span class="logo__mark" aria-hidden="true">C</span>
        <span class="logo__text">Clothing<span class="logo__dot">.</span></span>
      </a>
      <nav class="nav" id="primaryNav" aria-label="Primary">
        <div class="nav__head">
          <span class="nav__head-label">Menu</span>
          <button class="nav__close" id="navClose" aria-label="Close menu">&times;</button>
        </div>
        <ul class="nav__list">${links}</ul>
      </nav>
      <div class="nav-backdrop" id="navBackdrop"></div>
      <div class="header__actions">
        <button class="icon-btn" id="searchTrigger" aria-label="Search">${ICON.search}</button>
        <a class="icon-btn" href="#" aria-label="Wishlist">${ICON.heart}</a>
        <a class="icon-btn icon-btn--cart" href="#" aria-label="Cart">${ICON.cart}<span class="cart-badge" id="cartBadge">0</span></a>
        <a class="icon-btn" href="#" aria-label="Account">${ICON.user}</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;
}

/* ---------- Build footer ---------- */
function buildBottom() {
  return `
  <footer class="footer" id="footer">
    <div class="container footer__grid">
      <div class="footer__col footer__brand">
        <a href="index.html" class="logo logo--light"><span class="logo__mark" aria-hidden="true">C</span><span class="logo__text">Clothing<span class="logo__dot">.</span></span></a>
        <p>A curated edit of modern fashion essentials — designed in our atelier, crafted for everyday confidence, delivered to your door.</p>
        <div class="footer__social">
          <a href="#" aria-label="Facebook">${ICON.fb}</a>
          <a href="#" aria-label="Twitter">${ICON.tw}</a>
          <a href="#" aria-label="Instagram">${ICON.ig}</a>
          <a href="#" aria-label="YouTube">${ICON.yt}</a>
        </div>
      </div>
      <div class="footer__col"><h4>Information</h4><ul><li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="#">Terms &amp; Conditions</a></li><li><a href="#">Privacy Policy</a></li></ul></div>
      <div class="footer__col"><h4>Quick Links</h4><ul><li><a href="shop.html">Women</a></li><li><a href="shop.html">Men</a></li><li><a href="shop.html">Accessories</a></li><li><a href="shop.html">New Arrivals</a></li></ul></div>
      <div class="footer__col"><h4>Customer Service</h4><ul><li><a href="#">My Account</a></li><li><a href="#">Track Order</a></li><li><a href="#">Returns</a></li><li><a href="#">Shipping Info</a></li></ul></div>
      <div class="footer__col"><h4>Contact</h4><ul class="footer__contact"><li>${ICON.pin} 123 Fashion Street, NY 10012</li><li>${ICON.phone} <a href="tel:4065550120">(406) 555-0120</a></li><li>${ICON.mail} <a href="mailto:hello@clothing.com">hello@clothing.com</a></li></ul></div>
    </div>
    <div class="footer__bar">
      <div class="container footer__bar-inner">
        <p>&copy; 2026 Clothing. — Crafted with care.</p>
        <div class="footer__pay">
          <span>VISA</span><span>MC</span><span>AMEX</span><span>PayPal</span><span>Apple Pay</span>
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
if (topSlot) topSlot.innerHTML = buildTop();
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
  { id: 'brown-coat',     name: 'Brown Wool Coat',         cat: 'Women', color: 'Brown', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80', now: 160, old: 220, rating: 5, badge: '-27%' },
  { id: 'classy-coat',    name: 'Classy Light Coat',       cat: 'Women', color: 'Beige', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80', now: 168, old: 220, rating: 4, badge: '-24%' },
  { id: 'brown-dress',    name: 'Modern Brown Dress',      cat: 'Women', color: 'Brown', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80', now: 90,  old: 130, rating: 5, badge: 'New' },
  { id: 'white-shirt',    name: 'Classic White Shirt',     cat: 'Women', color: 'White', img: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=500&q=80', now: 75,  old: 110, rating: 4, badge: '-32%' },
  { id: 'black-dress',    name: 'Black Evening Dress',     cat: 'Women', color: 'Black', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80', now: 120, old: 160, rating: 5, badge: 'Hot' },
  { id: 'brown-sweater',  name: 'Light Brown Sweater',     cat: 'Women', color: 'Brown', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80', now: 63,  old: 90,  rating: 4, badge: '-30%' },
  { id: 'white-skirt',    name: 'Classic White Skirt',     cat: 'Women', color: 'White', img: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=500&q=80', now: 45,  old: 70,  rating: 5, badge: 'New' },
  { id: 'beige-dress',    name: 'Beige Party Dress',       cat: 'Women', color: 'Beige', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=500&q=80', now: 90,  old: 130, rating: 4, badge: '-31%' },
  { id: 'denim-jacket',   name: 'Denim Jacket',            cat: 'Men',   color: 'Blue',  img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=500&q=80', now: 110, old: 150, rating: 5, badge: '-26%' },
  { id: 'grey-blazer',    name: 'Grey Wool Blazer',        cat: 'Men',   color: 'Grey',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80', now: 140, old: 190, rating: 5, badge: 'Hot' },
  { id: 'leather-bag',    name: 'Leather Handbag',         cat: 'Accessories', color: 'Brown', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80', now: 85, old: 120, rating: 5, badge: '-29%' },
  { id: 'sunglasses',     name: 'Retro Sunglasses',        cat: 'Accessories', color: 'Black', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80', now: 40, old: 65, rating: 4, badge: 'New' },

  /* Sportswear line */
  { id: 'jacket-black',   name: 'Black Sport Jacket',      cat: 'Men', color: 'Black', img: 'assets/img/product1.png', now: 99,  old: 140, rating: 5, badge: '-29%', tag: 'sportswear' },
  { id: 'jacket-red',     name: 'Red Hooded Jacket',       cat: 'Men', color: 'Red',   img: 'assets/img/product2.png', now: 110, old: 150, rating: 5, badge: 'Hot',  tag: 'sportswear' },
  { id: 'jacket-navy',    name: 'Navy Performance Jacket', cat: 'Men', color: 'Navy',  img: 'assets/img/product3.png', now: 120, old: 165, rating: 5, badge: 'New',  tag: 'sportswear' },
  { id: 'jacket-camo',    name: 'Camo Puffer Jacket',      cat: 'Men', color: 'Grey',  img: 'assets/img/product4.png', now: 130, old: 180, rating: 4, badge: '-28%', tag: 'sportswear' },
  { id: 'tee-black',      name: 'Classic Black Tee',       cat: 'Men', color: 'Black', img: 'assets/img/product5.png', now: 28,  old: 45,  rating: 5, badge: '-38%', tag: 'sportswear' },

  /* === 30 NEW DIVERSE PRODUCTS === */

  /* Women's (10) */
  { id: 'silk-wrap-dress',   name: 'Silk Wrap Midi Dress',     cat: 'Women', color: 'Black', img: 'assets/img/products/silk-wrap-dress.jpg', now: 145, old: 195, rating: 5, badge: 'Hot' },
  { id: 'cashmere-crew',     name: 'Cashmere Crew Sweater',    cat: 'Women', color: 'Beige', img: 'assets/img/products/cashmere-crew.jpg', now: 185, old: 240, rating: 5, badge: '-23%' },
  { id: 'mom-jeans',         name: 'High-Waist Mom Jeans',     cat: 'Women', color: 'Blue',  img: 'assets/img/products/mom-jeans.jpg', now: 78,  old: 110, rating: 4, badge: '-29%' },
  { id: 'linen-blazer',      name: 'Relaxed Linen Blazer',     cat: 'Women', color: 'White', img: 'assets/img/products/linen-blazer.jpg', now: 165, old: 220, rating: 5, badge: 'New' },
  { id: 'pleated-midi',      name: 'Pleated Midi Skirt',       cat: 'Women', color: 'Camel', img: 'assets/img/products/pleated-midi.jpg', now: 95,  old: 130, rating: 4, badge: '-27%' },
  { id: 'oversized-shirt',   name: 'Oversized Cotton Shirt',   cat: 'Women', color: 'White', img: 'assets/img/products/oversized-shirt.jpg', now: 58,  old: 85,  rating: 5, badge: '-32%' },
  { id: 'leather-leggings',  name: 'Faux Leather Leggings',    cat: 'Women', color: 'Black', img: 'assets/img/products/leather-leggings.jpg', now: 68,  old: 95,  rating: 4, badge: '-28%' },
  { id: 'floral-maxi',       name: 'Floral Print Maxi Dress',  cat: 'Women', color: 'Multi', img: 'assets/img/products/floral-maxi.jpg', now: 118, old: 160, rating: 5, badge: 'Hot' },
  { id: 'knit-cardigan',     name: 'Chunky Knit Cardigan',     cat: 'Women', color: 'Cream', img: 'assets/img/products/knit-cardigan.jpg', now: 98,  old: 140, rating: 4, badge: '-30%' },
  { id: 'tailored-trousers', name: 'Tailored Wool Trousers',   cat: 'Women', color: 'Grey',  img: 'assets/img/products/tailored-trousers.jpg', now: 105, old: 145, rating: 5, badge: '-28%' },

  /* Men's (8) */
  { id: 'oxford-shirt',      name: 'Slim Fit Oxford Shirt',    cat: 'Men', color: 'Blue',      img: 'assets/img/products/oxford-shirt.jpg', now: 65,  old: 95,  rating: 4, badge: '-32%' },
  { id: 'merino-sweater',    name: 'Merino Wool Sweater',      cat: 'Men', color: 'Navy',      img: 'assets/img/products/merino-sweater.jpg', now: 125, old: 170, rating: 5, badge: '-26%' },
  { id: 'chino-pants',       name: 'Slim Chino Pants',         cat: 'Men', color: 'Khaki',     img: 'assets/img/products/chino-pants.jpg', now: 72,  old: 100, rating: 4, badge: '-28%' },
  { id: 'polo-shirt',        name: 'Classic Pique Polo',       cat: 'Men', color: 'White',     img: 'assets/img/products/polo-shirt.jpg', now: 48,  old: 70,  rating: 5, badge: '-31%' },
  { id: 'bomber-jacket',     name: 'Quilted Bomber Jacket',    cat: 'Men', color: 'Olive',     img: 'assets/img/products/bomber-jacket.jpg', now: 158, old: 210, rating: 5, badge: 'New' },
  { id: 'suit-blazer',       name: 'Tailored Suit Blazer',     cat: 'Men', color: 'Charcoal',  img: 'assets/img/products/suit-blazer.jpg', now: 220, old: 295, rating: 5, badge: '-25%' },
  { id: 'linen-shorts',      name: 'Linen Summer Shorts',      cat: 'Men', color: 'Sand',      img: 'assets/img/products/linen-shorts.jpg', now: 55,  old: 80,  rating: 4, badge: '-31%' },
  { id: 'graphic-hoodie',    name: 'Heavyweight Cotton Hoodie', cat: 'Men', color: 'Grey',      img: 'assets/img/products/graphic-hoodie.jpg', now: 72,  old: 100, rating: 5, badge: '-28%' },

  /* Kids (4) */
  { id: 'kids-rainbow-tee',  name: 'Kids Rainbow Stripe Tee',  cat: 'Kids', color: 'Multi',  img: 'assets/img/products/kids-rainbow-tee.jpg', now: 24, old: 38, rating: 5, badge: 'New' },
  { id: 'kids-overalls',     name: 'Kids Denim Overalls',      cat: 'Kids', color: 'Blue',   img: 'assets/img/products/kids-overalls.jpg', now: 48, old: 68, rating: 4, badge: '-29%' },
  { id: 'kids-puffer',       name: 'Kids Puffer Jacket',       cat: 'Kids', color: 'Pink',   img: 'assets/img/products/kids-puffer.jpg', now: 68, old: 95, rating: 5, badge: 'Hot' },
  { id: 'kids-hoodie',       name: 'Kids Cotton Hoodie',       cat: 'Kids', color: 'Grey',   img: 'assets/img/products/kids-hoodie.jpg', now: 36, old: 52, rating: 4, badge: '-31%' },

  /* Sportswear (4) */
  { id: 'leggings-black',    name: 'High-Waist Performance Leggings', cat: 'Sportswear', color: 'Black',    img: 'assets/img/products/leggings-black.jpg', now: 48,  old: 72, rating: 5, badge: '-33%' },
  { id: 'running-sneakers',  name: 'Lightweight Running Sneakers',   cat: 'Sportswear', color: 'White',    img: 'assets/img/products/running-sneakers.jpg', now: 110, old: 150, rating: 5, badge: 'Hot' },
  { id: 'yoga-tank',         name: 'Stretch Yoga Tank Top',          cat: 'Sportswear', color: 'Purple',   img: 'assets/img/products/yoga-tank.jpg', now: 32,  old: 48, rating: 4, badge: '-33%' },
  { id: 'track-pants',       name: 'Tapered Track Pants',            cat: 'Sportswear', color: 'Charcoal', img: 'assets/img/products/track-pants.jpg', now: 58,  old: 85, rating: 5, badge: '-32%' },

  /* Accessories (4) */
  { id: 'crossbody-bag',     name: 'Leather Crossbody Bag',      cat: 'Accessories', color: 'Tan',      img: 'assets/img/products/crossbody-bag.jpg', now: 95,  old: 135, rating: 5, badge: '-30%' },
  { id: 'aviator-sun',       name: 'Classic Aviator Sunglasses', cat: 'Accessories', color: 'Gold',     img: 'assets/img/products/aviator-sun.jpg', now: 78,  old: 115, rating: 4, badge: '-32%' },
  { id: 'cashmere-scarf',    name: 'Cashmere Wool Scarf',        cat: 'Accessories', color: 'Burgundy', img: 'assets/img/products/cashmere-scarf.jpg', now: 65,  old: 95, rating: 5, badge: '-32%' },
  { id: 'minimal-watch',     name: 'Minimalist Leather Watch',   cat: 'Accessories', color: 'Silver',   img: 'assets/img/products/minimal-watch.jpg', now: 145, old: 195, rating: 5, badge: 'Hot' },
];

const byId = (id) => CATALOG.find((p) => p.id === id);

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
      <span class="card__rating"><span class="card__stars">${STARS(p.rating)}</span> ${p.rating}.0</span>
      <div class="card__price"><span class="card__price-now">$${p.now.toFixed(2)}</span><span class="card__price-old">$${p.old.toFixed(2)}</span></div>
    </div>
  </article>`;
}
function renderProducts(id, list) {
  const grid = document.getElementById(id);
  if (grid) grid.innerHTML = list.map(cardHTML).join('');
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
  const b = cartBadge(); if (!b) return;
  const n = getCart().reduce((s, i) => s + i.qty, 0);
  b.textContent = n; b.style.display = n ? 'grid' : 'none';
}
function addToCart(id, qty = 1) {
  const c = getCart();
  const ex = c.find((i) => i.id === id);
  if (ex) ex.qty += qty; else c.push({ id, qty });
  setCart(c);
  const p = byId(id);
  toast(p ? `${p.name} added to cart` : 'Added to cart');
}
paintCart();

function getWishlist() { try { return JSON.parse(localStorage.getItem('cl_wish') || '[]'); } catch { return []; } }
function setWishlist(arr) { localStorage.setItem('cl_wish', JSON.stringify(arr)); }
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
  const pdWish = e.target.closest('.pd__wish');
  if (pdWish) {
    const id = new URLSearchParams(location.search).get('id') || CATALOG[0]?.id;
    if (id) { toggleWish(id); pdWish.classList.toggle('is-active'); }
  }
  const quick = e.target.closest('[data-quick]');
  if (quick) { e.preventDefault(); openQuickView(quick.dataset.quick); }
  const qvClose = e.target.closest('.qv-overlay, .qv__close');
  if (qvClose) closeQuickView();
});
paintWishlist();

/* ---------- Quick view modal ---------- */
function openQuickView(id) {
  const p = byId(id); if (!p) return;
  let qv = document.getElementById('quickView');
  if (!qv) {
    qv = document.createElement('div');
    qv.id = 'quickView'; qv.className = 'qv-overlay';
    document.body.appendChild(qv);
  }
  qv.innerHTML = `
    <div class="qv" role="dialog" aria-label="Quick view">
      <button class="qv__close" aria-label="Close">×</button>
      <img class="qv__img" src="${p.img}" alt="${p.name}" />
      <div>
        <span class="qv__cat">${p.cat}</span>
        <h3 class="qv__name">${p.name}</h3>
        <div class="qv__price">
          <span class="card__price-now">$${p.now.toFixed(2)}</span>
          <span class="card__price-old">$${p.old.toFixed(2)}</span>
        </div>
        <div class="card__rating" style="margin-bottom:16px"><span class="card__stars">${STARS(p.rating)}</span> ${p.rating}.0 (${20 + p.rating} reviews)</div>
        <p class="qv__desc">Crafted from premium materials for everyday comfort and timeless style. Available in multiple sizes and colors.</p>
        <div class="qv__actions">
          <a href="product.html?id=${p.id}" class="btn btn--primary">View Full Details <span class="btn__arrow">→</span></a>
          <button class="btn btn--ghost" data-add="${p.id}">${ICON.bag} Add To Cart</button>
        </div>
      </div>
    </div>`;
  qv.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeQuickView() {
  const qv = document.getElementById('quickView');
  qv?.classList.remove('is-open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeQuickView(); });

/* =========================================================
   SHOP page
   ========================================================= */
const shopGrid = document.getElementById('shopGrid');
if (shopGrid) {
  const VALID_CATS = ['Women', 'Men', 'Kids', 'Sportswear', 'Accessories'];
  const urlCat = new URLSearchParams(location.search).get('cat');
  const initialCat = VALID_CATS.includes(urlCat) ? urlCat : 'All';
  const state = { cat: initialCat, color: 'All', sort: 'default', q: '' };
  const countEl = document.getElementById('shopCount');

  function apply() {
    let list = CATALOG.filter((p) =>
      (state.cat === 'All' || p.cat === state.cat) &&
      (state.color === 'All' || p.color === state.color) &&
      (!state.q || p.name.toLowerCase().includes(state.q))
    );
    if (state.sort === 'low') list.sort((a, b) => a.now - b.now);
    if (state.sort === 'high') list.sort((a, b) => b.now - a.now);
    if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    if (list.length === 0) {
      shopGrid.innerHTML = `<div class="shop__empty"><h4>No products match your filters</h4><p>Try adjusting the category or color to see more results.</p></div>`;
    } else {
      shopGrid.innerHTML = list.map(cardHTML).join('');
    }
    if (countEl) countEl.innerHTML = `Showing <strong>${list.length}</strong> of <strong>${CATALOG.length}</strong> products`;
    revealScan();
    paintWishlist();
  }

  document.querySelectorAll('[data-filter-cat]').forEach((el) =>
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-cat]').forEach((x) => x.classList.remove('is-active'));
      el.classList.add('is-active'); state.cat = el.dataset.filterCat; apply();
    })
  );
  document.querySelectorAll('[data-filter-color]').forEach((el) =>
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-color]').forEach((x) => x.classList.remove('is-active'));
      el.classList.add('is-active'); state.color = el.dataset.filterColor; apply();
    })
  );
  document.getElementById('shopSort')?.addEventListener('change', (e) => { state.sort = e.target.value; apply(); });
  document.getElementById('shopSearch')?.addEventListener('input', (e) => { state.q = e.target.value.toLowerCase(); apply(); });

  // Reflect the initial category (from ?cat=) on the sidebar buttons
  const initialCatBtn = document.querySelector(`[data-filter-cat="${state.cat}"]`);
  if (initialCatBtn) {
    document.querySelectorAll('[data-filter-cat]').forEach((x) => x.classList.remove('is-active'));
    initialCatBtn.classList.add('is-active');
  }

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
  const gallery = [p.img,
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=500&q=80'];

  document.getElementById('pdCrumb').textContent = p.name;
  document.getElementById('pdMainImg').src = p.img;
  document.getElementById('pdMainImg').alt = p.name;
  document.getElementById('pdThumbs').innerHTML = gallery.map((g, i) =>
    `<button class="pd__thumb${i === 0 ? ' is-active' : ''}" data-img="${g}" aria-label="View image ${i + 1}"><img src="${g}" alt="${p.name} view ${i + 1}" loading="lazy"></button>`).join('');
  document.getElementById('pdName').textContent = p.name;
  document.getElementById('pdStars').innerHTML = `<span class="card__stars">${STARS(p.rating)}</span> <span class="pd__rcount">(${20 + p.rating} reviews)</span>`;
  const save = (p.old - p.now).toFixed(0);
  document.getElementById('pdPrice').innerHTML =
    `<span class="card__price-now">$${p.now.toFixed(2)}</span>
     <span class="card__price-old">$${p.old.toFixed(2)}</span>
     <span class="pd__save">Save $${save}</span>`;
  document.getElementById('pdCat').textContent = p.cat;
  document.getElementById('pdSku').textContent = p.id.toUpperCase();

  // Inject the perks block before .pd__meta
  const perks = document.createElement('div');
  perks.className = 'pd__perks';
  perks.innerHTML = `
    <div class="pd__perk">${ICON.truck} Free shipping over $150</div>
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
    if (e.target.closest('.qty__plus')) { const i = document.getElementById('pdQty'); i.value = +i.value + 1; }
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
  renderProducts('relatedGrid', CATALOG.filter((x) => x.id !== p.id).slice(0, 4));

  // Paint wishlist state on pd page
  setTimeout(paintWishlist, 0);
}

/* =========================================================
   BLOG details ?t
   ========================================================= */
const blogTitleEl = document.getElementById('blogPostTitle');
if (blogTitleEl) {
  const t = new URLSearchParams(location.search).get('t');
  if (t) {
    blogTitleEl.textContent = decodeURIComponent(t);
    const c = document.getElementById('blogCrumb');
    if (c) c.textContent = decodeURIComponent(t);
  }
}

/* =========================================================
   Testimonials (home + about)
   ========================================================= */
const testiTrack = document.getElementById('testiTrack');
if (testiTrack) {
  const testimonials = [
    { quote: 'Absolutely love the quality and the fit. The fabric feels premium and the delivery was faster than expected. Will definitely shop here again.', name: 'Sophia Bennett', role: 'Verified Buyer', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80' },
    { quote: 'Best fashion store I have come across this year. Customer support was helpful and the pieces are exactly as pictured. Highly recommended.', name: 'James Anderson', role: 'Verified Buyer', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80' },
    { quote: 'Stylish, affordable and well made. I have ordered three times now and every single order exceeded my expectations. A genuine five stars.', name: 'Emily Carter', role: 'Verified Buyer', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80' },
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

document.querySelectorAll('.js-fakeform').forEach((form) =>
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit], .btn');
    const old = btn.textContent;
    btn.textContent = form.dataset.done || 'Done ✓';
    form.querySelectorAll('input,textarea').forEach((i) => (i.value = ''));
    setTimeout(() => (btn.textContent = old), 2500);
  })
);

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