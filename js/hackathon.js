// Hackathon 2026 page. Content comes from ./hackathon-data.js.

import { HACKATHON } from './hackathon-data.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TZ = 'America/New_York';
const $ = (sel) => document.querySelector(sel);
const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const isTBA = (v) => !v || String(v).trim().toUpperCase() === 'TBA';
const show = (v) => (isTBA(v) ? '<span class="tba">TBA</span>' : esc(v));

// ---------- Boot screen ----------

function boot() {
    const screen = $('#boot');
    if (!screen || document.documentElement.classList.contains('no-boot')) return;

    const lines = [
        ['KSU CAMPUS OS v2026.11', 'hl'],
        ['Kennesaw State University · AI Club', ''],
        ['', ''],
        ['[  OK  ] Initializing AI Club kernel', 'ok'],
        ['[  OK  ] Mounting /dining', 'ok'],
        ['[  OK  ] Mounting /parking', 'ok'],
        ['[  OK  ] Mounting /study-rooms', 'ok'],
        ['[  OK  ] Loading tracks: ai-club, ieee-cyber, nudox-games', 'ok'],
        ['[  OK  ] Stocking free food (5 days)', 'ok'],
        ['[ WAIT ] Waiting for builders...', 'hl'],
        ['', ''],
        ['> launch hackathon-2026', 'hl'],
    ];
    const log = $('#boot-log');
    let i = 0;
    let timer;

    const finish = () => {
        clearTimeout(timer);
        screen.classList.add('is-done');
        try {
            sessionStorage.setItem('campus-os-booted', '1');
        } catch {}
        window.removeEventListener('keydown', finish);
        screen.removeEventListener('click', finish);
    };
    const next = () => {
        if (i >= lines.length) {
            timer = setTimeout(finish, 350);
            return;
        }
        const [text, cls] = lines[i++];
        const row = document.createElement('div');
        if (cls === 'ok') {
            row.innerHTML = `[<span class="ok">  OK  </span>]${esc(text.slice(8))}`;
        } else {
            row.textContent = text || ' ';
            if (cls) row.className = cls;
        }
        log.append(row);
        timer = setTimeout(next, 90 + Math.random() * 70);
    };

    window.addEventListener('keydown', finish);
    screen.addEventListener('click', finish);
    next();
}

// ---------- Menu bar clock ----------

function clock() {
    const el = $('#clock');
    if (!el) return;
    const fmt = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
    const tick = () => (el.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 15000);
}

// ---------- Countdown ----------

function countdown() {
    const root = $('#countdown');
    if (!root) return;
    const label = $('#countdown-label');
    const units = Object.fromEntries([...root.querySelectorAll('[data-unit]')].map((el) => [el.dataset.unit, el]));
    const start = new Date(HACKATHON.kickoff).getTime();
    const end = new Date(HACKATHON.end).getTime();
    const pad = (n) => String(n).padStart(2, '0');

    const tick = () => {
        const now = Date.now();
        let target;
        if (now < start) {
            label.textContent = 'T-minus until kickoff';
            target = start;
        } else if (now < end) {
            label.textContent = '● Live now: time left to hack';
            root.classList.add('is-live');
            target = end;
        } else {
            label.textContent = 'Hackathon complete. Thanks for building with us!';
            target = now;
        }
        const s = Math.max(0, Math.floor((target - now) / 1000));
        units.days.textContent = pad(Math.floor(s / 86400));
        units.hours.textContent = pad(Math.floor((s % 86400) / 3600));
        units.minutes.textContent = pad(Math.floor((s % 3600) / 60));
        units.seconds.textContent = pad(s % 60);
    };
    tick();
    setInterval(tick, 1000);
}

// ---------- Content from hackathon-data.js ----------

function renderStats() {
    const el = $('#prize-pool');
    if (el) el.innerHTML = show(HACKATHON.prizePool);
}

function renderTracks() {
    const el = $('#tracks-list');
    if (!el) return;
    el.innerHTML = HACKATHON.tracks
        .map(
            (t, i) => `
        <article class="win track reveal" style="--delay:${i * 0.08}s">
            <div class="win-bar"><span class="dots"><i></i><i></i><i></i></span><span class="win-title">track_0${i + 1} // ${esc(t.id)}</span></div>
            <div class="win-body">
                <span class="track-host">hosted by ${esc(t.host)}</span>
                <h3>${esc(t.name)}</h3>
                <p>${esc(t.blurb)}</p>
                <div class="track-prize">Prize <strong>${show(t.prize)}</strong></div>
            </div>
        </article>`
        )
        .join('');
}

function renderSchedule() {
    const el = $('#schedule-list');
    if (!el) return;
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date()); // YYYY-MM-DD
    const dayName = (iso, opts) =>
        new Date(`${iso}T12:00:00-05:00`).toLocaleDateString('en-US', { timeZone: TZ, ...opts });

    el.innerHTML = HACKATHON.schedule
        .map(
            (d) => `
        <div class="day${d.date === today ? ' is-today' : ''}">
            <div class="day-head">
                <span class="day-name">${dayName(d.date, { weekday: 'short' }).toUpperCase()}</span>
                <span class="day-date">${dayName(d.date, { month: 'short', day: 'numeric' })}</span>
                <span class="day-label">${d.date === today ? 'Today' : esc(d.label || '')}</span>
            </div>
            <ul class="day-items">
                ${d.items
                    .map(
                        (it) => `
                <li>
                    <span class="item-time">${show(it.time)}</span>
                    <span class="item-title">${esc(it.title)}</span>
                    <span class="item-room">${show(it.room)}</span>
                </li>`
                    )
                    .join('')}
            </ul>
        </div>`
        )
        .join('');
}

function renderPartners() {
    const el = $('#partners-list');
    if (!el) return;
    const card = (type, name, sub, url) => {
        const tag = url ? 'a' : 'div';
        const attrs = url ? ` href="${esc(url)}" target="_blank" rel="noopener"` : '';
        return `<${tag} class="module reveal"${attrs}><span class="module-type">${type}</span><strong>${esc(name)}</strong><span>${esc(sub)}</span></${tag}>`;
    };
    el.innerHTML = [
        ...HACKATHON.partners.map((p) => card('partner', p.name, p.role, p.url)),
        ...HACKATHON.sponsors.map((s) => card('sponsor', s.name, s.tier || 'Sponsor', s.url)),
        `<a class="module module-open reveal" href="/sponsors"><span class="module-type">slot open</span><strong>Your company</strong><span>Become a sponsor &rarr;</span></a>`,
    ].join('');
}

// ---------- Reveal on scroll ----------

function reveal() {
    const io = new IntersectionObserver(
        (entries) => {
            for (const e of entries) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

renderStats();
renderTracks();
renderSchedule();
renderPartners();
reveal();
clock();
countdown();
if (!reducedMotion) boot();
else $('#boot')?.classList.add('is-done');
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
