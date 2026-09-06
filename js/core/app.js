(() => {
  'use strict';

  const config = window.BEARAGNOSTIC_CONFIG;
  const translations = window.BEARAGNOSTIC_I18N;
  const root = document.documentElement;

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const storage = {
    get(key, fallback = null) {
      try { return localStorage.getItem(config.storagePrefix + key) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(config.storagePrefix + key, String(value)); } catch {}
    }
  };

  const studioLaunch = qs('#studioLaunch');
  const appRoot = qs('#appRoot');
  const scrim = qs('#scrim');
  const firstRunSheet = qs('#firstRunSheet');
  const menuSheet = qs('#menuSheet');
  const languageSheet = qs('#languageSheet');
  const infoSheet = qs('#infoSheet');
  const closeSheet = qs('#closeSheet');
  const exitState = qs('#exitState');
  const toast = qs('#toast');
  const iosInstallGuide = qs('#iosInstallGuide');
  const installPrimary = qs('#installPrimary');
  const menuInstall = qs('#menuInstall');

  let activeSheet = null;
  let deferredInstallPrompt = null;
  let toastTimer = null;

  function isStandalone() {
    return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  function getPreferredLanguage() {
    const saved = storage.get('language');
    if (saved && translations[saved]) return saved;
    const browser = (navigator.language || 'en').toLowerCase();
    if (browser.startsWith('ja')) return 'ja';
    if (browser.startsWith('th')) return 'th';
    return 'en';
  }

  let currentLanguage = getPreferredLanguage();

  function t(key) {
    return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
  }

  function applyLanguage(lang, persist = true) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    if (persist) storage.set('language', lang);
    root.lang = lang;

    qsa('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (translations[lang][key] != null) node.textContent = translations[lang][key];
    });
    qsa('[data-i18n-html]').forEach((node) => {
      const key = node.dataset.i18nHtml;
      if (translations[lang][key] != null) node.innerHTML = translations[lang][key];
    });

    const label = qs('#currentLanguageLabel');
    if (label) label.textContent = translations[lang].label;
    qsa('[data-lang]').forEach((button) => button.classList.toggle('is-active', button.dataset.lang === lang));
    updateInstallUI();
  }

  function hydrateBuild() {
    ['#appVersion', '#menuVersion'].forEach((selector) => {
      const el = qs(selector);
      if (el) el.textContent = config.appVersion;
    });
    ['#buildNumber', '#menuBuild'].forEach((selector) => {
      const el = qs(selector);
      if (el) el.textContent = config.build;
    });
  }

  function openSheet(sheet) {
    if (!sheet) return;
    if (activeSheet && activeSheet !== sheet) closeSheetPanel(activeSheet, false);
    activeSheet = sheet;
    sheet.hidden = false;
    scrim.hidden = false;
    requestAnimationFrame(() => {
      scrim.classList.add('is-visible');
      sheet.classList.add('is-open');
    });
  }

  function closeSheetPanel(sheet = activeSheet, animate = true) {
    if (!sheet) return;
    sheet.classList.remove('is-open');
    scrim.classList.remove('is-visible');
    const finish = () => {
      sheet.hidden = true;
      if (!qsa('.sheet.is-open').length) {
        scrim.hidden = true;
        activeSheet = null;
      }
    };
    if (animate) setTimeout(finish, 250); else finish();
  }

  function showToast(message) {
    if (!toast || !message) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => { toast.hidden = true; }, 190);
    }, 2400);
  }

  async function tryOrientationLock() {
    if (!isStandalone() || !screen.orientation?.lock) return;
    try { await screen.orientation.lock('portrait'); } catch {}
  }

  function preventZoomGestures() {
    ['gesturestart', 'gesturechange', 'gestureend'].forEach((eventName) => {
      document.addEventListener(eventName, (event) => event.preventDefault(), { passive: false });
    });
    document.addEventListener('touchmove', (event) => {
      if (event.touches && event.touches.length > 1) event.preventDefault();
    }, { passive: false });
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) event.preventDefault();
      lastTouchEnd = now;
    }, { passive: false });
    document.addEventListener('dblclick', (event) => event.preventDefault(), { passive: false });
    document.addEventListener('wheel', (event) => {
      if (event.ctrlKey) event.preventDefault();
    }, { passive: false });
  }

  function updateInstallUI() {
    if (!installPrimary || !menuInstall) return;
    if (isStandalone()) {
      menuInstall.hidden = true;
      installPrimary.textContent = t('installedAlready');
      installPrimary.disabled = true;
      iosInstallGuide.hidden = true;
      return;
    }

    menuInstall.hidden = false;
    installPrimary.disabled = false;
    if (isIOS()) {
      installPrimary.textContent = iosInstallGuide.hidden ? t('showInstallSteps') : t('installButton');
    } else {
      installPrimary.textContent = t('installButton');
    }
  }

  async function handleInstallAction() {
    if (isStandalone()) {
      showToast(t('installedAlready'));
      return;
    }

    if (isIOS()) {
      iosInstallGuide.hidden = !iosInstallGuide.hidden;
      installPrimary.textContent = iosInstallGuide.hidden ? t('showInstallSteps') : t('installButton');
      return;
    }

    if (deferredInstallPrompt) {
      const promptEvent = deferredInstallPrompt;
      deferredInstallPrompt = null;
      promptEvent.prompt();
      try {
        const choice = await promptEvent.userChoice;
        if (choice?.outcome === 'accepted') {
          storage.set('firstRunSeen', '1');
          closeSheetPanel(firstRunSheet);
          showToast(t('installAccepted'));
        }
      } catch {}
      updateInstallUI();
      return;
    }

    showToast(t('installUnavailable'));
  }

  function shouldShowFirstRun() {
    return !isStandalone() && storage.get('firstRunSeen') !== '1';
  }

  function showFirstRun() {
    if (!shouldShowFirstRun()) return;
    setTimeout(() => openSheet(firstRunSheet), 130);
  }

  function playLaunch() {
    const returning = storage.get('hasLaunched') === '1';
    const studioMs = returning ? 330 : 720;
    const productMs = returning ? 340 : 650;

    appRoot.hidden = false;
    studioLaunch.hidden = false;
    studioLaunch.classList.add('launch--visible');

    setTimeout(() => studioLaunch.classList.add('is-product'), studioMs);
    setTimeout(() => {
      studioLaunch.classList.remove('launch--visible');
      setTimeout(() => {
        studioLaunch.hidden = true;
        studioLaunch.classList.remove('is-product');
        showFirstRun();
      }, 340);
      storage.set('hasLaunched', '1');
    }, studioMs + productMs);
  }

  function showFoundationInfo() {
    openSheet(infoSheet);
  }

  function handleCloseApp() {
    closeSheetPanel(closeSheet, false);
    try { window.close(); } catch {}
    setTimeout(() => {
      if (document.visibilityState !== 'hidden') {
        appRoot.hidden = true;
        exitState.hidden = false;
      }
    }, 180);
  }

  function returnToApp() {
    exitState.hidden = true;
    appRoot.hidden = false;
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
    });
  }

  function bindEvents() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      updateInstallUI();
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      storage.set('firstRunSeen', '1');
      closeSheetPanel(firstRunSheet, false);
      updateInstallUI();
    });

    qs('#menuButton')?.addEventListener('click', () => openSheet(menuSheet));
    qs('#languageRow')?.addEventListener('click', () => openSheet(languageSheet));
    qs('#menuInstall')?.addEventListener('click', () => {
      closeSheetPanel(menuSheet, false);
      openSheet(firstRunSheet);
    });
    qs('#startCheckup')?.addEventListener('click', showFoundationInfo);
    qsa('[data-tool]').forEach((button) => button.addEventListener('click', showFoundationInfo));
    qsa('[data-nav]').forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.nav;
        if (target === 'home') {
          qs('#homeScroll')?.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (target === 'more') {
          openSheet(menuSheet);
          return;
        }
        showFoundationInfo();
      });
    });

    qsa('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => {
        applyLanguage(button.dataset.lang);
        closeSheetPanel(languageSheet);
      });
    });

    qsa('[data-close-sheet]').forEach((button) => button.addEventListener('click', () => closeSheetPanel()));
    scrim?.addEventListener('click', () => closeSheetPanel());

    installPrimary?.addEventListener('click', handleInstallAction);
    qs('#installLater')?.addEventListener('click', () => {
      storage.set('firstRunSeen', '1');
      closeSheetPanel(firstRunSheet);
    });

    qs('#closeAppButton')?.addEventListener('click', () => {
      closeSheetPanel(menuSheet, false);
      openSheet(closeSheet);
    });
    qs('#confirmCloseApp')?.addEventListener('click', handleCloseApp);
    qs('#returnToApp')?.addEventListener('click', returnToApp);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && activeSheet) closeSheetPanel();
    });
  }

  function init() {
    hydrateBuild();
    applyLanguage(currentLanguage, false);
    preventZoomGestures();
    bindEvents();
    registerServiceWorker();
    updateInstallUI();
    tryOrientationLock();
    playLaunch();
  }

  init();
})();
