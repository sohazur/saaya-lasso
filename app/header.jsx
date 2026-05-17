/* eslint-disable no-undef */
/* ============================================================
   FOYER SHOP — Header, cart drawer, toast
   ============================================================ */

const { useState: hUseState, useEffect: hUseEffect } = React;

/* ---- icons ---- */
const Icon = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" /><line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  minus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 12 10 18 20 6" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
    </svg>
  ),
};

window.Icon = Icon;

/* ---- Header ---- */
function Header({ route, navigate, cartCount, onOpenCart }) {
  return (
    <nav id="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#" onClick={(e) => { e.preventDefault(); navigate({ name: 'home' }); }}>
          <img src="assets/mark-1.svg" alt="Foyer" />
          <span className="wordmark">FOYER</span>
          <span className="slash">/</span>
          <span className="shop">Shop</span>
        </a>
        <div className="nav-links">
          <button className={"nav-link " + (route.name === 'home' ? 'is-active' : '')}
                  onClick={() => navigate({ name: 'home' })}>Home</button>
          <button className={"nav-link " + (route.name === 'shop' ? 'is-active' : '')}
                  onClick={() => navigate({ name: 'shop' })}>Shop</button>
          <button className="nav-link" onClick={() => navigate({ name: 'shop', category: 'Apparel' })}>Apparel</button>
          <button className="nav-link" onClick={() => navigate({ name: 'shop', category: 'Objects' })}>Objects</button>
          <a className="nav-link" href="https://tryfoyer.ai" target="_blank" rel="noreferrer">tryfoyer.ai ↗</a>
        </div>
        <div className="nav-right">
          <button className="icon-btn" aria-label="Search">{Icon.search}</button>
          <button className="icon-btn" aria-label="Account">{Icon.user}</button>
          <button className="icon-btn" aria-label="Cart" onClick={onOpenCart}>
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
      <span>Voice ordering is live — tap the mic in the corner and say <em>"add the listening tee in medium"</em></span>
      <span className="try">try it</span>
    </div>
  );
}

/* ---- Cart drawer ---- */
function CartDrawer({ open, onClose, items, products, updateQty, removeItem, navigate, currency }) {
  hUseEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const subtotal = items.reduce((s, it) => {
    const p = products.find(x => x.id === it.productId);
    return p ? s + p.price * it.qty : s;
  }, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;
  const formatPrice = (n) => `${currency}${n.toFixed(2)}`;

  return (
    <>
      <div className={"cart-overlay " + (open ? "is-open" : "")} onClick={onClose} />
      <aside className={"cart-drawer " + (open ? "is-open" : "")}
             aria-hidden={!open}
             role="dialog" aria-label="Shopping cart">
        <div className="cart-head">
          <h3>Bag <span className="count">/ {items.reduce((a, b) => a + b.qty, 0)}</span></h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">{Icon.close}</button>
        </div>

        {items.length > 0 && (
          <div className="cart-voice-cue">
            <span className="mic">{Icon.mic}</span>
            <span>
              Say <strong>"checkout"</strong> to skip to payment, or <strong>"remove the cap"</strong> to pull a line.
            </span>
          </div>
        )}

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <h4>Nothing in the bag yet.</h4>
              <p>Browse the catalog or just say <strong style={{color: 'var(--amber)'}}>"show me hoodies"</strong> to the agent.</p>
              <button className="btn btn-ghost" onClick={() => { onClose(); navigate({ name: 'shop' }); }}>
                Open the catalog
              </button>
            </div>
          ) : items.map((it, i) => {
            const p = products.find(x => x.id === it.productId);
            if (!p) return null;
            const Illu = p.illu;
            return (
              <div className="cart-line" key={it.key}>
                <div className="cart-line-thumb"><Illu /></div>
                <div className="cart-line-info">
                  <div className="cart-line-name">{p.name}</div>
                  <div className="cart-line-variant">
                    {Object.entries(it.variant || {}).map(([k, v]) => `${v}`).join(' · ')}
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
              <span>Shipping</span>
              <span className="v">{shipping === 0 ? <span style={{color: 'var(--amber)'}}>Free</span> : formatPrice(shipping)}</span>
            </div>
            <div className="cart-row total"><span>Total</span><span className="v">{formatPrice(total)}</span></div>
            <button className="btn btn-block" onClick={() => { onClose(); navigate({ name: 'checkout' }); }}>
              Checkout
              <span style={{marginLeft: 4}}>{Icon.arrow}</span>
            </button>
            <div className="note">Taxes calculated at the next step. Free shipping over {currency}75.</div>
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
