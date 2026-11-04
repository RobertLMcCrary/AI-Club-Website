// Shared behavior for every page. Each feature only runs if its markup exists.

document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Header: solid on scroll, mobile menu, current page ----------

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');

if (header) {
    const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const page = document.body.dataset.page;
    header.querySelector(`[data-nav="${page}"]`)?.setAttribute('aria-current', 'page');
}

if (toggle) {
    const setMenu = (open) => {
        header.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
    header.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
}

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

// ---------- Scroll reveal ----------

const revealObserver = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
);
export function observeReveal(root = document) {
    root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el));
}
observeReveal();

// ---------- Cursor glow on cards ----------

document.querySelectorAll('.pillar').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
});

// ---------- Typewriter (home hero) ----------

const typewriter = document.querySelector('[data-typewriter]');
if (typewriter && !reducedMotion) {
    // Words wrapped in <span class="gold"> in the HTML keep their color while typing.
    const parts = [...typewriter.childNodes]
        .filter((n) => n.textContent.trim() || n.nodeType === Node.TEXT_NODE)
        .map((n) => ({ text: n.textContent, gold: n.nodeType === Node.ELEMENT_NODE }));
    typewriter.setAttribute('aria-label', typewriter.textContent.trim());
    typewriter.textContent = '';

    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');

    const targets = parts.map((p) => {
        const el = p.gold ? Object.assign(document.createElement('span'), { className: 'gold' }) : document.createTextNode('');
        typewriter.append(el);
        return el;
    });
    typewriter.append(caret);

    let part = 0;
    let char = 0;
    const tick = () => {
        if (part >= parts.length) return;
        char++;
        targets[part].textContent = parts[part].text.slice(0, char);
        if (char >= parts[part].text.length) {
            part++;
            char = 0;
        }
        setTimeout(tick, 38 + Math.random() * 50);
    };
    setTimeout(tick, 700);
}

// ---------- Hero neural-network canvas ----------

const canvas = document.querySelector('.hero-canvas');
if (canvas && !reducedMotion) {
    const ctx = canvas.getContext('2d');
    const pointer = { x: -9999, y: -9999 };
    let nodes = [];
    let w = 0;
    let h = 0;
    let running = true;
    const LINK = 150;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.round(Math.min(110, (w * h) / 14000));
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.8,
        }));
    };

    const draw = () => {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);

        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;

            // nodes lean gently toward the cursor
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < 200) {
                n.x += dx * 0.004;
                n.y += dy * 0.004;
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < LINK) {
                    ctx.strokeStyle = `rgba(255, 198, 41, ${(1 - d / LINK) * 0.28})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
            const dp = Math.hypot(a.x - pointer.x, a.y - pointer.y);
            if (dp < 200) {
                ctx.strokeStyle = `rgba(255, 216, 102, ${(1 - dp / 200) * 0.5})`;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(pointer.x, pointer.y);
                ctx.stroke();
            }
        }

        for (const n of nodes) {
            ctx.fillStyle = 'rgba(255, 210, 90, 0.85)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(draw);
    };

    const hero = canvas.closest('.hero');
    hero.addEventListener('pointermove', (e) => {
        const r = canvas.getBoundingClientRect();
        pointer.x = e.clientX - r.left;
        pointer.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', () => {
        pointer.x = pointer.y = -9999;
    });

    // Stop drawing while the hero is off screen.
    new IntersectionObserver(([entry]) => {
        const wasRunning = running;
        running = entry.isIntersecting;
        if (running && !wasRunning) requestAnimationFrame(draw);
    }).observe(hero);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });
    resize();
    requestAnimationFrame(draw);
}

// ---------- Carousel ----------

document.querySelectorAll('[data-carousel]').forEach((root) => {
    const slides = [...root.querySelectorAll('.carousel-slide')];
    const dotsWrap = root.querySelector('.carousel-dots');
    let index = 0;
    let timer;

    const dots = slides.map((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Show photo ${i + 1}`);
        b.addEventListener('click', () => go(i, true));
        dotsWrap.append(b);
        return b;
    });

    function go(i, user = false) {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
        dots.forEach((d, n) => d.setAttribute('aria-current', String(n === index)));
        if (user) restart();
    }
    function restart() {
        clearInterval(timer);
        if (!reducedMotion) timer = setInterval(() => go(index + 1), 6000);
    }

    root.querySelector('[data-prev]').addEventListener('click', () => go(index - 1, true));
    root.querySelector('[data-next]').addEventListener('click', () => go(index + 1, true));
    go(0);
    restart();
});

// ---------- Lightbox ----------

const lightboxItems = [...document.querySelectorAll('[data-lightbox]')];
if (lightboxItems.length) {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML = `
        <span class="lightbox-count"></span>
        <img alt="">
        <button class="icon-btn lightbox-close" type="button" aria-label="Close">${icon('x')}</button>
        <button class="icon-btn lightbox-prev" type="button" aria-label="Previous photo">${icon('left')}</button>
        <button class="icon-btn lightbox-next" type="button" aria-label="Next photo">${icon('right')}</button>`;
    document.body.append(box);

    const img = box.querySelector('img');
    const count = box.querySelector('.lightbox-count');
    let group = [];
    let index = 0;
    let opener = null;

    const show = (i) => {
        index = (i + group.length) % group.length;
        const item = group[index];
        img.src = item.dataset.lightbox;
        img.alt = item.querySelector('img')?.alt || '';
        count.textContent = group.length > 1 ? `${index + 1} / ${group.length}` : '';
        box.querySelectorAll('.lightbox-prev, .lightbox-next').forEach((b) => (b.hidden = group.length < 2));
    };
    const open = (item) => {
        opener = item;
        const name = item.dataset.group;
        group = name ? lightboxItems.filter((el) => el.dataset.group === name) : [item];
        show(group.indexOf(item));
        box.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        box.querySelector('.lightbox-close').focus();
    };
    const close = () => {
        box.classList.remove('is-open');
        document.body.style.overflow = '';
        opener?.focus();
    };

    lightboxItems.forEach((item) => item.addEventListener('click', () => open(item)));
    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
    box.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
    box.addEventListener('click', (e) => e.target === box && close());
    document.addEventListener('keydown', (e) => {
        if (!box.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });
}

// ---------- Flip words (about page) ----------

const flip = document.querySelector('[data-flip]');
if (flip && !reducedMotion) {
    const words = flip.dataset.flip.split('|');
    let i = 0;
    setInterval(() => {
        flip.classList.add('is-out');
        setTimeout(() => {
            i = (i + 1) % words.length;
            flip.textContent = words[i];
            flip.classList.remove('is-out');
        }, 350);
    }, 2400);
}

// ---------- Icons ----------

export function icon(name) {
    const paths = {
        x: '<path d="M18 6 6 18M6 6l12 12"/>',
        left: '<path d="m15 18-6-6 6-6"/>',
        right: '<path d="m9 18 6-6-6-6"/>',
        arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}
