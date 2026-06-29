/* Behavior + dynamic rendering. Reads window.I18N (chrome strings) and
   window.CV (CV records). Renders the bento grids and re-renders on language switch. */

const LANG_STORAGE_KEY = 'cv_lang';
const THEME_STORAGE_KEY = 'cv_theme';

/* ---- dynamic rendering from data/cv.js ---- */

// Span pattern for the cases bento (12-col grid); `wide` cases take a full row.
const CASE_SPANS = [7, 5, 5, 7];

function renderCases(lang) {
    const grid = document.querySelector('.case-grid');
    if (!grid || !window.CV) return;
    grid.innerHTML = window.CV.cases.map((c, i) => {
        const span = c.wide ? 12 : (CASE_SPANS[i % CASE_SPANS.length] || 6);
        const meta = c.tags.map((t) => `<span>${t}</span>`).join('');
        return `<article class="case-card tile span-${span}">
            <div class="case-meta">${meta}</div>
            <h3>${c.title[lang]}</h3>
            <p>${c.desc[lang]} <strong>${c.result[lang]}</strong></p>
        </article>`;
    }).join('');
}

function renderCapabilities(lang) {
    const grid = document.querySelector('.capability-grid');
    if (!grid || !window.CV) return;
    grid.innerHTML = window.CV.capabilities.map((cap) => (
        `<div class="capability tile span-3">
            <i class="fas ${cap.icon}"></i>
            <h3>${cap.title[lang]}</h3>
            <p>${cap.desc[lang]}</p>
        </div>`
    )).join('');
}

function renderExperience(lang) {
    const list = document.querySelector('.experience-list');
    if (list && window.CV) {
        list.innerHTML = window.CV.experience.map((e) => (
            `<article class="experience-row">
                <span>${e.date[lang]}</span>
                <div><h3>${e.role[lang]}</h3><p>${e.desc[lang]}</p></div>
            </article>`
        )).join('');
    }
    const credibility = document.querySelector('.credibility');
    if (credibility && window.CV) credibility.textContent = window.CV.credentials[lang];
}

/* ---- navigation ---- */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMobileMenu(open) {
    const willOpen = typeof open === 'boolean' ? open : !navMenu.classList.contains('active');
    hamburger.classList.toggle('active', willOpen);
    navMenu.classList.toggle('active', willOpen);
    hamburger.setAttribute('aria-expanded', String(willOpen));
}

hamburger.addEventListener('click', () => toggleMobileMenu());
document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => toggleMobileMenu(false)));
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 24);
});

/* ---- localization ---- */

function applyI18n(lang) {
    const dict = I18N[lang] || I18N.ru;
    document.title = dict.title;
    document.documentElement.lang = lang === 'en' ? 'en' : 'ru';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    renderCases(lang);
    renderCapabilities(lang);
    renderExperience(lang);
}

const initialLang = localStorage.getItem(LANG_STORAGE_KEY) || 'ru';
applyI18n(initialLang);
document.querySelectorAll('.lang-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
        localStorage.setItem(LANG_STORAGE_KEY, btn.dataset.lang);
        applyI18n(btn.dataset.lang);
    });
});

/* ---- theme ---- */

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
applyTheme(savedTheme);
document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
        applyTheme(btn.dataset.theme);
    });
});

/* ---- actions ---- */

document.getElementById('download-pdf').addEventListener('click', () => window.print());
document.getElementById('contact-print').addEventListener('click', () => window.print());
document.getElementById('contact-copy').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const email = 'sergey.aktush@gmail.com';
    const dict = I18N[localStorage.getItem(LANG_STORAGE_KEY) || 'ru'] || I18N.ru;
    try {
        await navigator.clipboard.writeText(email);
        const oldText = button.querySelector('span').textContent;
        button.querySelector('span').textContent = dict.toastCopied;
        setTimeout(() => { button.querySelector('span').textContent = oldText; }, 1200);
    } catch (_) {
        window.prompt('Copy email:', email);
    }
});

/* ---- easter egg ---- */

const logo = document.getElementById('site-logo');
const modal = document.getElementById('easter-egg-modal');
const easterLink = document.getElementById('easter-link');
let clickCount = 0;
let clickResetTimer = null;
const REQUIRED_CLICKS = 7;
const RESET_AFTER_MS = 1400;

function openModal() {
    const secretHref = String.fromCharCode(109,97,110,117,97,108,45,97,109,110,101,122,105,97,118,112,110,46,104,116,109,108);
    easterLink.setAttribute('href', secretHref);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('a, button').focus();
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    logo.focus();
}

logo.addEventListener('click', () => {
    clickCount += 1;
    if (clickResetTimer) clearTimeout(clickResetTimer);
    clickResetTimer = setTimeout(() => { clickCount = 0; }, RESET_AFTER_MS);
    if (clickCount >= REQUIRED_CLICKS) {
        clickCount = 0;
        clearTimeout(clickResetTimer);
        openModal();
    }
});

modal.addEventListener('click', (event) => {
    if (event.target.closest('[data-modal-close]')) closeModal();
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});
