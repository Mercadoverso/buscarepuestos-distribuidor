document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      // Cerrar los demás acordeones
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherButton = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          
          if (otherButton && otherAnswer) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherAnswer.classList.add('hidden');
            if (otherIcon) otherIcon.classList.remove('rotate-180');
          }
        }
      });

      // Alternar el actual
      if (isOpen) {
        button.setAttribute('aria-expanded', 'false');
        answer.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        button.setAttribute('aria-expanded', 'true');
        answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
});