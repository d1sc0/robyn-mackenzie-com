// Mobile menu toggle script with support for standard load and Astro page events
function initMenu() {
  const burgers = Array.from(document.querySelectorAll('.burger-button'));

  burgers.forEach(el => {
    // Avoid double attaching listeners
    if (el._hasMenuListener) return;
    el._hasMenuListener = true;

    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = el.dataset.target;
      if (!targetId) return;
      const target = document.getElementById(targetId);

      el.classList.toggle('opened');
      if (target) {
        target.classList.toggle('is-active');
        el.setAttribute('aria-expanded', String(el.classList.contains('opened')));
        target.setAttribute('aria-expanded', String(target.classList.contains('is-active')));
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu();
}
document.addEventListener('astro:page-load', initMenu);
