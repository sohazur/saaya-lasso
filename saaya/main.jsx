/* eslint-disable no-undef */
/* ============================================================
   SAAYA — Main app + URL router
   Routes:
     /                       → home
     /shop                   → shop (all)
     /shop/bridal            → shop, Bridal
     /shop/daily-wear        → shop, Daily wear
     /shop/formal            → shop, Formal
     /shop/mens              → shop, Men's
     /product/<id>           → PDP for product id
     /checkout               → checkout flow
   ============================================================ */

const { useState: aUseState, useEffect: aUseEffect, useMemo: aUseMemo, useCallback: aUseCallback, useRef: aUseRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#a87729",
  "density": "regular",
  "showPromoBanner": true,
  "currency": "PKR"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ['#a87729', '#5e2530', '#2f5d4b', '#8d4a4f', '#2a3354'];

/* ─── Slug ⇄ category mapping ─── */
const CATEGORY_SLUGS = {
  'Bridal':     'bridal',
  'Daily wear': 'daily-wear',
  'Formal':     'formal',
  "Men's":      'mens',
};
const SLUG_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([k, v]) => [v, k])
);

/**
 * Lasso deep-link decoder. When a Lasso recovery SMS lands a customer
 * back on the site, the URL hash carries cart + coupon so we can
 * restore the exact context they left. Format: #lasso=<base64url-json>
 * Payload: { cart: [{title, qty, price_cents}], coupon?: string }
 */
function parseLassoHash() {
  try {
    const hash = window.location.hash || '';
    const m = hash.match(/lasso=([A-Za-z0-9_\-=]+)/);
    if (!m) return null;
    const b64 = m[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4 ? b64 + '='.repeat(4 - (b64.length % 4)) : b64;
    const json = atob(pad);
    const data = JSON.parse(json);
    return {
      cart: Array.isArray(data.cart) ? data.cart : null,
      coupon: typeof data.coupon === 'string' ? data.coupon : null,
    };
  } catch (e) {
    console.warn('[lasso] failed to parse #lasso= hash', e);
    return null;
  }
}

/** Find a Saaya product whose name matches a Lasso cart-line title. */
function findProductByTitle(title) {
  if (!title || !window.PRODUCTS) return null;
  const lc = title.toLowerCase();
  let p = window.PRODUCTS.find((x) => x.name && x.name.toLowerCase() === lc);
  if (p) return p;
  p = window.PRODUCTS.find((x) => x.name && lc.startsWith(x.name.toLowerCase()));
  if (p) return p;
  return window.PRODUCTS.find((x) => x.name && lc.includes(x.name.toLowerCase())) || null;
}

function routeFromPath(pathname) {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'home' };
  if (parts[0] === 'shop') {
    const slug = parts[1] && parts[1].toLowerCase();
    if (slug && SLUG_TO_CATEGORY[slug]) return { name: 'shop', category: SLUG_TO_CATEGORY[slug] };
    return { name: 'shop' };
  }
  if (parts[0] === 'product' && parts[1]) return { name: 'product', id: parts[1] };
  if (parts[0] === 'checkout') return { name: 'checkout' };
  if (parts[0] === 'home') return { name: 'home' };
  return { name: 'home' };
}

