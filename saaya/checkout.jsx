/* eslint-disable no-undef */
/* ============================================================
   SAAYA — Checkout flow + live event log
   ----------------------------------------------------------------
   • 4-step flow: Pieces & customisation → Contact → Address →
     Payment → Confirmation.
   • Every meaningful user action streams a typed event to a session
     log (also dispatched as a `saaya:event` window event so a voice
     agent or analytics backend can hook in).
   ============================================================ */

const { useState: cUseState, useEffect: cUseEffect, useMemo: cUseMemo, useRef: cUseRef, useCallback: cUseCallback } = React;

/* ─── Shipping rates ──────────────────────────────────────
   Two-tier model: country gives a base rate, city adds a
   surcharge (random per city for the demo). Step 3 logs the
   country-level estimate; step 4 logs the precise city-level
   total. No free shipping — always a real number.
   ──────────────────────────────────────────────────────── */
const SHIPPING_RATES = {
  PK: { name: 'Pakistan',             amount: 1850,  days: '3–5 business days' },
  AE: { name: 'United Arab Emirates', amount: 4500,  days: '5–7 business days' },
  SA: { name: 'Saudi Arabia',         amount: 5200,  days: '5–7 business days' },
  IN: { name: 'India',                amount: 6500,  days: '5–7 business days' },
  GB: { name: 'United Kingdom',       amount: 7500,  days: '7–10 business days' },
  US: { name: 'United States',        amount: 9500,  days: '7–12 business days' },
  CA: { name: 'Canada',               amount: 9500,  days: '7–12 business days' },
  AU: { name: 'Australia',            amount: 11500, days: '10–14 business days' },
};

/* per-city surcharges (random but stable per city) */
const CITY_SURCHARGE = {
  PK: {
    'Lahore':         150,
    'Islamabad':      420,
    'Karachi':        680,
    'Rawalpindi':     390,
    'Faisalabad':     520,
    'Multan':         640,
    'Peshawar':       780,
    'Quetta':         920,
    'Gilgit':        1480,
    'Other':          560,
  },
  AE: { 'Dubai': 0, 'Abu Dhabi': 320, 'Sharjah': 220, 'Other': 480 },
  SA: { 'Riyadh': 0, 'Jeddah': 280, 'Dammam': 360, 'Mecca': 320, 'Other': 540 },
  IN: { 'Delhi': 0, 'Mumbai': 240, 'Bangalore': 380, 'Other': 460 },
  GB: { 'London': 0, 'Manchester': 360, 'Birmingham': 320, 'Edinburgh': 480, 'Other': 580 },
  US: { 'New York': 0, 'Los Angeles': 1100, 'Chicago': 720, 'Houston': 880, 'San Francisco': 1180, 'Other': 980 },
  CA: { 'Toronto': 0, 'Vancouver': 980, 'Montreal': 540, 'Other': 760 },
  AU: { 'Sydney': 0, 'Melbourne': 320, 'Perth': 1200, 'Brisbane': 420, 'Other': 720 },
};

function citiesFor(country) {
  return Object.keys(CITY_SURCHARGE[country] || { 'Other': 0 });
}

function countryShipping(country) {
  const r = SHIPPING_RATES[country];
  if (!r) return { amount: 8500, days: '10–14 business days', name: 'Worldwide' };
  return r;
}

function cityShipping(country, city) {
  const base = countryShipping(country);
  const surcharge = (CITY_SURCHARGE[country] && CITY_SURCHARGE[country][city]) || 0;
  return {
    name: base.name,
    days: base.days,
    base: base.amount,
    surcharge,
    amount: base.amount + surcharge,
  };
}

/* ─── useEventLog hook ────────────────────────────────────── */
function useEventLog() {
  const [events, setEvents] = cUseState([]);

  const log = cUseCallback((type, detail, meta) => {
    const evt = {
      id: Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      ts: new Date(),
      type,
      detail: detail || '',
      meta: meta || null,
    };
    setEvents(prev => [...prev.slice(-99), evt]);
    /* mirror to console for "backend" debugging */
    try {
      console.log(
        '%c[saaya]%c ' + type + (detail ? ' — ' + detail : ''),
        'color:#a87729;font-weight:600',
        'color:#1e1812',
        meta || ''
      );
    } catch (_) {}
    /* dispatch a custom event other code can listen to */
    try { window.dispatchEvent(new CustomEvent('saaya:event', { detail: evt })); } catch (_) {}
    return evt;
  }, []);

  const clear = cUseCallback(() => setEvents([]), []);

  return { events, log, clear };
}

