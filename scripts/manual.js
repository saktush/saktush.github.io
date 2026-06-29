/* Manual page: renders content from window.MANUAL, wires copy-code, and
   reuses the main page's cv_theme / cv_lang storage for consistent theme + language. */

const LANG_STORAGE_KEY = 'cv_lang';
const THEME_STORAGE_KEY = 'cv_theme';

/* ---- rendering ---- */

function renderChecklist(lang) {
    const grid = document.querySelector('.manual-checklist');
    if (!grid || !window.MANUAL) return;
    grid.innerHTML = window.MANUAL.checklist.map((item) => (
        `<div class="tile span-4">
            <strong>${item.label[lang]}</strong>
            <span>${item.text[lang]}</span>
        </div>`
    )).join('');
}

function renderSteps(lang) {
    const wrap = document.querySelector('.manual-steps');
    if (!wrap || !window.MANUAL) return;
    const copy = window.MANUAL.chrome.copy[lang];
    wrap.innerHTML = window.MANUAL.steps.map((step) => {
        const note = step.note
            ? `<aside class="manual-note${step.note.accent ? ' accent' : ''}">
                   <strong>${step.note.title[lang]}</strong>
                   <p>${step.note.text[lang]}</p>
               </aside>`
            : '';
        return `<section class="manual-section">
            <div class="manual-step">
                <span>${step.num}</span>
                <div>
                    <h2>${step.title[lang]}</h2>
                    <p>${step.desc[lang]}</p>
                </div>
            </div>
            <div class="terminal-block">
                <button class="copy-code" type="button"><i class="fas fa-copy"></i><span>${copy}</span></button>
                <pre><code>${escapeHtml(step.code)}</code></pre>
            </div>
            ${note}
        </section>`;
    }).join('');
    wireCopyButtons();
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

/* ---- copy buttons ---- */

function wireCopyButtons() {
    const lang = localStorage.getItem(LANG_STORAGE_KEY) || 'ru';
    const copied = window.MANUAL.chrome.copied[lang];
    document.querySelectorAll('.copy-code').forEach((button) => {
        button.addEventListener('click', async () => {
            const code = button.parentElement.querySelector('code').textContent;
            const label = button.querySelector('span');
            const oldText = label.textContent;
            try {
                await navigator.clipboard.writeText(code);
                label.textContent = copied;
                setTimeout(() => { label.textContent = oldText; }, 1200);
            } catch (_) {
                window.prompt('Copy command:', code);
            }
        });
    });
}

/* ---- localization ---- */

function applyI18n(lang) {
    const c = window.MANUAL.chrome;
    document.title = c.docTitle[lang];
    document.documentElement.lang = lang === 'en' ? 'en' : 'ru';
    document.querySelectorAll('[data-manual]').forEach((el) => {
        const key = el.getAttribute('data-manual');
        if (c[key] && c[key][lang] != null) el.textContent = c[key][lang];
    });
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    renderChecklist(lang);
    renderSteps(lang);
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
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});