function pathFromRoute(route) {
  if (!route || route.name === 'home') return '/';
  if (route.name === 'shop') {
    if (route.category && CATEGORY_SLUGS[route.category]) return '/shop/' + CATEGORY_SLUGS[route.category];
    return '/shop';
  }
  if (route.name === 'product' && route.id) return '/product/' + route.id;
  if (route.name === 'checkout') return '/checkout';
  return '/';
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  aUseEffect(() => {
    document.documentElement.style.setProperty('--gold', t.accent);
  }, [t.accent]);

  const formatPrice = aUseCallback((n) => formatPKR(n, t.currency), [t.currency]);

  /* ─── URL router ─── */
  const [route, setRoute] = aUseState(() => routeFromPath(location.pathname));

  aUseEffect(() => {
    const onPop = () => setRoute(routeFromPath(location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = aUseCallback((next, opts) => {
    const path = pathFromRoute(next);
    if (path !== location.pathname + location.search) {
      try {
        if (opts && opts.replace) history.replaceState({}, '', path);
        else history.pushState({}, '', path);
      } catch (e) {}
    }
    setRoute(next);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  }, []);

  /* update <title> when route changes */
  aUseEffect(() => {
    const titles = {
      home:     'Saaya — Pakistani wedding atelier · Lahore',
      shop:     'Shop · Saaya',
      product:  'Saaya',
      checkout: 'Checkout · Saaya',
    };
    if (route.name === 'product') {
      const p = window.PRODUCTS && window.PRODUCTS.find(x => x.id === route.id);
      document.title = (p ? `${p.name} · ${p.type} — Saaya` : 'Saaya');
    } else if (route.name === 'shop' && route.category) {
      document.title = `${route.category} · Saaya`;
    } else {
      document.title = titles[route.name] || 'Saaya';
    }
  }, [route]);

  /* ─── cart ─── */
  const [cart, setCart] = aUseState(() => {
    // Lasso recovery deep-link wins over localStorage. A Lasso SMS link
    // carries the exact cart the customer left with — restoring from it
    // is the whole point of the recovery flow. localStorage is the
    // fallback for the normal case.
    const lasso = parseLassoHash();
    if (lasso && lasso.cart && lasso.cart.length > 0) {
      const restored = lasso.cart
        .map((line) => {
          const product = findProductByTitle(line.title);
          if (!product) return null;
          // Lasso lines don't have variant info — pick the first available variant
          const tone = product.tones && product.tones[0] ? product.tones[0].name : null;
          const sil = product.silhouettes && product.silhouettes[0] ? product.silhouettes[0] : null;
          const variant = {};
          if (tone) variant.tone = tone;
          if (sil) variant.silhouette = sil;
          return {
            key: product.id + '__' + Object.values(variant).join('|'),
            productId: product.id,
            variant,
            qty: line.qty || 1,
          };
        })
        .filter(Boolean);
      if (restored.length > 0) {
        console.log('[lasso] restored cart from deep-link:', restored);
        return restored;
      }
    }
    try {
      const saved = JSON.parse(localStorage.getItem('saaya-cart') || '[]');
      if (Array.isArray(saved)) return saved;
    } catch (e) {}
    return [];
  });
  aUseEffect(() => {
    try { localStorage.setItem('saaya-cart', JSON.stringify(cart)); } catch (e) {}
    // Expose the cart to the Foyer recovery widget so an abandoned-checkout
    // call knows the real items (not a DOM guess). Shape: window.foyerCart =
    // { lines: [{ title, quantity, priceCents }], totalCents }.
    //
    // Cart lines are stored as { key, productId, variant, qty } — the title
    // and price live on the PRODUCTS catalog, keyed by productId. Resolve each
    // line through the catalog so the recovery call names the real piece
    // (e.g. "Zara — Bridal Lehenga (XS · Oxblood)") instead of an empty string.
    // PRODUCTS.price is in whole PKR rupees, so multiply by 100 for cents.
    try {
      const catalog = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
      const lines = (cart || []).map((l) => {
        const p = catalog.find((x) => x.id === l.productId);
        const baseTitle = p
          ? (p.type ? `${p.name} — ${p.type}` : p.name)
          : (l.title || l.productId || 'Item');
        const variantStr = l.variant
          ? Object.values(l.variant).filter(Boolean).join(' · ')
          : '';
        const title = variantStr ? `${baseTitle} (${variantStr})` : baseTitle;
        const qty = l.qty || 1;
        const unitCents = p && typeof p.price === 'number' ? p.price * 100 : 0;
        return { title, quantity: qty, priceCents: unitCents * qty };
      });
      window.foyerCart = {
        lines,
        totalCents: lines.reduce((sum, l) => sum + (l.priceCents || 0), 0),
      };
    } catch (e) {}
  }, [cart]);

  /* ─── coupon (Lasso deep-link or manual) ─── */
  const [coupon, setCoupon] = aUseState(() => {
    const lasso = parseLassoHash();
    if (lasso && lasso.coupon) {
      console.log('[lasso] coupon applied from deep-link:', lasso.coupon);
      try { localStorage.setItem('saaya-coupon', lasso.coupon); } catch (e) {}
      return lasso.coupon;
    }
    try { return localStorage.getItem('saaya-coupon') || null; } catch (e) { return null; }
  });
  // Route the customer straight to /checkout when they arrive via a Lasso
  // deep-link so they don't have to click through the shop again.
  aUseEffect(() => {
    const lasso = parseLassoHash();
    if (lasso && (lasso.cart || lasso.coupon)) {
      window.history.replaceState({}, '', '/checkout');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Expose coupon globally so checkout.jsx (loaded as a separate script
  // tag) can read it without prop-drilling through the route.
  window.SAAYA_COUPON = coupon;
  window.SAAYA_SET_COUPON = setCoupon;

  const [drawerOpen, setDrawerOpen] = aUseState(false);
  const [toast, setToast] = aUseState({ visible: false, message: '' });
  const toastTimeout = aUseRef(null);

  const showToast = aUseCallback((msg) => {
    setToast({ visible: true, message: msg });
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(s => ({ ...s, visible: false })), 2400);
  }, []);

  const addToCart = aUseCallback((product, variant, qty) => {
    const key = product.id + '__' + Object.values(variant || {}).join('|');
    setCart(prev => {
      const existing = prev.findIndex(it => it.key === key);
      if (existing >= 0) {
        const copy = prev.slice();
        copy[existing] = { ...copy[existing], qty: copy[existing].qty + qty };
        return copy;
      }
      return [...prev, { key, productId: product.id, variant: variant || {}, qty }];
    });
    showToast(`${product.name} added to your bag`);
  }, [showToast]);

  const quickAdd = aUseCallback((product) => {
    const variant = {
      Size: product.sizes[0],
      Colour: (product.colors[0] && product.colors[0].name) || '',
    };
    addToCart(product, variant, 1);
  }, [addToCart]);

  const updateQty = (key, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(it => it.key !== key));
    else setCart(prev => prev.map(it => it.key === key ? { ...it, qty } : it));
  };
  const removeItem = (key) => setCart(prev => prev.filter(it => it.key !== key));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const currentProduct = aUseMemo(() => {
    if (route.name !== 'product') return null;
    return PRODUCTS.find(p => p.id === route.id) || PRODUCTS[0];
  }, [route]);

  let pageEl;
  if (route.name === 'home') {
    pageEl = <HomePage products={PRODUCTS} navigate={navigate} onQuickAdd={quickAdd} density={t.density} formatPrice={formatPrice} />;
  } else if (route.name === 'shop') {
    pageEl = <ShopPage products={PRODUCTS} navigate={navigate} onQuickAdd={quickAdd} density={t.density} initialCategory={route.category} formatPrice={formatPrice} />;
  } else if (route.name === 'product' && currentProduct) {
    pageEl = <ProductPage product={currentProduct} products={PRODUCTS} navigate={navigate} addToCart={addToCart} formatPrice={formatPrice} />;
  } else if (route.name === 'checkout') {
    pageEl = <CheckoutPage items={cart} products={PRODUCTS} navigate={navigate} formatPrice={formatPrice} clearCart={clearCart} />;
  } else {
    pageEl = <HomePage products={PRODUCTS} navigate={navigate} onQuickAdd={quickAdd} density={t.density} formatPrice={formatPrice} />;
  }

  return (
    <>
      <PromoBanner visible={t.showPromoBanner} />
      <Header route={route} navigate={navigate} cartCount={cartCount} onOpenCart={() => setDrawerOpen(true)} />
      {pageEl}
      <Footer />
      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cart}
        products={PRODUCTS}
        updateQty={updateQty}
        removeItem={removeItem}
        navigate={navigate}
        formatPrice={formatPrice}
      />
      <Toast message={toast.message} visible={toast.visible} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakColor
            label="Gold accent"
            value={t.accent}
            options={ACCENT_OPTIONS}
            onChange={(v) => setTweak('accent', v)}
          />
        </TweakSection>
        <TweakSection label="Catalog">
          <TweakRadio
            label="Grid density"
            value={t.density}
            options={[
              { value: 'cozy', label: '2-up' },
              { value: 'regular', label: '3-up' },
              { value: 'compact', label: '4-up' },
            ]}
            onChange={(v) => setTweak('density', v)}
          />
          <TweakSelect
            label="Currency"
            value={t.currency}
            options={[
              { value: 'PKR', label: 'PKR  ₨' },
              { value: 'USD', label: 'USD  $' },
              { value: 'GBP', label: 'GBP  £' },
              { value: 'AED', label: 'AED  د.إ' },
            ]}
            onChange={(v) => setTweak('currency', v)}
          />
        </TweakSection>
        <TweakSection label="Promo">
          <TweakToggle
            label="Promo banner"
            value={t.showPromoBanner}
            onChange={(v) => setTweak('showPromoBanner', v)}
          />
        </TweakSection>
        <TweakSection label="Demo helpers">
          <TweakButton label="Clear bag" onClick={() => clearCart()} />
          <TweakButton label="Fill bag with bridal look" onClick={() => {
            ['zara-bridal-lehenga', 'sahar-chiffon-saree', 'sarmad-sherwani'].forEach(id => {
              const p = PRODUCTS.find(x => x.id === id);
              if (p) quickAdd(p);
            });
          }} />
          <TweakButton label="Reset everything" onClick={() => {
            localStorage.removeItem('saaya-cart');
            history.replaceState({}, '', '/');
            location.reload();
          }} secondary />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function bootstrap() {
  if (typeof window.useTweaks !== 'function'
      || typeof window.TweaksPanel !== 'function'
      || typeof window.Header !== 'function'
      || typeof window.HomePage !== 'function'
      || typeof window.CheckoutPage !== 'function'
      || !Array.isArray(window.PRODUCTS)) {
    return setTimeout(bootstrap, 30);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
bootstrap();