/* ─── EventLog panel ──────────────────────────────────────── */
const EVENT_PALETTE = {
  step:        '#c89c4e',  /* gold */
  customize:   '#a87729',
  field:       '#9c8a72',  /* muted ink */
  country:     '#2f5d4b',  /* emerald */
  shipping:    '#c89c4e',
  payment:     '#8d4a4f',
  order:       '#5e2530',  /* oxblood */
  view:        '#7a6a55',
};

function tagOf(type) {
  if (type.startsWith('step.'))      return ['step',      'STEP'];
  if (type.startsWith('cust.'))      return ['customize', 'CUST'];
  if (type.startsWith('contact.'))   return ['field',     'CTAC'];
  if (type.startsWith('country.'))   return ['country',   'GEO '];
  if (type.startsWith('shipping.'))  return ['shipping',  'SHIP'];
  if (type.startsWith('address.'))   return ['field',     'ADDR'];
  if (type.startsWith('payment.'))   return ['payment',   'PAY '];
  if (type.startsWith('order.'))     return ['order',     'ORDR'];
  if (type.startsWith('view.'))      return ['view',      'VIEW'];
  return ['view', '·   '];
}

function fmtTime(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

function EventLog({ events, expanded, setExpanded, onClear }) {
  const bodyRef = cUseRef(null);
  cUseEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [events.length]);

  if (!expanded) {
    return (
      <button className="event-log-pill" onClick={() => setExpanded(true)}
              aria-label="Open session log">
        <span className="elp-dot"></span>
        <span className="elp-count">{events.length}</span>
        <span className="elp-label">session log</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 15 12 9 18 15" transform="rotate(180 12 12)"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="event-log" role="region" aria-label="Session log">
      <div className="event-log-head">
        <div className="elh-title">
          <span className="elp-dot"></span>
          <strong>Session log</strong>
          <span className="elh-sub">streamed to backend</span>
        </div>
        <div className="elh-actions">
          <button className="elh-btn" onClick={onClear} title="Clear log">clear</button>
          <button className="elh-btn" onClick={() => setExpanded(false)} title="Collapse">—</button>
        </div>
      </div>
      <div className="event-log-body" ref={bodyRef}>
        {events.length === 0 ? (
          <div className="elb-empty">
            <em>Waiting for events.</em><br />
            Move through checkout — every step, every field, every change is captured.
          </div>
        ) : events.map(e => {
          const [color, label] = tagOf(e.type);
          return (
            <div className="elb-row" key={e.id}>
              <span className="elb-time">{fmtTime(e.ts)}</span>
              <span className="elb-tag" style={{ '--tag-c': EVENT_PALETTE[color] }}>{label}</span>
              <span className="elb-detail">
                <code>{e.type}</code>{e.detail ? <span className="elb-text"> · {e.detail}</span> : null}
              </span>
            </div>
          );
        })}
      </div>
      <div className="event-log-foot">
        <span>{events.length} event{events.length === 1 ? '' : 's'}</span>
        <span className="elf-spacer">·</span>
        <span>mirrored to console + <code>saaya:event</code></span>
      </div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────── */
function fieldLabel(name) {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, c => c.toUpperCase())
    .toLowerCase();
}

/* ─── Step 1: Pieces & customisation ──────────────────────── */
function StepPieces({ items, products, customizations, setCustomization, formatPrice, log, onContinue }) {
  return (
    <div className="form-card">
      <h3>Your pieces</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 1.4rem', lineHeight: 1.55 }}>
        Review what's in your bag and leave notes for the atelier. Hem length, sleeve preference,
        dupatta border treatment — tell us and we'll cut to your taste.
      </p>
      <div className="checkout-pieces">
        {items.map(it => {
          const p = products.find(x => x.id === it.productId);
          if (!p) return null;
          const Sil = SILS[p.silType];
          const note = customizations[it.key] || '';
          return (
            <div className="checkout-piece" key={it.key}>
              <div className="checkout-piece-thumb">
                {Sil && <Sil tone={p.tone} />}
                <image-slot id={`checkout-${p.id}`}
                            shape="rounded" radius="4"
                            src={p.image || undefined}
                            placeholder={p.name}
                            style={{ position: 'absolute', inset: 0 }}></image-slot>
                {it.qty > 1 && <span className="checkout-piece-qty">×{it.qty}</span>}
              </div>
              <div className="checkout-piece-info">
                <div className="checkout-piece-name">{p.name}</div>
                <div className="checkout-piece-sub">{p.type}</div>
                <div className="checkout-piece-meta">
                  {Object.values(it.variant || {}).join(' · ')} · {formatPrice(p.price * it.qty)}
                </div>
                <textarea
                  className="checkout-piece-note"
                  placeholder="Notes for the atelier (sleeve length, dupatta finish, etc)"
                  value={note}
                  onChange={(e) => setCustomization(it.key, e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      log('cust.added', `${p.name}: ${e.target.value.slice(0, 60)}${e.target.value.length > 60 ? '…' : ''}`, { productId: p.id, note: e.target.value });
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn" style={{ marginTop: '1.2rem' }} onClick={onContinue}>
        Continue to contact details {Icon.arrow}
      </button>
    </div>
  );
}

/* ─── Step 2: Contact ─────────────────────────────────────── */
function StepContact({ contact, setContact, log, onContinue, formatPrice, deposit }) {
  const update = (field, v) => setContact(prev => ({ ...prev, [field]: v }));
  const trackField = (field) => (e) => {
    const v = e.target.value;
    if (v && v.trim()) {
      log('contact.' + field, `${fieldLabel(field)} = ${v}`, { field, value: v });
    }
  };

  return (
    <div className="form-card">
      <h3>Contact</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 1.4rem', lineHeight: 1.55 }}>
        We text fitting reminders to your phone, email confirmation + tracking to your inbox.
        Both required so nothing falls through the cracks.
      </p>
      <div className="field-row">
        <div className="field">
          <label>First name *</label>
          <input name="firstName" autoComplete="given-name"
                 value={contact.firstName} onChange={(e) => update('firstName', e.target.value)}
                 onBlur={trackField('firstName')} placeholder="Zara" />
        </div>
        <div className="field">
          <label>Last name *</label>
          <input name="lastName" autoComplete="family-name"
                 value={contact.lastName} onChange={(e) => update('lastName', e.target.value)}
                 onBlur={trackField('lastName')} placeholder="Hussain" />
        </div>
      </div>
      <div className="field">
        <label>Email *</label>
        <input type="email" name="email" autoComplete="email"
               value={contact.email} onChange={(e) => update('email', e.target.value)}
               onBlur={trackField('email')} placeholder="you@yourdomain.com" />
      </div>
      <div className="field-row">
        <div className="field" style={{ flex: '0 0 130px' }}>
          <label>Country code</label>
          <select value={contact.phoneCC} onChange={(e) => {
                    update('phoneCC', e.target.value);
                    log('contact.phoneCC', `Dial code = ${e.target.value}`, { field: 'phoneCC', value: e.target.value });
                  }}>
            <option value="+92">🇵🇰 +92</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+966">🇸🇦 +966</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+61">🇦🇺 +61</option>
          </select>
        </div>
        <div className="field" style={{ flex: 1 }}>
          <label>Phone *</label>
          <input type="tel" name="phone" autoComplete="tel"
                 value={contact.phone} onChange={(e) => update('phone', e.target.value)}
                 onBlur={trackField('phone')} placeholder="300 1234567" />
        </div>
      </div>
      <label className="checkout-check">
        <input type="checkbox" checked={contact.optIn}
               onChange={(e) => {
                 update('optIn', e.target.checked);
                 log('contact.optIn', e.target.checked ? 'subscribed to atelier letter' : 'unsubscribed', { value: e.target.checked });
               }} />
        <span>Send me the atelier letter — new collections + atelier days, monthly.</span>
      </label>
      <button className="btn" style={{ marginTop: '0.7rem' }}
              disabled={!contact.firstName || !contact.email || !contact.phone}
              onClick={onContinue}>
        Continue to delivery {Icon.arrow}
      </button>
    </div>
  );
}

/* ─── Step 3: Country (rough shipping estimate) ─────────── */
function StepCountry({ address, setAddress, countryShip, log, onContinue, formatPrice }) {
  return (
    <div className="form-card">
      <h3>Where are you?</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 1.4rem', lineHeight: 1.55 }}>
        Country gives the base shipping rate. The next step refines it by city.
      </p>
      <div className="field">
        <label>Country *</label>
        <select value={address.country}
                onChange={(e) => {
                  const c = e.target.value;
                  setAddress(prev => ({ ...prev, country: c, city: '' }));
                  const r = countryShipping(c);
                  log('country.selected', `${r.name}`, { country: c, name: r.name });
                  log('shipping.estimate', `Base ${formatPrice(r.amount)} · ${r.days}`, {
                    country: c, base: r.amount, days: r.days,
                  });
                }}>
          {Object.entries(SHIPPING_RATES).map(([code, r]) => (
            <option key={code} value={code}>{r.name}</option>
          ))}
        </select>
      </div>
      <div className="shipping-preview">
        <div>
          <div className="shipping-preview-name">{countryShip.name} · base rate</div>
          <div className="shipping-preview-days">{countryShip.days} · refines with city</div>
        </div>
        <div className="shipping-preview-amount">{formatPrice(countryShip.amount)}</div>
      </div>
      <button className="btn" style={{ marginTop: '0.7rem' }} onClick={onContinue}>
        Continue to city {Icon.arrow}
      </button>
    </div>
  );
}

/* ─── Step 4: City + address (precise shipping) ───────────── */
function StepAddress({ address, setAddress, cities, cityShip, log, onContinue, formatPrice }) {
  const update = (field, v) => setAddress(prev => ({ ...prev, [field]: v }));
  const trackField = (field) => (e) => {
    const v = e.target.value;
    if (v && v.trim()) {
      log('address.' + field, `${fieldLabel(field)} = ${v}`, { field, value: v });
    }
  };
  return (
    <div className="form-card">
      <h3>City & address</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 1.4rem', lineHeight: 1.55 }}>
        City sets the exact rate. The order total updates the moment you pick.
      </p>
      <div className="field">
        <label>City *</label>
        <select value={address.city}
                onChange={(e) => {
                  const c = e.target.value;
                  update('city', c);
                  const ship = cityShipping(address.country, c);
                  log('city.selected', `${c}`, { city: c, country: address.country });
                  log('shipping.calculated', `${formatPrice(ship.amount)} (base ${formatPrice(ship.base)} + ${ship.surcharge ? formatPrice(ship.surcharge) + ' surcharge' : 'no surcharge'}) · ${ship.days}`, {
                    city: c, country: address.country, base: ship.base,
                    surcharge: ship.surcharge, amount: ship.amount,
                  });
                }}>
          <option value="">Select a city…</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {address.city && cityShip && (
        <div className="shipping-preview">
          <div>
            <div className="shipping-preview-name">{address.city} · final rate</div>
            <div className="shipping-preview-days">
              {cityShip.days} · base {formatPrice(cityShip.base)}{cityShip.surcharge ? ` + ${formatPrice(cityShip.surcharge)} city` : ''}
            </div>
          </div>
          <div className="shipping-preview-amount">{formatPrice(cityShip.amount)}</div>
        </div>
      )}

      <div className="field">
        <label>Address line 1 *</label>
        <input value={address.line1} onChange={(e) => update('line1', e.target.value)}
               onBlur={trackField('line1')} placeholder="House 24, Street 7" />
      </div>
      <div className="field">
        <label>Address line 2</label>
        <input value={address.line2} onChange={(e) => update('line2', e.target.value)}
               onBlur={trackField('line2')} placeholder="Apartment, building, area (optional)" />
      </div>
      <div className="field-row">
        <div className="field">
          <label>Postal code *</label>
          <input value={address.postal} onChange={(e) => update('postal', e.target.value)}
                 onBlur={trackField('postal')} placeholder="44000" />
        </div>
        {address.country === 'PK' && (
          <div className="field">
            <label>Province *</label>
            <select value={address.province} onChange={(e) => {
                      update('province', e.target.value);
                      log('address.province', `Province = ${e.target.value}`, { value: e.target.value });
                    }}>
              <option>Punjab</option><option>Sindh</option><option>KPK</option>
              <option>Balochistan</option><option>Islamabad Capital Territory</option>
              <option>Gilgit-Baltistan</option><option>Azad Kashmir</option>
            </select>
          </div>
        )}
      </div>
      <button className="btn" style={{ marginTop: '0.7rem' }}
              disabled={!address.city || !address.line1 || !address.postal}
              onClick={onContinue}>
        Continue to payment {Icon.arrow}
      </button>
    </div>
  );
}

/* ─── Step 4: Payment ─────────────────────────────────────── */
function StepPayment({ payment, setPayment, card, setCard, log, onPlace, totals, formatPrice }) {
  const setMethod = (m) => {
    setPayment(m);
    log('payment.method', `Selected ${m}`, { method: m });
  };
  const trackCard = (field) => (e) => {
    if (e.target.value && e.target.value.trim()) {
      /* never log the full card number — just the field name + last 4 or length */
      const masked = field === 'number'
        ? '•••• •••• •••• ' + e.target.value.replace(/\D/g, '').slice(-4)
        : field === 'cvc' ? '•••' : e.target.value;
      log('payment.field', `${fieldLabel(field)} = ${masked}`, { field });
    }
  };

  return (
    <div className="form-card">
      <h3>Payment</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 1.4rem', lineHeight: 1.55 }}>
        A 30% deposit secures your order. Balance is collected after final fitting approval.
      </p>
      <div className="payment-options">
        <label className={payment === 'card' ? 'is-active' : ''}>
          <input type="radio" checked={payment === 'card'} onChange={() => setMethod('card')} />
          <span><div style={{ fontWeight: 500 }}>Card</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>Visa · Mastercard · Amex</div>
          </span>
          <span className="pm-icons">VISA · MC · AMEX</span>
        </label>
        <label className={payment === 'easypaisa' ? 'is-active' : ''}>
          <input type="radio" checked={payment === 'easypaisa'} onChange={() => setMethod('easypaisa')} />
          <span><div style={{ fontWeight: 500 }}>Easypaisa / JazzCash</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>Mobile wallet · OTP confirm</div>
          </span>
          <span className="pm-icons">EP · JC</span>
        </label>
        <label className={payment === 'bank' ? 'is-active' : ''}>
          <input type="radio" checked={payment === 'bank'} onChange={() => setMethod('bank')} />
          <span><div style={{ fontWeight: 500 }}>Bank transfer · IBFT</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>Account details shared after order</div>
          </span>
          <span className="pm-icons">IBFT</span>
        </label>
        <label className={payment === 'cod' ? 'is-active' : ''}>
          <input type="radio" checked={payment === 'cod'} onChange={() => setMethod('cod')} />
          <span><div style={{ fontWeight: 500 }}>Cash on delivery</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>Pakistan only · orders under PKR 100,000</div>
          </span>
          <span className="pm-icons">COD</span>
        </label>
      </div>

      {payment === 'card' && (
        <div style={{ marginTop: '1.4rem' }}>
          <div className="field">
            <label>Card number *</label>
            <input value={card.number} onChange={(e) => setCard(c => ({ ...c, number: e.target.value }))}
                   onBlur={trackCard('number')} placeholder="4242 4242 4242 4242" />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Expiry *</label>
              <input value={card.expiry} onChange={(e) => setCard(c => ({ ...c, expiry: e.target.value }))}
                     onBlur={trackCard('expiry')} placeholder="MM / YY" />
            </div>
            <div className="field">
              <label>CVC *</label>
              <input value={card.cvc} onChange={(e) => setCard(c => ({ ...c, cvc: e.target.value }))}
                     onBlur={trackCard('cvc')} placeholder="•••" />
            </div>
          </div>
          <div className="field">
            <label>Name on card *</label>
            <input value={card.name} onChange={(e) => setCard(c => ({ ...c, name: e.target.value }))}
                   onBlur={trackCard('name')} placeholder="As printed on the card" />
          </div>
        </div>
      )}

      <button className="btn btn-lg btn-block" style={{ marginTop: '1.4rem' }} onClick={onPlace}>
        Place order · pay {formatPrice(totals.deposit)} deposit now
      </button>
      <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.7rem', letterSpacing: '0.04em' }}>
        Secured by Stripe · Balance of {formatPrice(totals.total - totals.deposit)} due before dispatch
      </div>
    </div>
  );
}

/* ─── Sidebar order summary ───────────────────────────────── */
function CheckoutSummary({ items, products, totals, formatPrice, promo, setPromo, promoApplied, applyPromo }) {
  return (
    <div className="summary">
      <h3>Order summary</h3>
      {items.map(it => {
        const p = products.find(x => x.id === it.productId);
        if (!p) return null;
        const Sil = SILS[p.silType];
        return (
          <div className="summary-line" key={it.key}>
            <div className="summary-thumb">
              {Sil && <Sil tone={p.tone} />}
              <image-slot id={`summary-${p.id}`}
                          shape="rounded" radius="4"
                          src={p.image || undefined}
                          placeholder={p.name}
                          style={{ position: 'absolute', inset: 0 }}></image-slot>
              <span className="qty-chip">{it.qty}</span>
            </div>
            <div>
              <div className="summary-name">{p.name}</div>
              <div className="summary-variant">{Object.values(it.variant || {}).join(' · ')}</div>
            </div>
            <div className="summary-price">{formatPrice(p.price * it.qty)}</div>
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
          {Icon.check} {promoApplied} applied · 10% off
        </div>
      )}

      <div style={{ marginTop: '1.2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--line)' }}>
        <div className="cart-row"><span>Subtotal</span><span className="v">{formatPrice(totals.subtotal)}</span></div>
        {totals.discount > 0 && (
          <div className="cart-row"><span>Discount</span><span className="v" style={{ color: 'var(--emerald)' }}>−{formatPrice(totals.discount)}</span></div>
        )}
        <div className="cart-row">
          <span>Delivery {totals.shipping && totals.shipping.name ? `· ${totals.shipping.name}${totals.isFinal === false ? ' · est.' : ''}` : ''}</span>
          <span className="v">{formatPrice(totals.shipping.amount)}</span>
        </div>
        <div className="cart-row"><span>Tailoring</span><span className="v"><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Included</em></span></div>
        <div className="cart-row total"><span>Total</span><span className="v">{formatPrice(totals.total)}</span></div>
        <div className="cart-row" style={{ marginTop: '0.5rem' }}>
          <span style={{ color: 'var(--ink)' }}>Due today (30% deposit)</span>
          <span className="v" style={{ color: 'var(--ink)' }}>{formatPrice(totals.deposit)}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── CheckoutPage (top-level) ────────────────────────────── */
function CheckoutPage({ items, products, navigate, formatPrice, clearCart }) {
  const [step, setStep] = cUseState(1);
  const [customizations, setCustomizations] = cUseState({});
  const [contact, setContact] = cUseState({
    firstName: 'Zara', lastName: 'Hussain',
    email: 'zara@gmail.com',
    phoneCC: '+92', phone: '300 1234567',
    optIn: true,
  });
  const [address, setAddress] = cUseState({
    country: 'PK', city: '',
    line1: '', line2: '', postal: '',
    province: 'Islamabad Capital Territory',
  });
  const [payment, setPayment] = cUseState('card');
  const [card, setCard] = cUseState({ number: '', expiry: '', cvc: '', name: '' });
  // Lasso recovery deep-link delivers the coupon via window.SAAYA_COUPON
  // (set by main.jsx from #lasso= hash). Auto-apply on mount so the user
  // sees the discount instantly without retyping it.
  const lassoCoupon = typeof window !== 'undefined' ? window.SAAYA_COUPON : null;
  const [promo, setPromo] = cUseState(lassoCoupon || '');
  const [promoApplied, setPromoApplied] = cUseState(lassoCoupon ? lassoCoupon.toUpperCase() : null);
  const [orderId, setOrderId] = cUseState(null);
  const [logExpanded, setLogExpanded] = cUseState(true);

  const { events, log, clear: clearLog } = useEventLog();

  /* Refs that beforeunload / visibilitychange handlers can read
     without re-binding when step or other state changes. */
  const stepRef = cUseRef(step);
  cUseEffect(() => { stepRef.current = step; }, [step]);
  const lastInteractionRef = cUseRef(Date.now());
  const stepEnteredAtRef = cUseRef(Date.now());
  const completedRef = cUseRef(false);

  /* ─── Mount: log entry + bind abandonment handlers ─── */
  cUseEffect(() => {
    log('view.checkout', `Entered checkout · ${items.length} piece${items.length === 1 ? '' : 's'} in bag`, { itemCount: items.length });
    log('step.reached', 'Step 1 · pieces & customisation', { step: 1 });

    const STEP_LABELS = {
      1: 'pieces & customisation',
      2: 'contact details',
      3: 'country (rough shipping)',
      4: 'city & address (final shipping)',
      5: 'payment',
    };

    const fireAbandon = (reason) => {
      if (completedRef.current) return;
      const n = stepRef.current;
      const timeOnStep = Math.round((Date.now() - stepEnteredAtRef.current) / 1000);
      const idleFor = Math.round((Date.now() - lastInteractionRef.current) / 1000);
      log('session.abandoned', `Left on step ${n} · ${STEP_LABELS[n] || ''} · ${timeOnStep}s on step · idle ${idleFor}s · reason: ${reason}`, {
        step: n, stepName: STEP_LABELS[n] || null,
        secondsOnStep: timeOnStep, secondsIdle: idleFor, reason,
      });
    };

    const onTouch = () => { lastInteractionRef.current = Date.now(); };
    const onVis = () => {
      if (document.visibilityState === 'hidden') fireAbandon('tab-hidden');
    };
    const onUnload = () => fireAbandon('navigated-away');

    window.addEventListener('pointermove', onTouch, { passive: true });
    window.addEventListener('keydown', onTouch);
    window.addEventListener('click', onTouch);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('beforeunload', onUnload);
    window.addEventListener('pagehide', onUnload);

    return () => {
      window.removeEventListener('pointermove', onTouch);
      window.removeEventListener('keydown', onTouch);
      window.removeEventListener('click', onTouch);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('beforeunload', onUnload);
      window.removeEventListener('pagehide', onUnload);
      /* if the user navigated to a different in-app route, that's also an abandon */
      if (!completedRef.current) fireAbandon('in-app-navigation');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCustomization = (key, note) => {
    setCustomizations(prev => ({ ...prev, [key]: note }));
  };

  /* ─── totals ─── */
  const subtotal = cUseMemo(() => items.reduce((s, it) => {
    const p = products.find(x => x.id === it.productId);
    return p ? s + p.price * it.qty : s;
  }, 0), [items, products]);

  const countryShip = cUseMemo(() => countryShipping(address.country), [address.country]);
  const cityShip = cUseMemo(
    () => address.city ? cityShipping(address.country, address.city) : null,
    [address.country, address.city]
  );

  /* Use city shipping when available (step 4+), otherwise country shipping (step 3),
     no shipping in summary until country picked (always picked: default PK). */
  const shipping = cityShip || countryShip;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping.amount - discount;
  const deposit = Math.round(total * 0.3);
  const totals = {
    subtotal, shipping, discount, total, deposit,
    isFinal: !!cityShip,  /* whether shipping is final (city set) or estimate */
  };

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (!code || promoApplied) return;
    // Saaya's hardcoded code + any Lasso-issued recovery coupon
    // (LASSO*, SAAYA*). For the demo we accept the broader set so the
    // recovery flow always succeeds end-to-end.
    if (code === 'SAAYA10' || /^(LASSO|SAAYA)[A-Z0-9]{0,16}$/.test(code)) {
      setPromoApplied(code);
      log('order.promo', `${code} applied · 10% off`, { code, percent: 10 });
    } else {
      log('order.promo_invalid', `Tried ${code} — not recognised`, { code });
    }
  };

  /* step transitions log step.reached + duration of previous step */
  const goStep = (n, label) => {
    const previous = stepRef.current;
    const timeOnPrevious = Math.round((Date.now() - stepEnteredAtRef.current) / 1000);
    if (previous !== n) {
      log('step.completed', `Finished step ${previous} after ${timeOnPrevious}s`, { step: previous, secondsOnStep: timeOnPrevious });
    }
    setStep(n);
    stepEnteredAtRef.current = Date.now();
    log('step.reached', label, { step: n });
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  const placeOrder = () => {
    const id = 'SY-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase();
    setOrderId(id);
    log('order.placed', `Order ${id} · ${formatPrice(deposit)} deposit, ${formatPrice(total - deposit)} balance`, {
      orderId: id, total, deposit, balance: total - deposit,
      itemCount: items.length, country: address.country, city: address.city, payment,
    });
    completedRef.current = true;
    setStep(6);
    clearCart();
  };

  if (items.length === 0 && step !== 6) {
    return (
      <main className="checkout">
        <div className="container">
          <div className="cart-empty" style={{ padding: '6rem 0', textAlign: 'center' }}>
            <h4 style={{ fontSize: '2rem', color: 'var(--ink)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}>Your bag is empty.</h4>
            <p style={{ color: 'var(--muted)', margin: '0.8rem 0 1.6rem' }}>Begin with bridal, or wander into the daily-wear edit.</p>
            <button className="btn" onClick={() => navigate({ name: 'shop' })}>Open the catalogue</button>
          </div>
        </div>
      </main>
    );
  }

  if (step === 6) {
    return (
      <>
        <ConfirmPage orderId={orderId} navigate={navigate} formatPrice={formatPrice} totals={totals} />
        <EventLog events={events} expanded={logExpanded} setExpanded={setLogExpanded} onClear={clearLog} />
      </>
    );
  }

  const STEPS = [
    { n: 1, label: 'Pieces',  hint: 'review & customise' },
    { n: 2, label: 'Contact', hint: 'name · phone · email' },
    { n: 3, label: 'Country', hint: 'base shipping rate' },
    { n: 4, label: 'City',    hint: 'final shipping + address' },
    { n: 5, label: 'Payment', hint: '30% deposit today' },
  ];

  return (
    <main className="checkout">
      <div className="container">
        <div className="checkout-head">
          <div className="eyebrow"><span>Checkout</span></div>
          <h1>Almost <em>yours</em>.</h1>
          <p>Five short steps. Every action — and every drop-off — is captured in the live session log on the right.</p>
        </div>

        <div className="steps">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.n}>
              <button className={"step-pill " + (step === s.n ? 'is-active' : '') + (step > s.n ? ' is-done' : '')}
                      onClick={() => step >= s.n && goStep(s.n, `Returned to step ${s.n} · ${s.label.toLowerCase()}`)}>
                <span className="num">{step > s.n ? '✓' : (['i','ii','iii','iv','v'][i])}</span>
                <span className="lbl">
                  <span className="lbl-main">{s.label}</span>
                  <span className="lbl-hint">{s.hint}</span>
                </span>
              </button>
              {i < STEPS.length - 1 && <div className="sep"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="checkout-grid">
          <div>
            {step === 1 && (
              <StepPieces
                items={items} products={products}
                customizations={customizations}
                setCustomization={setCustomization}
                formatPrice={formatPrice}
                log={log}
                onContinue={() => goStep(2, 'Step 2 · contact details')}
              />
            )}
            {step === 2 && (
              <StepContact
                contact={contact} setContact={setContact}
                log={log}
                onContinue={() => {
                  log('contact.completed', `${contact.firstName} ${contact.lastName} · ${contact.email} · ${contact.phoneCC} ${contact.phone}`, contact);
                  goStep(3, 'Step 3 · country (rough shipping)');
                }}
              />
            )}
            {step === 3 && (
              <StepCountry
                address={address} setAddress={setAddress}
                countryShip={countryShip}
                log={log}
                formatPrice={formatPrice}
                onContinue={() => goStep(4, 'Step 4 · city & address (final shipping)')}
              />
            )}
            {step === 4 && (
              <StepAddress
                address={address} setAddress={setAddress}
                cities={citiesFor(address.country)}
                cityShip={cityShip}
                log={log}
                formatPrice={formatPrice}
                onContinue={() => {
                  log('address.completed', `${address.line1}, ${address.city}, ${SHIPPING_RATES[address.country]?.name || address.country}`, address);
                  goStep(5, 'Step 5 · payment');
                }}
              />
            )}
            {step === 5 && (
              <StepPayment
                payment={payment} setPayment={setPayment}
                card={card} setCard={setCard}
                log={log}
                totals={totals}
                formatPrice={formatPrice}
                onPlace={placeOrder}
              />
            )}
          </div>

          <CheckoutSummary
            items={items} products={products}
            totals={totals}
            formatPrice={formatPrice}
            promo={promo} setPromo={setPromo}
            promoApplied={promoApplied}
            applyPromo={applyPromo}
          />
        </div>
      </div>

      <EventLog events={events} expanded={logExpanded} setExpanded={setLogExpanded} onClear={clearLog} />
    </main>
  );
}

/* ─── Confirmation ────────────────────────────────────────── */
function ConfirmPage({ orderId, navigate, formatPrice, totals }) {
  return (
    <main className="confirm">
      <div className="container">
        <div className="crest">{Icon.check}</div>
        <div className="eyebrow"><span>Order confirmed</span></div>
        <h2>Your atelier journey has begun.</h2>
        <p>
          We've received your deposit of <strong>{totals ? formatPrice(totals.deposit) : ''}</strong>.
          Our atelier in Lahore will be in touch within 24 hours to schedule your first fitting and
          walk you through swatches.
        </p>
        <div className="order-id">Order — {orderId}</div>
        <div className="actions">
          <button className="btn" onClick={() => navigate({ name: 'home' })}>Back to home {Icon.arrow}</button>
          <button className="btn btn-ghost" onClick={() => navigate({ name: 'shop' })}>Keep browsing</button>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, {
  CheckoutPage, ConfirmPage, EventLog, useEventLog,
  SHIPPING_RATES, CITY_SURCHARGE, countryShipping, cityShipping, citiesFor,
});
