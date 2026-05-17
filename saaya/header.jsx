/* eslint-disable no-undef */
/* ============================================================
   SAAYA — Header, cart drawer, toast
   ============================================================ */

const { useEffect: hUseEffect } = React;

/* ---- icons ---- */
const Icon = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  minus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 12 10 18 20 6" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16l14-14 6 6L8 22z" />
      <path d="M7 7l2 2M10 4l2 2M4 10l2 2M13 13l2 2M16 10l2 2" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
};

window.Icon = Icon;

/* ---- Header ---- */
function Header({ route, navigate, cartCount, onOpenCart }) {
  return (
    <nav id="nav">
      <div className="nav-inner">
        <div className="nav-left">
          <button className={"nav-link " + (route.name === 'shop' && route.category === 'Bridal' ? 'is-active' : '')}
                  onClick={() => navigate({ name: 'shop', category: 'Bridal' })}>Bridal</button>
          <button className={"nav-link " + (route.name === 'shop' && route.category === 'Daily wear' ? 'is-active' : '')}
                  onClick={() => navigate({ name: 'shop', category: 'Daily wear' })}>Daily wear</button>
          <button className={"nav-link " + (route.name === 'shop' && route.category === 'Formal' ? 'is-active' : '')}
                  onClick={() => navigate({ name: 'shop', category: 'Formal' })}>Formal</button>
          <button className={"nav-link " + (route.name === 'shop' && route.category === "Men's" ? 'is-active' : '')}
                  onClick={() => navigate({ name: 'shop', category: "Men's" })}>Men's</button>
        </div>
        <a className="nav-brand" href="#"
           onClick={(e) => { e.preventDefault(); navigate({ name: 'home' }); }}>
          <span className="wordmark">saaya</span>
          <span className="tagline">wedding atelier</span>
        </a>
        <div className="nav-right">
          <button className="icon-btn" aria-label="Search" title="Search">{Icon.search}</button>
          <button className="icon-btn" aria-label="Locale" title="PK / PKR">{Icon.globe}</button>
          <button className="icon-btn" aria-label="Account" title="Account">{Icon.user}</button>
          <button className="icon-btn" aria-label="Wishlist" title="Wishlist">{Icon.heart}</button>
          <button className="icon-btn" aria-label="Bag" title="Bag" onClick={onOpenCart}>
            {Icon.bag}
            {cartCount > 0 && <span className="cart-badge" key={cartCount}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ---- Promo banner ---- */
function PromoBanner({ visible }) {
  if (!visible) return null;
  return (
    <div className="promo-banner">
      <span className="dot"></span>
      <span>The wedding edit '26 — now shipping</span>
      <span style={{ opacity: 0.5 }}>·</span>
      <span>Complimentary delivery on orders over <em>PKR 50,000</em></span>
    </div>
  );
}

/* ---- Cart drawer ---- */
function CartDrawer({ open, onClose, items, products, updateQty, removeItem, navigate, formatPrice }) {
  hUseEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const subtotal = items.reduce((s, it) => {
    const p = products.find(x => x.id === it.productId);
    return p ? s + p.price * it.qty : s;
  }, 0);
  const qtyTotal = items.reduce((a, b) => a + b.qty, 0);

  return (
    <>
      <div className={"cart-overlay " + (open ? "is-open" : "")} onClick={onClose} />
      <aside className={"cart-drawer " + (open ? "is-open" : "")}
             aria-hidden={!open}
             role="dialog" aria-label="Shopping bag">
        <div className="cart-head">
          <h3>Your bag <span className="count">— {qtyTotal} {qtyTotal === 1 ? 'piece' : 'pieces'}</span></h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">{Icon.close}</button>
        </div>

        {items.length > 0 && (
          <div className="cart-promo-cue">
            <span>Shipping calculated at checkout based on your country + city.</span>
          </div>
        )}

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <h4>Your bag is empty.</h4>
              <p>Begin with bridal, or wander into the festive edit.</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-ghost" onClick={() => { onClose(); navigate({ name: 'shop', category: 'Bridal' }); }}>Bridal</button>
                <button className="btn btn-ghost" onClick={() => { onClose(); navigate({ name: 'shop' }); }}>Browse all</button>
              </div>
            </div>
          ) : items.map((it) => {
            const p = products.find(x => x.id === it.productId);
            if (!p) return null;
            const Sil = SILS[p.silType];
            return (
              <div className="cart-line" key={it.key}>
                <div className="cart-line-thumb">
                  <image-slot id={`cart-${p.id}`}
                              shape="rounded" radius="4"
                              src={p.image || undefined}
                              placeholder={p.name}>
                  </image-slot>
                </div>
                <div className="cart-line-info">
                  <div className="cart-line-name">{p.name}</div>
                  <div className="cart-line-variant" style={{ color: 'var(--ink-soft)' }}>{p.type}</div>
                  <div className="cart-line-variant">
                    {Object.entries(it.variant || {}).map(([k, v]) => v).join(' · ')}
                  </div>
                  <div className="cart-line-qty">
                    <button onClick={() => updateQty(it.key, it.qty - 1)} aria-label="Decrease">{Icon.minus}</button>
                    <span className="v">{it.qty}</span>
                    <button onClick={() => updateQty(it.key, it.qty + 1)} aria-label="Increase">{Icon.plus}</button>
                  </div>
                </div>
                <div className="cart-line-side">
                  <div className="cart-line-price">{formatPrice(p.price * it.qty)}</div>
                  <button className="cart-line-remove" onClick={() => removeItem(it.key)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-row"><span>Subtotal</span><span className="v">{formatPrice(subtotal)}</span></div>
            <div className="cart-row">
              <span>Delivery</span>
              <span className="v" style={{ color: 'var(--muted)' }}>Calculated at checkout</span>
            </div>
            <div className="cart-row total"><span>Subtotal</span><span className="v">{formatPrice(subtotal)}</span></div>
            <button className="btn btn-block btn-lg" onClick={() => { onClose(); navigate({ name: 'checkout' }); }}>
              Proceed to checkout {Icon.arrow}
            </button>
            <div className="note">Custom orders processed with a 30% deposit. Tailoring included.</div>
          </div>
        )}
      </aside>
    </>
  );
}

/* ---- Toast ---- */
function Toast({ message, visible }) {
  return (
    <div className={"toast " + (visible ? "is-visible" : "")}>
      <span className="ok">{Icon.check}</span>
      <span>{message}</span>
    </div>
  );
}

Object.assign(window, { Header, PromoBanner, CartDrawer, Toast });
