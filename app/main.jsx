/* eslint-disable no-undef */
/* ============================================================
   FOYER SHOP — App root, router, cart state, tweaks integration
   ============================================================ */

const { useState: aUseState, useEffect: aUseEffect, useMemo: aUseMemo, useCallback: aUseCallback, useRef: aUseRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#F59E0B",
  "density": "regular",
  "showPromoBanner": true,
  "currency": "$",
  "buttonRadius": 3
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ['#F59E0B', '#E0533B', '#9CC55B', '#7A9FE3'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  /* live-apply tweakable CSS vars */
  aUseEffect(() => {
    document.documentElement.style.setProperty('--amber', t.accent);
    document.documentElement.style.setProperty('--color-accent', t.accent);
    document.documentElement.style.setProperty('--radius-xs', t.buttonRadius + 'px');
  }, [t.accent, t.buttonRadius]);

  /* router — restore from localStorage so refresh keeps spot */
  const [route, setRoute] = aUseState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('foyer-shop-route') || 'null');
      if (saved && saved.name) return saved;
    } catch (e) {}
    return { name: 'home' };
  });

  const navigate = aUseCallback((next) => {
    setRoute(next);
    try { localStorage.setItem('foyer-shop-route', JSON.stringify(next)); } catch (e) {}
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  }, []);

  /* cart — persistent */
  const [cart, setCart] = aUseState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('foyer-shop-cart') || '[]');
      if (Array.isArray(saved)) return saved;
    } catch (e) {}
    return [];
  });
  aUseEffect(() => {
    try { localStorage.setItem('foyer-shop-cart', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

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
    showToast(`Added ${product.name} to bag`);
  }, [showToast]);

  const quickAdd = aUseCallback((product) => {
    const variant = {};
    Object.entries(product.variants || {}).forEach(([k, v]) => variant[k] = v[0]);
    addToCart(product, variant, 1);
  }, [addToCart]);

  const updateQty = (key, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(it => it.key !== key));
    else setCart(prev => prev.map(it => it.key === key ? { ...it, qty } : it));
  };
  const removeItem = (key) => setCart(prev => prev.filter(it => it.key !== key));
  const clearCart  = () => setCart([]);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const currentProduct = aUseMemo(() => {
    if (route.name !== 'product') return null;
    return PRODUCTS.find(p => p.id === route.id) || PRODUCTS[0];
  }, [route]);

  let pageEl;
  if (route.name === 'home') {
    pageEl = <HomePage products={PRODUCTS} navigate={navigate} onQuickAdd={quickAdd} density={t.density} />;
  } else if (route.name === 'shop') {
    pageEl = <ShopPage products={PRODUCTS} navigate={navigate} onQuickAdd={quickAdd} density={t.density} initialCategory={route.category} />;
  } else if (route.name === 'product' && currentProduct) {
    pageEl = <ProductPage product={currentProduct} products={PRODUCTS} navigate={navigate} addToCart={addToCart} />;
  } else if (route.name === 'checkout') {
    pageEl = <CheckoutPage items={cart} products={PRODUCTS} navigate={navigate} currency={t.currency} clearCart={clearCart} />;
  } else {
    pageEl = <HomePage products={PRODUCTS} navigate={navigate} onQuickAdd={quickAdd} density={t.density} />;
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
        currency={t.currency}
      />
      <Toast message={toast.message} visible={toast.visible} />

      {/* TweaksPanel manages its own visibility via the host edit-mode protocol */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakColor
            label="Accent"
            value={t.accent}
            options={ACCENT_OPTIONS}
            onChange={(v) => setTweak('accent', v)}
          />
          <TweakNumber
            label="Button radius"
            value={t.buttonRadius}
            min={0} max={20} step={1} unit="px"
            onChange={(v) => setTweak('buttonRadius', v)}
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
              { value: '$', label: 'USD  $' },
              { value: '€', label: 'EUR  €' },
              { value: '£', label: 'GBP  £' },
              { value: '¥', label: 'JPY  ¥' },
            ]}
            onChange={(v) => setTweak('currency', v)}
          />
        </TweakSection>
        <TweakSection label="Voice promo">
          <TweakToggle
            label="Banner"
            value={t.showPromoBanner}
            onChange={(v) => setTweak('showPromoBanner', v)}
          />
        </TweakSection>
        <TweakSection label="Demo helpers">
          <TweakButton label="Clear cart" onClick={() => clearCart()} />
          <TweakButton label="Fill bag with sample items" onClick={() => {
            ['hello-hoodie', 'state-pins', 'static-mug'].forEach(id => {
              const p = PRODUCTS.find(x => x.id === id);
              if (p) quickAdd(p);
            });
          }} />
          <TweakButton label="Reset everything" onClick={() => {
            localStorage.removeItem('foyer-shop-route');
            localStorage.removeItem('foyer-shop-cart');
            location.reload();
          }} secondary />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

/* wait until tweaks-panel.jsx + all component scripts have run */
function bootstrap() {
  if (typeof window.useTweaks !== 'function'
      || typeof window.TweaksPanel !== 'function'
      || typeof window.Header !== 'function'
      || typeof window.HomePage !== 'function'
      || !Array.isArray(window.PRODUCTS)) {
    return setTimeout(bootstrap, 30);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
bootstrap();
