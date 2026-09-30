/**
 * Acordeón accesible de Preguntas Frecuentes.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      var icon = btn ? btn.querySelector('svg') : null;
      if (!btn || !answer) return;

      btn.addEventListener('click', function () {
        var isOpen = !answer.classList.contains('hidden');

        items.forEach(function (other) {
          if (other === item) return;
          var oa = other.querySelector('.faq-answer');
          var ob = other.querySelector('.faq-question');
          var oi = ob ? ob.querySelector('svg') : null;
          if (oa) oa.classList.add('hidden');
          if (ob) ob.setAttribute('aria-expanded', 'false');
          if (oi) oi.style.transform = 'rotate(0deg)';
        });

        answer.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', String(!isOpen));
        if (icon) icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
  });
})();