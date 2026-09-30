/**
 * Banner de consentimiento de cookies - Ley 21.719 Chile
 * Estándar minimalista para landing informativa.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'br_cookie_consent_v1';
  var COOKIE_NAME = 'br_consent';

  function getConsent() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(analytics, marketing) {
    var consent = {
      essential: true,
      analytics: analytics,
      marketing: marketing,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {}
    document.cookie = COOKIE_NAME + '=' + encodeURIComponent(JSON.stringify(consent)) + ';path=/;max-age=31536000;SameSite=Lax';
    return consent;
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('hidden');
      banner.setAttribute('aria-hidden', 'false');
    }
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('hidden');
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  function init() {
    var consent = getConsent();
    if (consent) return;

    showBanner();

    var acceptAll = document.getElementById('cookie-accept-all');
    var rejectAll = document.getElementById('cookie-reject-all');
    var savePrefs = document.getElementById('cookie-save-prefs');
    var analyticsToggle = document.getElementById('cookie-analytics');
    var marketingToggle = document.getElementById('cookie-marketing');
    var settingsToggle = document.getElementById('cookie-settings-toggle');
    var settingsPanel = document.getElementById('cookie-settings-panel');

    if (settingsToggle && settingsPanel) {
      settingsToggle.addEventListener('click', function () {
        var isHidden = settingsPanel.classList.contains('hidden');
        settingsPanel.classList.toggle('hidden');
        settingsToggle.setAttribute('aria-expanded', String(isHidden));
      });
    }

    if (acceptAll) {
      acceptAll.addEventListener('click', function () {
        saveConsent(true, true);
        hideBanner();
      });
    }

    if (rejectAll) {
      rejectAll.addEventListener('click', function () {
        saveConsent(false, false);
        hideBanner();
      });
    }

    if (savePrefs) {
      savePrefs.addEventListener('click', function () {
        var analytics = analyticsToggle ? analyticsToggle.checked : false;
        var marketing = marketingToggle ? marketingToggle.checked : false;
        saveConsent(analytics, marketing);
        hideBanner();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // API pública para revocar consentimiento
  window.CookieConsent = {
    revoke: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      document.cookie = COOKIE_NAME + '=;path=/;max-age=0';
      showBanner();
    },
    getStatus: function () {
      return getConsent();
    }
  };
})();