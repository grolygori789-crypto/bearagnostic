(() => {
  'use strict';

  const CONFIG = window.BEARAGNOSTIC_CONFIG || {};
  const COPY = window.BEARAGNOSTIC_I18N || {};
  const STORAGE = CONFIG.storagePrefix || 'bearagnostic.';
  const BUILD = Number(CONFIG.build || 3);
  const FIRST_LAUNCH_KEY = `${STORAGE}launch.seen.b${BUILD}`;
  const INSTALL_DISMISSED_KEY = `${STORAGE}install.dismissed.b${BUILD}`;
  const LANG_KEY = `${STORAGE}language`;
  const MOTION_KEY = `${STORAGE}motion`;
  const FULLSCREEN_KEY = `${STORAGE}browserFullscreen`;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const byId = (id) => document.getElementById(id);

  const appRoot = byId('appRoot');
  const launch = byId('launch');
  const studioStage = $('[data-launch-stage="studio"]');
  const productStage = $('[data-launch-stage="product"]');
  const orientationGuard = byId('orientationGuard');
  const modalScrim = byId('modalScrim');
  const installSheet = byId('installSheet');
  const infoSheet = byId('infoSheet');
  const confirmSheet = byId('confirmSheet');
  const exitScreen = byId('exitScreen');
  const toast = byId('toast');

  let currentLanguage = 'en';
  let deferredInstallPrompt = null;
  let currentScreen = 'home';
  let infoReturnFocus = null;
  let confirmAction = null;
  let installOfferTimer = null;
  let installOfferShownThisSession = false;

  function storageGet(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value == null ? fallback : value;
    } catch (_) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (_) {}
  }

  function storageRemoveByPrefix() {
    try {
      const keepLaunch = localStorage.getItem(FIRST_LAUNCH_KEY);
      const keys = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE)) keys.push(key);
      }
      keys.forEach((key) => localStorage.removeItem(key));
      if (keepLaunch) localStorage.setItem(FIRST_LAUNCH_KEY, keepLaunch);
    } catch (_) {}
  }

  function detectLanguage() {
    const saved = storageGet(LANG_KEY);
    if (saved && COPY[saved]) return saved;
    const preferred = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
    if (preferred.startsWith('th')) return 'th';
    if (preferred.startsWith('ja')) return 'ja';
    return 'en';
  }

  function t(key) {
    return COPY[currentLanguage]?.[key] ?? COPY.en?.[key] ?? key;
  }

  function applyLanguage(lang, { persist = true } = {}) {
    if (!COPY[lang]) lang = 'en';
    currentLanguage = lang;
    document.documentElement.lang = lang === 'ja' ? 'ja' : lang === 'th' ? 'th' : 'en';

    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (COPY[lang]?.[key] != null) el.textContent = COPY[lang][key];
    });
    $$('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (COPY[lang]?.[key] != null) el.innerHTML = COPY[lang][key];
    });
    $$('[data-i18n-aria]').forEach((el) => {
      const key = el.dataset.i18nAria;
      if (COPY[lang]?.[key] != null) el.setAttribute('aria-label', COPY[lang][key]);
    });
    $$('[data-language-group] [data-lang]').forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (persist) storageSet(LANG_KEY, lang);
  }

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true;
  }

  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function isSafari() {
    return /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(navigator.userAgent);
  }

  function canInstallViaNativePrompt() {
    return Boolean(deferredInstallPrompt);
  }

  function setMotionMode(mode) {
    if (!['system', 'full', 'reduced'].includes(mode)) mode = 'system';
    document.documentElement.dataset.motion = mode;
    const select = byId('motionSelect');
    if (select) select.value = mode;
    storageSet(MOTION_KEY, mode);
  }

  async function tryPortraitLock() {
    const orientation = screen.orientation;
    if (!orientation || typeof orientation.lock !== 'function') return false;
    for (const target of ['portrait-primary', 'portrait']) {
      try {
        await orientation.lock(target);
        return true;
      } catch (_) {}
    }
    return false;
  }

  function syncOrientationGuard() {
    const landscape = matchMedia('(orientation: landscape)').matches && innerWidth > innerHeight;
    if (orientationGuard) orientationGuard.hidden = !landscape;
  }

  function requestPortraitLock() {
    if (document.visibilityState !== 'visible') return;
    tryPortraitLock().finally(syncOrientationGuard);
  }

  function requestBrowserFullscreen() {
    const wants = storageGet(FULLSCREEN_KEY, 'false') === 'true';
    if (!wants || isStandalone() || document.fullscreenElement) return;
    const root = document.documentElement;
    const fn = root.requestFullscreen || root.webkitRequestFullscreen;
    if (!fn) return;
    Promise.resolve(fn.call(root)).catch(() => {});
  }

  function syncFullscreenToggle() {
    const row = byId('browserFullscreenRow');
    const toggle = byId('fullscreenToggle');
    const installed = isStandalone();
    if (row) row.classList.toggle('is-muted', installed);
    if (toggle) {
      toggle.disabled = installed;
      toggle.checked = installed || storageGet(FULLSCREEN_KEY, 'false') === 'true';
    }
  }

  function closeAllSheets({ restoreFocus = false } = {}) {
    [installSheet, infoSheet, confirmSheet].forEach((sheet) => {
      if (sheet) sheet.hidden = true;
    });
    if (modalScrim) modalScrim.hidden = true;
    document.body.classList.remove('modal-open');
    if (restoreFocus && infoReturnFocus?.focus) infoReturnFocus.focus({ preventScroll: true });
    infoReturnFocus = null;
  }

  function openSheet(sheet, focusTarget = null) {
    closeAllSheets();
    if (!sheet) return;
    infoReturnFocus = document.activeElement;
    sheet.hidden = false;
    modalScrim.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      const focusable = focusTarget || $('button, [href], input, select, [tabindex]:not([tabindex="-1"])', sheet);
      focusable?.focus?.({ preventScroll: true });
    });
  }

  function openInfo(kind) {
    const map = {
      privacy: ['privacyKicker', 'privacyTitle', 'privacyBodyHtml'],
      help: ['helpKicker', 'helpTitle', 'helpBodyHtml'],
      about: ['aboutKicker', 'aboutTitle', 'aboutBodyHtml'],
      tool: [null, 'toolComingTitle', 'toolComingBody']
    };
    const [kickerKey, titleKey, bodyKey] = map[kind] || map.about;
    byId('infoKicker').textContent = kickerKey ? t(kickerKey) : 'BEARAGNOSTIC';
    byId('infoTitle').textContent = t(titleKey);
    const content = t(bodyKey);
    byId('infoContent').innerHTML = bodyKey.endsWith('Html') ? content : `<p>${escapeHTML(content)}</p>`;
    openSheet(infoSheet, byId('closeInfo'));
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  }

  function openConfirm({ title, body, primary, action, danger = false }) {
    byId('confirmTitle').textContent = title;
    byId('confirmBody').textContent = body;
    const primaryButton = byId('confirmPrimary');
    primaryButton.textContent = primary;
    primaryButton.classList.toggle('primary-button--danger', Boolean(danger));
    confirmAction = action;
    openSheet(confirmSheet, primaryButton);
  }

  function showToast(message, duration = 2400) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => { toast.hidden = true; }, 180);
    }, duration);
  }

  function switchScreen(name, { focus = false } = {}) {
    const target = $(`[data-screen="${CSS.escape(name)}"]`);
    if (!target) return;
    $$('.screen').forEach((screen) => {
      const active = screen === target;
      screen.hidden = !active;
      screen.classList.toggle('is-active', active);
    });
    $$('.nav-button[data-nav]').forEach((button) => {
      const active = button.dataset.nav === name || (name === 'settings' && button.dataset.nav === 'more');
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    currentScreen = name;
    if (focus) target.focus?.({ preventScroll: true });
  }

  async function runOpening() {
    let done = false;
    const firstForBuild = storageGet(FIRST_LAUNCH_KEY) !== '1';
    const timings = firstForBuild
      ? { studio: 1250, product: 1100, fade: 350 }
      : { studio: 430, product: 470, fade: 180 };

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(failOpen);
      launch?.classList.add('is-leaving');
      if (appRoot) appRoot.hidden = false;
      setTimeout(() => {
        if (launch) launch.hidden = true;
        document.body.classList.add('app-ready');
        storageSet(FIRST_LAUNCH_KEY, '1');
        scheduleInstallOffer();
      }, timings.fade);
    };

    const failOpen = setTimeout(finish, 4200);
    try {
      if (appRoot) appRoot.hidden = true;
      if (launch) launch.hidden = false;
      studioStage?.classList.add('is-active');
      productStage?.classList.remove('is-active');
      await wait(timings.studio);
      studioStage?.classList.remove('is-active');
      productStage?.classList.add('is-active');
      await wait(timings.product);
      finish();
    } catch (_) {
      finish();
    }
  }

  function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

  function shouldOfferInstall() {
    if (isStandalone()) return false;
    if (installOfferShownThisSession) return false;
    return storageGet(INSTALL_DISMISSED_KEY) !== '1';
  }

  function scheduleInstallOffer() {
    clearTimeout(installOfferTimer);
    if (!shouldOfferInstall()) return;
    installOfferTimer = setTimeout(() => {
      if (!shouldOfferInstall() || currentScreen !== 'home' || document.hidden) return;
      showInstallSheet();
    }, 520);
  }

  function showInstallSheet() {
    if (!shouldOfferInstall()) return;
    installOfferShownThisSession = true;
    const ios = isIOS() && !isStandalone();
    const iosSteps = byId('iosSteps');
    if (iosSteps) iosSteps.hidden = !ios;
    const installButton = byId('installButton');
    if (installButton) installButton.textContent = ios ? t('gotIt') : t('installButton');
    openSheet(installSheet, installButton);
  }

  async function handleInstall() {
    if (isStandalone()) {
      closeAllSheets();
      return;
    }
    if (deferredInstallPrompt) {
      try {
        deferredInstallPrompt.prompt();
        const result = await deferredInstallPrompt.userChoice;
        if (result?.outcome === 'accepted') {
          storageSet(INSTALL_DISMISSED_KEY, '1');
          closeAllSheets();
        }
      } catch (_) {}
      deferredInstallPrompt = null;
      return;
    }

    if (isIOS()) {
      storageSet(INSTALL_DISMISSED_KEY, '1');
      closeAllSheets({ restoreFocus: true });
      return;
    }

    closeAllSheets();
    byId('infoKicker').textContent = 'INSTALL';
    byId('infoTitle').textContent = t('installUnavailableTitle');
    byId('infoContent').innerHTML = `<p>${escapeHTML(t('installUnavailableBody'))}</p>`;
    openSheet(infoSheet, byId('closeInfo'));
  }

  function safeDiagnostics() {
    const supportsDirectory = 'showDirectoryPicker' in window || 'webkitdirectory' in document.createElement('input');
    const supportsFSAccess = 'showOpenFilePicker' in window;
    const pwaMode = isStandalone() ? 'installed' : 'browser';
    return [
      `Bearagnostic ${CONFIG.appVersion || '0.1.2'} · Build ${BUILD}`,
      `Language: ${currentLanguage}`,
      `Mode: ${pwaMode}`,
      `Viewport: ${Math.round(innerWidth)}×${Math.round(innerHeight)}`,
      `File System Access API: ${supportsFSAccess ? 'yes' : 'no'}`,
      `Directory selection: ${supportsDirectory ? 'yes' : 'no'}`,
      `Service worker: ${'serviceWorker' in navigator ? 'yes' : 'no'}`,
      `Timestamp: ${new Date().toISOString()}`
    ].join('\n');
  }

  function openMail(kind) {
    const email = CONFIG.supportEmail || 'benedict.support@gmail.com';
    const subject = kind === 'problem'
      ? `Bearagnostic Build ${BUILD} — Problem report`
      : `Bearagnostic Build ${BUILD} — Feedback`;
    const body = kind === 'problem'
      ? `Please describe what happened:\n\n\n--- Safe diagnostics ---\n${safeDiagnostics()}`
      : 'Feedback for Bearagnostic:\n\n';
    const href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try { window.location.href = href; } catch (_) { showToast(t('emailUnavailable')); }
  }

  async function copyDiagnostics() {
    const text = safeDiagnostics();
    try {
      await navigator.clipboard.writeText(text);
      showToast(t('diagnosticsCopied'));
    } catch (_) {
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
        showToast(t('diagnosticsCopied'));
      } catch (_) {}
    }
  }

  async function closeApp() {
    closeAllSheets();
    try {
      if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
    } catch (_) {}
    try { window.close(); } catch (_) {}
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        appRoot.hidden = true;
        exitScreen.hidden = false;
      }
    }, 240);
  }

  function bindEvents() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      if (!launch || launch.hidden) scheduleInstallOffer();
    });
    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      storageSet(INSTALL_DISMISSED_KEY, '1');
      closeAllSheets();
      syncFullscreenToggle();
    });

    byId('homeBrandButton')?.addEventListener('click', () => switchScreen('home'));
    byId('settingsButton')?.addEventListener('click', () => switchScreen('settings'));
    byId('settingsBack')?.addEventListener('click', () => switchScreen('more'));

    $$('.nav-button[data-nav]').forEach((button) => {
      button.addEventListener('click', () => switchScreen(button.dataset.nav));
    });

    $$('[data-open]').forEach((button) => {
      button.addEventListener('click', () => {
        const kind = button.dataset.open;
        if (kind === 'settings') switchScreen('settings');
        else openInfo(kind);
      });
    });

    $$('[data-tool]').forEach((button) => button.addEventListener('click', () => openInfo('tool')));
    byId('startCheckup')?.addEventListener('click', () => switchScreen('checkup'));
    byId('healthCard')?.addEventListener('click', () => switchScreen('checkup'));

    $$('[data-language-group] [data-lang]').forEach((button) => {
      button.addEventListener('click', () => applyLanguage(button.dataset.lang));
    });

    byId('motionSelect')?.addEventListener('change', (event) => setMotionMode(event.target.value));
    byId('fullscreenToggle')?.addEventListener('change', (event) => {
      storageSet(FULLSCREEN_KEY, event.target.checked ? 'true' : 'false');
      if (event.target.checked) requestBrowserFullscreen();
    });

    byId('clearLocalData')?.addEventListener('click', () => openConfirm({
      title: t('clearConfirmTitle'), body: t('clearConfirmBody'), primary: t('clearConfirmButton'), danger: true,
      action: () => {
        storageRemoveByPrefix();
        applyLanguage(detectLanguage(), { persist: true });
        setMotionMode('system');
        syncFullscreenToggle();
        showToast(t('clearedToast'));
      }
    }));
    byId('reportProblem')?.addEventListener('click', () => openMail('problem'));
    byId('sendFeedback')?.addEventListener('click', () => openMail('feedback'));
    byId('copyDiagnostics')?.addEventListener('click', copyDiagnostics);

    $$('[data-close-app]').forEach((button) => button.addEventListener('click', () => openConfirm({
      title: t('closeConfirmTitle'), body: t('closeConfirmBody'), primary: t('closeConfirmButton'), danger: true, action: closeApp
    })));

    byId('installButton')?.addEventListener('click', handleInstall);
    byId('installLater')?.addEventListener('click', () => {
      storageSet(INSTALL_DISMISSED_KEY, '1');
      closeAllSheets({ restoreFocus: true });
    });
    byId('closeInfo')?.addEventListener('click', () => closeAllSheets({ restoreFocus: true }));
    byId('confirmCancel')?.addEventListener('click', () => { confirmAction = null; closeAllSheets({ restoreFocus: true }); });
    byId('confirmPrimary')?.addEventListener('click', () => {
      const action = confirmAction;
      confirmAction = null;
      closeAllSheets();
      if (typeof action === 'function') action();
    });
    modalScrim?.addEventListener('click', () => closeAllSheets({ restoreFocus: true }));
    byId('returnToApp')?.addEventListener('click', () => {
      exitScreen.hidden = true;
      appRoot.hidden = false;
      switchScreen('home');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (!confirmSheet.hidden || !infoSheet.hidden || !installSheet.hidden) closeAllSheets({ restoreFocus: true });
      }
    });

    // Strong web-app zoom suppression. OS accessibility zoom may still override this by design.
    ['gesturestart', 'gesturechange', 'gestureend'].forEach((name) => {
      document.addEventListener(name, (event) => event.preventDefault(), { passive: false });
    });
    document.addEventListener('wheel', (event) => {
      if (event.ctrlKey) event.preventDefault();
    }, { passive: false });
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 280) event.preventDefault();
      lastTouchEnd = now;
    }, { passive: false });

    // Best-effort portrait/fullscreen requests after user gesture where platform requires it.
    const gestureUpgrade = () => {
      requestPortraitLock();
      requestBrowserFullscreen();
    };
    document.addEventListener('pointerdown', gestureUpgrade, { capture: true, passive: true, once: true });
    document.addEventListener('touchstart', gestureUpgrade, { capture: true, passive: true, once: true });

    window.addEventListener('resize', syncOrientationGuard, { passive: true });
    window.addEventListener('orientationchange', syncOrientationGuard, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        requestPortraitLock();
        syncOrientationGuard();
      }
    });
    window.addEventListener('pageshow', requestPortraitLock);
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js?v=3', { scope: './' }).catch(() => {});
    }, { once: true });
  }

  function boot() {
    currentLanguage = detectLanguage();
    applyLanguage(currentLanguage, { persist: false });
    setMotionMode(storageGet(MOTION_KEY, 'system'));
    syncFullscreenToggle();
    syncOrientationGuard();
    bindEvents();
    registerServiceWorker();
    requestPortraitLock();
    runOpening();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
