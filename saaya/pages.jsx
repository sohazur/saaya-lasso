/* eslint-disable no-undef */
/* ============================================================
   SAAYA — Page components (Home, Shop, PDP, Checkout, Footer)
   ============================================================ */

const { useState: pUseState, useEffect: pUseEffect, useMemo: pUseMemo } = React;

/* PKR price formatting: PKR 285,000 */
function formatPKR(n, sym) {
  const s = (sym || 'PKR') + ' ';
  return s + Math.round(n).toLocaleString('en-PK');
}

/* ---- Product visual layer ---- */
/* Renders the tone-on-tone silhouette behind an image-slot so the user can
   drop a real photo on top of any product card and the slot persists. */
function ProductImage({ product, slotId, placeholder }) {
  const Sil = SILS[product.silType];
  return (
    <>
      {Sil && <Sil tone={product.tone} />}
      <image-slot id={slotId}
                  shape="rounded" radius="6"
                  src={product.image || undefined}
                  placeholder={placeholder || `Drop ${product.name} photo`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      </image-slot>
    </>
  );
}

/* ---- Product card ---- */
function ProductCard({ product, onOpen, onQuickAdd, slotPrefix, formatPrice }) {
  return (
    <div className="product-card" onClick={() => onOpen(product)} role="button" tabIndex={0}
         onKeyDown={(e) => { if (e.key === 'Enter') onOpen(product); }}>
      <div className="canvas">
        {product.badge && (
          <span className={"canvas-tag " + (
            product.badge === 'NEW' ? 'is-new' :
            product.badge === 'BRIDAL' ? 'is-bridal' :
            product.badge === 'SALE' ? 'is-sale' : ''
          )}>{product.badge}</span>
        )}
        <ProductImage product={product} slotId={`${slotPrefix || 'card'}-${product.id}`} />
        <button className="quick-add" aria-label={`Add ${product.name} to bag`}
                onClick={(e) => { e.stopPropagation(); onQuickAdd(product); }}>
          {Icon.plus}
        </button>
      </div>
      <div className="meta">
        <div className="designer">{product.designer} · {product.category}</div>
        <h3 className="name">{product.name}</h3>
        <div className="sub">{product.type}</div>
        <div className="price-row">
          <span>{formatPrice(product.price)}</span>
        </div>
        <div className="swatches">
          {(product.colors || []).slice(0, 4).map((c, i) => (
            <span key={i} className="swatch" style={{ '--c': c.hex }} title={c.name}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Home page ---- */
function HomePage({ products, navigate, onQuickAdd, density, formatPrice }) {
  const featured = products.slice(0, 6);
  const hero = products.find(p => p.id === 'zara-bridal-lehenga');

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow eyebrow">
                <span className="line"></span>
                <span>Bridal '26 · Now in atelier</span>
              </div>
              <h1 className="hero-title">
                The wedding, <span className="it">re-written</span><br />
                in <span className="gilt">thread</span>.
              </h1>
              <p className="hero-sub">
                A single-atelier wedding house from Lahore. Hand-embroidered bridals, hand-cut menswear,
                small-batch festive — each piece made to order, finished with tailoring on you.
              </p>
              <div className="hero-ctas">
                <button className="btn btn-lg" onClick={() => navigate({ name: 'shop', category: 'Bridal' })}>
                  Shop the bridal edit {Icon.arrow}
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => navigate({ name: 'product', id: 'zara-bridal-lehenga' })}>
                  See Zara
                </button>
              </div>
              <div className="hero-meta">
                <div>
                  <span className="num">2014</span>
                  Lahore atelier
                </div>
                <div>
                  <span className="num">42</span>
                  Karigars on staff
                </div>
                <div>
                  <span className="num">6–8</span>
                  Weeks to your door
                </div>
              </div>
            </div>
            <div className="hero-stage" onClick={() => navigate({ name: 'product', id: hero.id })}>
              <span className="hero-stage-tag">Look 01 · Bridal '26</span>
              <ProductImage product={hero} slotId="hero-zara" placeholder="Drop a bridal hero photo" />
              <div className="hero-stage-caption">
                <div className="credit">
                  <em>{hero.name}</em><br />
                  {hero.type} · {formatPrice(hero.price)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS row */}
      <div className="container">
        <div className="press-row">
          <span className="name">Vogue India</span>
          <span className="name">Hello! Pakistan</span>
          <span className="name">Diva Magazine</span>
          <span className="name">Brides Today</span>
          <span className="name">Harper's Bazaar</span>
        </div>
      </div>

      {/* CATEGORY LOOKBOOK */}
      <section className="section-sm">
        <div className="container">
          <div className="collection-head">
            <div>
              <div className="eyebrow"><span>The Wedding Edit '26</span></div>
              <h2>Shop by <em>category</em>.</h2>
            </div>
            <div className="right">
              <button className="btn btn-link" onClick={() => navigate({ name: 'shop' })}>View all looks</button>
            </div>
          </div>
          <div className="occasion-grid">
            {LOOKBOOK.map(o => {
              const Sil = SILS[o.silType];
              return (
                <button key={o.id} className="occasion-tile"
                        onClick={() => navigate({ name: 'shop', category: o.name })}>
                  {Sil && <Sil tone={o.tone} />}
                  <image-slot id={`lookbook-${o.id}`}
                              shape="rounded" radius="6"
                              src={o.image || undefined}
                              placeholder={`Drop ${o.name} photo`}
                              style={{ position: 'absolute', inset: 0 }}></image-slot>
                  <div className="occasion-tile-caption">
                    <div>
                      <h3 className="name">{o.name}</h3>
                      <div className="meta">{o.desc}</div>
                    </div>
                    <span className="arrow">{Icon.arrow}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="section">
        <div className="container">
          <div className="collection-head">
            <div>
              <div className="eyebrow"><span>New this season</span></div>
              <h2>The <em>atelier</em> picks.</h2>
            </div>
            <div className="right">
              <span>{featured.length} of {products.length}</span>
              <button className="btn btn-link" onClick={() => navigate({ name: 'shop' })}>See the whole edit</button>
            </div>
          </div>
          <div className={"product-grid " + (density || '')}>
            {featured.map(p => (
              <ProductCard key={p.id} product={p}
                           onOpen={(prod) => navigate({ name: 'product', id: prod.id })}
                           onQuickAdd={onQuickAdd}
                           slotPrefix="home"
                           formatPrice={formatPrice} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="container">
        <div className="editor-divider"><span className="line"></span><span className="ornament">۞</span><span className="line"></span></div>
        <div className="testimonial">
          <blockquote>
            "Saaya re-cut my mother's old gharara into a walima dupatta. The atelier kept the embroidery, lost the wear. It's the closest thing to time travel I've held in my hands."
          </blockquote>
          <cite>
            <em>Mahira</em> · Karachi, '25 bride
          </cite>
        </div>
        <div className="editor-divider"><span className="line"></span><span className="ornament">۞</span><span className="line"></span></div>
      </section>

      {/* EDITORIAL STORY */}
      <section className="container">
        <div className="editorial">
          <div className="editorial-img">
            <span className="editorial-tag">in the atelier</span>
            {(() => { const Sil = SILS.lehenga; return <Sil tone="oxblood" />; })()}
            <image-slot id="editorial-1"
                        shape="rounded" radius="12"
                        src="uploads/Zareen-2.jpg"
                        placeholder="Drop atelier behind-the-scenes photo"
                        style={{ position: 'absolute', inset: 0 }}></image-slot>
          </div>
          <div>
            <div className="eyebrow"><span>The house</span></div>
            <h2>Hand-cut. <em>Hand-stitched.</em> Hand-finished.</h2>
            <p>
              We are a single-atelier wedding house, run out of the same Lahore workshop since 2014.
              Forty-two karigars. No production line. Every piece begins as a sketch and ends in a fitting.
            </p>
            <p>
              When you place an order, a measurement appointment is booked — in the studio if you're in
              Pakistan, by video call if you're not. Your piece is cut and embroidered to you, and lands
              on your doorstep six to eight weeks later, in a hand-stitched silk pouch.
            </p>
            <p className="editorial-signoff">— with care, from Lahore</p>
            <button className="btn btn-ghost" onClick={() => navigate({ name: 'shop' })}>
              Begin your fitting {Icon.arrow}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- Shop page ---- */
function ShopPage({ products, navigate, onQuickAdd, density, initialCategory, formatPrice }) {
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
            <div className="eyebrow"><span>The Edit · '26</span></div>
            <h1>The complete <em>wedding</em> edit.</h1>
          </div>
          <div className="shop-controls">
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
              <option value="name">Name · A to Z</option>
            </select>
          </div>
        </div>
        <div className="occasions">
          {CATEGORIES.map(cat => (
            <button key={cat}
                    className={"chip " + (cat === category ? 'is-active' : '')}
                    onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
          <span className="chip-meta">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</span>
        </div>
        <div className={"product-grid " + (density || '')}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p}
                         onOpen={(prod) => navigate({ name: 'product', id: prod.id })}
                         onQuickAdd={onQuickAdd}
                         slotPrefix="shop"
                         formatPrice={formatPrice} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--muted)' }}>
            Nothing in this category yet — the season is just beginning.
          </div>
        )}
      </div>
    </main>
  );
}

/* ---- PDP ---- */
function ProductPage({ product, products, navigate, addToCart, formatPrice }) {
  const [size, setSize] = pUseState(product.sizes[0]);
  const [color, setColor] = pUseState(product.colors[0]);
  const [qty, setQty] = pUseState(1);
  const [openAcc, setOpenAcc] = pUseState('atelier');
  const [activeThumb, setActiveThumb] = pUseState(0);
  const [adding, setAdding] = pUseState(false);
  const [wishlisted, setWishlisted] = pUseState(false);

  pUseEffect(() => {
    setSize(product.sizes[0]);
    setColor(product.colors[0]);
    setQty(1);
    setActiveThumb(0);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [product.id]);

  const handleAdd = () => {
    setAdding(true);
    addToCart(product, { Size: size, Colour: color.name }, qty);
    setTimeout(() => setAdding(false), 900);
  };

  const related = products.filter(p => p.id !== product.id && (p.category === product.category || p.silType === product.silType)).slice(0, 3);

  return (
    <main className="pdp">
      <div className="container">
        <div className="pdp-breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate({ name: 'home' }); }}>Saaya</a>
          <span className="sep">/</span>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate({ name: 'shop', category: product.category }); }}>{product.category}</a>
          <span className="sep">/</span>
          <span style={{ color: 'var(--ink)' }}>{product.name}</span>
        </div>

        <div className="pdp-grid">
          <div className="pdp-gallery">
            <div className="pdp-thumbs">
              {[0, 1, 2, 3].map(i => (
                <button key={i}
                        className={"pdp-thumb " + (activeThumb === i ? "is-active" : "")}
                        onClick={() => setActiveThumb(i)}>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <ProductImage product={product}
                                  slotId={`pdp-thumb-${product.id}-${i}`}
                                  placeholder={`Thumb ${i + 1}`} />
                  </div>
                </button>
              ))}
            </div>
            <div className="pdp-main">
              <ProductImage product={product}
                            slotId={`pdp-main-${product.id}-${activeThumb}`}
                            placeholder="Drop a hero photo" />
              <div className="pdp-zoom-hint">Click to fit · drop a photo</div>
            </div>
          </div>

          <div className="pdp-info">
            <div className="pdp-designer">{product.designer}</div>
            <h1 className="pdp-title">{product.name}</h1>
            <p className="pdp-subtitle">{product.tagline}</p>

            <div className="pdp-price-row">
              <span className="pdp-price">{formatPrice(product.price)}</span>
              <span className="pdp-stock">
                <span className="pulse"></span>
                {product.timeline}
              </span>
            </div>

            {/* Colour */}
            <div className="option-block">
              <div className="option-label">
                <span>Colour</span>
                <span className="value">{color.name}</span>
              </div>
              <div className="swatch-row">
                {product.colors.map(c => (
                  <button key={c.name}
                          className={"swatch-lg " + (color.name === c.name ? "is-active" : "")}
                          style={{ '--c': c.hex }}
                          onClick={() => setColor(c)}
                          title={c.name}
                          aria-label={c.name} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="option-block">
              <div className="option-label">
                <span>Size</span>
                <a className="link" href="#" onClick={(e) => e.preventDefault()}>Size & fit guide</a>
              </div>
              <div className="option-row">
                {product.sizes.map(s => (
                  <button key={s}
                          className={"variant-pill " + (size === s ? "is-active" : "")}
                          onClick={() => setSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-block">
              <div className="option-label"><span>Quantity</span></div>
              <div className="qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty === 1} aria-label="Decrease">{Icon.minus}</button>
                <span className="v">{qty}</span>
                <button onClick={() => setQty(q => Math.min(5, q + 1))} aria-label="Increase">{Icon.plus}</button>
              </div>
            </div>

            <div className="add-row">
              <button className="btn btn-lg" onClick={handleAdd}>
                {adding ? <>{Icon.check} Added to bag</> : <>Add to bag · {formatPrice(product.price * qty)}</>}
              </button>
              <button className="icon-square-btn"
                      onClick={() => setWishlisted(w => !w)}
                      aria-label="Wishlist"
                      style={wishlisted ? { background: 'var(--oxblood)', borderColor: 'var(--oxblood)', color: 'var(--surface)' } : null}>
                {Icon.heart}
              </button>
            </div>

            <div className="bespoke-note">
              <span className="ic">{Icon.ruler}</span>
              <div>
                <strong>Tailored to you.</strong> Every Saaya piece is made to your exact measurements.
                After ordering, our atelier will reach out to schedule a fitting — in studio (Lahore) or
                by video call. <a href="#" onClick={(e) => e.preventDefault()}>Book a consultation</a>.
              </div>
            </div>

            <div className="pdp-details">
              <Accordion title="From the atelier" id="atelier" open={openAcc} setOpen={setOpenAcc}>
                <p>{product.blurb}</p>
              </Accordion>
              <Accordion title="Details" id="details" open={openAcc} setOpen={setOpenAcc}>
                <dl>
                  <dt>Fabric</dt><dd>{product.fabric}</dd>
                  <dt>Work</dt><dd>{product.work}</dd>
                  <dt>Timeline</dt><dd>{product.timeline}</dd>
                  <dt>Care</dt><dd>{product.care}</dd>
                </dl>
              </Accordion>
              <Accordion title="Delivery & returns" id="ship" open={openAcc} setOpen={setOpenAcc}>
                <p>Complimentary delivery on orders over PKR 50,000. International shipping calculated at checkout.</p>
                <ul>
                  <li>Made-to-order pieces ship in 4–8 weeks from final measurement</li>
                  <li>30% non-refundable deposit at order; balance before dispatch</li>
                  <li>Custom pieces are final sale — alterations included for 30 days post-delivery</li>
                </ul>
              </Accordion>
              <Accordion title="Size & fit" id="fit" open={openAcc} setOpen={setOpenAcc}>
                <p>All standard sizes are based on Pakistani sizing. We recommend the Custom size for bridal pieces — we'll measure to fit and pattern-cut.</p>
                <ul>
                  <li>XS · bust 32, waist 26</li>
                  <li>S · bust 34, waist 28</li>
                  <li>M · bust 36, waist 30</li>
                  <li>L · bust 38, waist 32</li>
                  <li>XL · bust 40, waist 34</li>
                </ul>
              </Accordion>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section-sm" style={{ paddingBottom: 0, paddingTop: '4rem' }}>
            <div className="collection-head" style={{ marginBottom: '2rem' }}>
              <div>
                <div className="eyebrow"><span>Wear it together</span></div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>From the same <em>chapter</em>.</h2>
              </div>
            </div>
            <div className="product-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p}
                             onOpen={(prod) => navigate({ name: 'product', id: prod.id })}
                             onQuickAdd={() => {}}
                             slotPrefix="related"
                             formatPrice={formatPrice} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

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

/* ---- Footer ---- */
function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-inner">
          <div className="foot-brand">
            <span className="wordmark">saaya</span>
            <div className="tagline">wedding atelier · since 2014</div>
            <p>A single-atelier wedding house from Lahore. Hand-cut, hand-stitched, hand-finished. Made to you, shipped worldwide.</p>
          </div>
          <div className="foot-col">
            <h5>Shop</h5>
            <ul>
              <li><a href="#">Bridal</a></li>
              <li><a href="#">Walima</a></li>
              <li><a href="#">Nikkah</a></li>
              <li><a href="#">Mayoun</a></li>
              <li><a href="#">Mehndi</a></li>
              <li><a href="#">Menswear</a></li>
              <li><a href="#">Heirloom</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>The atelier</h5>
            <ul>
              <li><a href="#">Our story</a></li>
              <li><a href="#">Book a fitting</a></li>
              <li><a href="#">Bespoke commissions</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Karigar stories</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Help</h5>
            <ul>
              <li><a href="#">Size & fit</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Returns & alterations</a></li>
              <li><a href="#">Care guide</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="foot-col foot-newsletter">
            <h5>The atelier letter</h5>
            <input type="email" placeholder="your email" />
            <button>Subscribe</button>
            <p>New collections, atelier days, and behind-the-scenes from Lahore. No more than once a month.</p>
          </div>
        </div>
        <div className="foot-baseline">
          <span>© 2026 Saaya Atelier (Pvt) Ltd · Lahore, Pakistan</span>
          <div className="pay">
            <span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>EASYPAISA</span><span>JAZZCASH</span><span>IBFT</span>
          </div>
          <span>Terms · Privacy · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  ProductImage, ProductCard, HomePage, ShopPage, ProductPage, Footer, formatPKR,
});
