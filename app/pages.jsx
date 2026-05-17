/* eslint-disable no-undef */
/* ============================================================
   FOYER SHOP — Page components (Home, Shop, PDP, Checkout, Footer)
   ============================================================ */

const { useState: pUseState, useEffect: pUseEffect, useMemo: pUseMemo, useRef: pUseRef } = React;

/* ---- Product card ---- */
function ProductCard({ product, onOpen, onQuickAdd, density }) {
  const Illu = product.illu;
  return (
    <div className="product-card" onClick={() => onOpen(product)} role="button" tabIndex={0}
         onKeyDown={(e) => { if (e.key === 'Enter') onOpen(product); }}>
      <div className="canvas">
        {product.badge && (
          <span className={"canvas-tag " + (product.badge === 'NEW' ? 'is-new' : '')}>{product.badge}</span>
        )}
        <div className="canvas-illu"><Illu /></div>
        <button className="quick-add" aria-label={"Add " + product.name + " to bag"}
                onClick={(e) => { e.stopPropagation(); onQuickAdd(product); }}>
          {Icon.plus}
        </button>
      </div>
      <div className="meta">
        <div className="name">{product.name}</div>
        <div className="sub">{product.sub}</div>
        <div className="price-row">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Home page ---- */
function HomePage({ products, navigate, onQuickAdd, density }) {
  const featured = products.slice(0, 6);
  const heroProduct = products.find(p => p.id === 'whisper-bell');
  const HeroIllu = heroProduct.illu;

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <span className="line"></span>
                <span>[ Foyer / Shop ]</span>
              </div>
              <h1 className="hero-title">
                Objects for sites<br/>
                that finally <span className="accent">speak</span>.
              </h1>
              <p className="hero-sub">
                The merch closet of a voice agent company. Bell. Hoodie. Mug. Mat. Made in small batches,
                shipped with the same care we put into the install snippet.
              </p>
              <div className="hero-ctas">
                <button className="btn btn-lg" onClick={() => navigate({ name: 'shop' })}>
                  Shop everything
                  {Icon.arrow}
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => navigate({ name: 'product', id: 'hello-hoodie' })}>
                  The Hello Hoodie
                </button>
              </div>
            </div>
            <div className="hero-stage" onClick={() => navigate({ name: 'product', id: heroProduct.id })}>
              <span className="hero-stage-tag">NEW · Spring drop</span>
              <div className="hero-stage-product"><HeroIllu /></div>
              <div className="hero-stage-caption">
                <span className="who">[ FEATURED ]</span>
                <span className="what">{heroProduct.name} · ${heroProduct.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {Array.from({ length: 2 }).flatMap((_, k) => [
            'SMALL-BATCH MERCH',
            'FREE SHIPPING OVER $75',
            'VOICE ORDERING NOW LIVE',
            'EMBROIDERED IN PORTUGAL',
            'BRASS POURED IN OAKLAND',
            'SOY-COCONUT WAX',
            '60+ VOICES · 30 LANGUAGES',
            'SHIPS WORLDWIDE',
          ].map((t, i) => (
            <React.Fragment key={k + '-' + i}>
              <span>{t}</span>
              <span className="ticker-dot">·</span>
            </React.Fragment>
          )))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="collection-head">
            <div>
              <div className="tag">[ The Drop ]</div>
              <h2 className="section-title">Featured objects.</h2>
            </div>
            <div className="right">
              <span>{featured.length} of {products.length}</span>
              <button className="btn btn-ghost" onClick={() => navigate({ name: 'shop' })}>See all</button>
            </div>
          </div>
          <div className={"product-grid " + (density || '')}>
            {featured.map(p => (
              <ProductCard key={p.id} product={p}
                           onOpen={(prod) => navigate({ name: 'product', id: prod.id })}
                           onQuickAdd={onQuickAdd}
                           density={density} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div className="tag">[ The Story ]</div>
            <h2 className="section-title" style={{ marginBottom: '1.4rem', maxWidth: '14ch' }}>
              The merch closet of a voice agent.
            </h2>
            <p style={{ color: 'var(--fg65)', lineHeight: 1.7, maxWidth: '42ch', marginBottom: '1.4rem' }}>
              We built Foyer because most websites are brochures and most contact forms are graveyards.
              Then we got asked, again and again, where to buy the hoodie. So we made the hoodie.
              Then the mug. Then the rest of it.
            </p>
            <p style={{ color: 'var(--fg65)', lineHeight: 1.7, maxWidth: '42ch' }}>
              Every object here is something we'd keep on our own desk.
              Small batches, slow margins, real materials.
            </p>
          </div>
          <div className="hero-stage" style={{ aspectRatio: '4/3' }}>
            <span className="hero-stage-tag">[ since 2024 ]</span>
            <div className="hero-stage-product" style={{ padding: '14%' }}>
              {React.createElement(products.find(p => p.id === 'static-mug').illu)}
            </div>
            <div className="hero-stage-caption">
              <span className="who">[ STILL LIFE ]</span>
              <span className="what">Static Mug, ink glaze</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- Shop page ---- */
function ShopPage({ products, navigate, onQuickAdd, density, initialCategory }) {
  const [category, setCategory] = pUseState(initialCategory || 'All');
  const [sort, setSort] = pUseState('featured');

  pUseEffect(() => { if (initialCategory) setCategory(initialCategory); }, [initialCategory]);

  const filtered = pUseMemo(() => {
    let list = category === 'All' ? products.slice() : products.filter(p => p.category === category);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, sort]);

  return (
    <main className="section">
      <div className="container">
        <div className="shop-head">
          <div>
            <div className="tag">[ Catalog ]</div>
            <h1>Everything in the closet.</h1>
          </div>
          <div className="shop-controls">
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>
        </div>
        <div className="filter-bar">
          {CATEGORIES.map(cat => (
            <button key={cat}
                    className={"filter-pill " + (cat === category ? 'is-active' : '')}
                    onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
          <div className="filter-count">{filtered.length} items</div>
        </div>
        <div className={"product-grid " + (density || '')}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p}
                         onOpen={(prod) => navigate({ name: 'product', id: prod.id })}
                         onQuickAdd={onQuickAdd}
                         density={density} />
          ))}
        </div>
      </div>
    </main>
  );
}

/* ---- Product detail ---- */
function ProductPage({ product, products, navigate, addToCart }) {
  const [variant, setVariant] = pUseState(() => {
    const initial = {};
    Object.entries(product.variants || {}).forEach(([k, v]) => initial[k] = v[0]);
    return initial;
  });
  const [qty, setQty] = pUseState(1);
  const [openAcc, setOpenAcc] = pUseState('spec');
  const [adding, setAdding] = pUseState(false);

  pUseEffect(() => {
    const initial = {};
    Object.entries(product.variants || {}).forEach(([k, v]) => initial[k] = v[0]);
    setVariant(initial);
    setQty(1);
    window.scrollTo(0, 0);
  }, [product.id]);

  const Illu = product.illu;
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    setAdding(true);
    addToCart(product, variant, qty);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <main className="pdp">
      <div className="container">
        <div className="pdp-grid">
          <div className="pdp-gallery">
            <div className="pdp-main">
              <div className="pdp-main-illu"><Illu /></div>
            </div>
            <div className="pdp-thumbs">
              {[0,1,2,3].map(i => (
                <div key={i} className={"pdp-thumb " + (i === 0 ? "is-active" : "")} style={{ opacity: i === 0 ? 1 : 0.6 }}>
                  <div style={{ width: '70%', height: '70%' }}><Illu /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="pdp-info">
            <div className="pdp-breadcrumb">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate({ name: 'home' }); }}>Shop</a>
              <span className="sep">/</span>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate({ name: 'shop', category: product.category }); }}>
                {product.category}
              </a>
              <span className="sep">/</span>
              <span style={{ color: 'var(--fg65)' }}>{product.name}</span>
            </div>

            <h1 className="pdp-title">{product.name}</h1>
            <p className="pdp-subtitle">{product.tagline}</p>

            <div className="pdp-price-row">
              <span className="pdp-price">${product.price.toFixed(2)}</span>
              <span className="pdp-stock">
                <span className="pulse"></span>
                In stock · ships in {product.ships}
              </span>
            </div>

            {Object.entries(product.variants || {}).map(([key, opts]) => (
              <div className="option-block" key={key}>
                <div className="option-label">
                  <span>{key}</span>
                  <span className="value">{variant[key]}</span>
                </div>
                {key === 'Color' || key === 'Cover' || key === 'Glaze' || key === 'Finish' ? (
                  <div className="swatch-row">
                    {opts.map(opt => (
                      <button key={opt}
                              className={"swatch " + (variant[key] === opt ? 'is-active' : '')}
                              style={{ '--c': SWATCH_COLOR[opt] || 'var(--fg)' }}
                              aria-label={opt}
                              onClick={() => setVariant(v => ({ ...v, [key]: opt }))} />
                    ))}
                  </div>
                ) : (
                  <div className="option-row">
                    {opts.map(opt => (
                      <button key={opt}
                              className={"variant-pill " + (variant[key] === opt ? 'is-active' : '')}
                              onClick={() => setVariant(v => ({ ...v, [key]: opt }))}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="option-block">
              <div className="option-label"><span>Quantity</span></div>
              <div className="qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty === 1} aria-label="Decrease">{Icon.minus}</button>
                <span className="v">{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))} aria-label="Increase">{Icon.plus}</button>
              </div>
            </div>

            <div className="add-row">
              <button className="btn btn-lg" onClick={handleAdd}>
                {adding ? (
                  <>{Icon.check} Added — keep shopping</>
                ) : (
                  <>Add to bag · ${(product.price * qty).toFixed(2)}</>
                )}
              </button>
            </div>

            <div className="pdp-aside">
              <span className="mic-glyph">{Icon.mic}</span>
              <span className="copy">
                <strong>Try the voice:</strong> tap the agent and say <code>"add the {product.name.toLowerCase()} to my bag"</code>,
                or just <code>"what comes with this?"</code> and it reads the spec from this page.
              </span>
            </div>

            <div className="pdp-details" style={{ marginTop: '2rem' }}>
              <Accordion title="Description" id="desc" open={openAcc} setOpen={setOpenAcc}>
                <p>{product.blurb}</p>
              </Accordion>
              <Accordion title="Specs" id="spec" open={openAcc} setOpen={setOpenAcc}>
                <ul>
                  {product.spec.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </Accordion>
              <Accordion title="Shipping & returns" id="ship" open={openAcc} setOpen={setOpenAcc}>
                <p>Ships in {product.ships}, tracked. Worldwide. Free domestic shipping on orders over $75.</p>
                <p>30-day no-questions returns on unworn / unused items. Engraved or custom pieces are final sale.</p>
              </Accordion>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section-sm" style={{ paddingBottom: 0 }}>
            <div className="collection-head" style={{ marginBottom: '2rem' }}>
              <div>
                <div className="tag">[ Pairs Well With ]</div>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>More {product.category.toLowerCase()}.</h2>
              </div>
            </div>
            <div className="product-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p}
                             onOpen={(prod) => navigate({ name: 'product', id: prod.id })}
                             onQuickAdd={() => {}}
                             />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

const SWATCH_COLOR = {
  Ink: '#1b1b1b',
  Bone: '#eeede9',
  Amber: '#F59E0B',
  Cement: '#7f7d77',
  Olive: '#3e3e2d',
  Natural: '#d8cda9',
  Brass: '#c5a04a',
  'Matte black': '#0c0c0c',
  'Polished brass': '#d4af56',
  'Antique brass': '#7d5e2c',
};

function Accordion({ title, id, open, setOpen, children }) {
  const isOpen = open === id;
  return (
    <div className={"acc " + (isOpen ? "is-open" : "")}>
      <button className="acc-head" onClick={() => setOpen(isOpen ? null : id)}>
        {title}
        <span className="chev"></span>
      </button>
      {isOpen && <div className="acc-body">{children}</div>}
    </div>
  );
}

/* ---- Checkout page ---- */
function CheckoutPage({ items, products, navigate, currency, clearCart }) {
  const [step, setStep] = pUseState(items.length === 0 ? 0 : 1); // 1 contact, 2 shipping, 3 pay, 4 confirm
  const [promo, setPromo] = pUseState('');
  const [promoApplied, setPromoApplied] = pUseState(null);
  const [payment, setPayment] = pUseState('card');
  const [orderId, setOrderId] = pUseState(null);

  const subtotal = items.reduce((s, it) => {
    const p = products.find(x => x.id === it.productId);
    return p ? s + p.price * it.qty : s;
  }, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6;
  const discount = promoApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const tax = Math.round((subtotal - discount) * 0.085 * 100) / 100;
  const total = subtotal + shipping + tax - discount;
  const fmt = (n) => `${currency}${n.toFixed(2)}`;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'FOYER10' && !promoApplied) {
      setPromoApplied('FOYER10');
    }
  };

  const placeOrder = () => {
    const id = 'FY-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase();
    setOrderId(id);
    setStep(4);
    clearCart();
  };

  if (items.length === 0 && step !== 4) {
    return (
      <main className="checkout">
        <div className="container">
          <div className="cart-empty" style={{ padding: '6rem 0', textAlign: 'center' }}>
            <h4 style={{ fontSize: '1.6rem', color: 'var(--fg)' }}>Your bag is empty.</h4>
            <p style={{ color: 'var(--fg65)', margin: '0.8rem 0 1.6rem' }}>Add something to it first, then come back here.</p>
            <button className="btn" onClick={() => navigate({ name: 'shop' })}>Open the catalog</button>
          </div>
        </div>
      </main>
    );
  }

  if (step === 4) {
    return <ConfirmPage orderId={orderId} navigate={navigate} />;
  }

  return (
    <main className="checkout">
      <div className="container">
        <div className="tag">[ Checkout ]</div>
        <h1 className="checkout-title">Almost yours.</h1>
        <p className="checkout-sub">
          Two short steps. Or just tap the agent and say <strong style={{ color: 'var(--amber)' }}>"checkout with the same card as last time"</strong>.
        </p>

        <div className="steps">
          <div className={"step " + (step >= 1 ? "is-active" : "") + (step > 1 ? " is-done" : "")}>
            <span className="num">{step > 1 ? '✓' : '1'}</span>
            <span>Details</span>
          </div>
          <div className="sep"></div>
          <div className={"step " + (step >= 2 ? "is-active" : "") + (step > 2 ? " is-done" : "")}>
            <span className="num">{step > 2 ? '✓' : '2'}</span>
            <span>Shipping</span>
          </div>
          <div className="sep"></div>
          <div className={"step " + (step >= 3 ? "is-active" : "")}>
            <span className="num">3</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="checkout-grid">
          <div>
            {step >= 1 && (
              <div className="form-card">
                <h3>Contact & shipping</h3>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="hello@yourdomain.com" defaultValue="alex@studio.co" />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>First name</label>
                    <input defaultValue="Alex" />
                  </div>
                  <div className="field">
                    <label>Last name</label>
                    <input defaultValue="Park" />
                  </div>
                </div>
                <div className="field">
                  <label>Address</label>
                  <input defaultValue="142 Mission Street" />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>City</label>
                    <input defaultValue="San Francisco" />
                  </div>
                  <div className="field">
                    <label>ZIP</label>
                    <input defaultValue="94105" />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Country</label>
                    <select defaultValue="US">
                      <option value="US">United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>State</label>
                    <select defaultValue="CA">
                      <option>CA</option><option>NY</option><option>WA</option><option>TX</option>
                    </select>
                  </div>
                </div>
                {step === 1 && (
                  <button className="btn" style={{ marginTop: '0.6rem' }} onClick={() => setStep(2)}>
                    Continue to shipping {Icon.arrow}
                  </button>
                )}
              </div>
            )}

            {step >= 2 && (
              <div className="form-card">
                <h3>Shipping method</h3>
                <div className="payment-options">
                  <label className="is-active">
                    <input type="radio" name="ship" defaultChecked />
                    <span>
                      <div style={{fontWeight: 500}}>Standard · 3–5 business days</div>
                      <div style={{fontSize: '0.78rem', color: 'var(--fg40)'}}>Free over $75 · tracked</div>
                    </span>
                    <span className="pm-icons">{shipping === 0 ? 'FREE' : fmt(shipping)}</span>
                  </label>
                  <label>
                    <input type="radio" name="ship" />
                    <span>
                      <div style={{fontWeight: 500}}>Express · 1–2 business days</div>
                      <div style={{fontSize: '0.78rem', color: 'var(--fg40)'}}>Priority overnight</div>
                    </span>
                    <span className="pm-icons">$14.00</span>
                  </label>
                </div>
                {step === 2 && (
                  <button className="btn" style={{ marginTop: '1.2rem' }} onClick={() => setStep(3)}>
                    Continue to payment {Icon.arrow}
                  </button>
                )}
              </div>
            )}

            {step >= 3 && (
              <div className="form-card">
                <h3>Payment</h3>
                <div className="payment-options">
                  <label className={"voice-pm " + (payment === 'voice' ? "is-active" : "")}>
                    <input type="radio" name="pay" checked={payment === 'voice'} onChange={() => setPayment('voice')} />
                    <span>
                      <div style={{fontWeight: 500}}>Pay by voice</div>
                      <div style={{fontSize: '0.78rem', color: 'var(--fg40)'}}>
                        Confirm with the card on file. The agent reads the total back.
                      </div>
                    </span>
                    <span className="pm-icons">·· 4242 · MIC</span>
                  </label>
                  <label className={payment === 'card' ? "is-active" : ""}>
                    <input type="radio" name="pay" checked={payment === 'card'} onChange={() => setPayment('card')} />
                    <span>
                      <div style={{fontWeight: 500}}>Credit card</div>
                      <div style={{fontSize: '0.78rem', color: 'var(--fg40)'}}>Visa, Mastercard, Amex</div>
                    </span>
                    <span className="pm-icons">VISA · MC · AMEX</span>
                  </label>
                  <label className={payment === 'pay' ? "is-active" : ""}>
                    <input type="radio" name="pay" checked={payment === 'pay'} onChange={() => setPayment('pay')} />
                    <span>
                      <div style={{fontWeight: 500}}>Apple Pay / Google Pay</div>
                      <div style={{fontSize: '0.78rem', color: 'var(--fg40)'}}>One tap on your device</div>
                    </span>
                    <span className="pm-icons">Pay</span>
                  </label>
                </div>

                {payment === 'card' && (
                  <div style={{ marginTop: '1.2rem' }}>
                    <div className="field">
                      <label>Card number</label>
                      <input placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label>Expiry</label>
                        <input placeholder="MM / YY" />
                      </div>
                      <div className="field">
                        <label>CVC</label>
                        <input placeholder="•••" />
                      </div>
                    </div>
                  </div>
                )}

                <button className="btn btn-lg btn-block" style={{ marginTop: '1.4rem' }} onClick={placeOrder}>
                  {payment === 'voice' ? 'Confirm by voice' : 'Place order'} · {fmt(total)}
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--fg40)', marginTop: '0.7rem' }}>
                  Secured by Stripe. Your card never touches our servers.
                </div>
              </div>
            )}
          </div>

          <div className="summary">
            <h3>Order summary</h3>
            {items.map(it => {
              const p = products.find(x => x.id === it.productId);
              if (!p) return null;
              const Illu = p.illu;
              return (
                <div className="summary-line" key={it.key}>
                  <div className="summary-thumb">
                    <Illu />
                    <span className="qty-chip">{it.qty}</span>
                  </div>
                  <div>
                    <div className="summary-name">{p.name}</div>
                    <div className="summary-variant">
                      {Object.values(it.variant || {}).join(' · ')}
                    </div>
                  </div>
                  <div className="summary-price">{fmt(p.price * it.qty)}</div>
                </div>
              );
            })}

            <div className="promo-input">
              <input placeholder="Promo code"
                     value={promo} onChange={(e) => setPromo(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && applyPromo()} />
              <button onClick={applyPromo}>Apply</button>
            </div>
            {promoApplied && (
              <div className="promo-applied">
                {Icon.check} {promoApplied} applied — 10% off
              </div>
            )}

            <div className="summary-totals">
              <div className="cart-row"><span>Subtotal</span><span className="v">{fmt(subtotal)}</span></div>
              {discount > 0 && (
                <div className="cart-row"><span>Discount</span><span className="v" style={{color: 'var(--amber)'}}>−{fmt(discount)}</span></div>
              )}
              <div className="cart-row">
                <span>Shipping</span>
                <span className="v">{shipping === 0 ? <span style={{color: 'var(--amber)'}}>Free</span> : fmt(shipping)}</span>
              </div>
              <div className="cart-row"><span>Tax (est)</span><span className="v">{fmt(tax)}</span></div>
              <div className="cart-row total"><span>Total</span><span className="v">{fmt(total)}</span></div>
            </div>

            <div className="cart-voice-cue" style={{ margin: '1rem 0 0' }}>
              <span className="mic">{Icon.mic}</span>
              <span>Hint: say <strong>"apply FOYER10"</strong> or <strong>"checkout by voice"</strong>.</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ConfirmPage({ orderId, navigate }) {
  return (
    <main className="confirm">
      <div className="container">
        <div className="ring">
          <div className="core">{Icon.check}</div>
        </div>
        <h2>Order placed.</h2>
        <p>You'll get an email confirmation in a minute. We'll text you a tracking number the moment it leaves the workshop.</p>
        <div className="order-id">Order · {orderId}</div>
        <div className="actions">
          <button className="btn" onClick={() => navigate({ name: 'home' })}>Back to home {Icon.arrow}</button>
          <button className="btn btn-ghost" onClick={() => navigate({ name: 'shop' })}>Keep shopping</button>
        </div>
      </div>
    </main>
  );
}

/* ---- Footer ---- */
function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-inner">
          <div className="foot-brand">
            <div className="mark">
              <img src="assets/mark-1.svg" alt="" style={{ height: 18 }} />
              <span className="wordmark">FOYER</span>
            </div>
            <p>The merch closet of a voice agent company. Small batches, real materials, shipped from the same place we ship updates.</p>
          </div>
          <div className="foot-col">
            <h5>Shop</h5>
            <ul>
              <li><a href="#">All products</a></li>
              <li><a href="#">Apparel</a></li>
              <li><a href="#">Objects</a></li>
              <li><a href="#">Paper</a></li>
              <li><a href="#">Home</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Help</h5>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Sizing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Foyer</h5>
            <ul>
              <li><a href="https://tryfoyer.ai" target="_blank" rel="noreferrer">tryfoyer.ai</a></li>
              <li><a href="#">Voice agent</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-baseline">
          <span>© 2026 Foyer Inc. All rights reserved.</span>
          <span className="foot-voice-hint">[ voice ordering · live ]</span>
          <span>San Francisco · Made with care</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ProductCard, HomePage, ShopPage, ProductPage, CheckoutPage, Footer, SWATCH_COLOR,
});
