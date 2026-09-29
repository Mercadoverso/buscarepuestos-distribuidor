/**
 * BuscaRepuestos.cl — Distribuidores
 * Utilidades globales del sitio.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Año dinámico en footer
    var yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Smooth scroll para anclas internas (respetando prefers-reduced-motion)
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start'
        });
        // Mover el foco por accesibilidad
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  });
})();