import { select } from '../../js/utils/dom.js';

const MATCH_QUERY = '(min-width: 60rem)';

export function initHeader(root = document) {
  const header = select('[data-component="site-header"]', root);
  if (!header) return;

  const toggle = select('[data-element="nav-toggle"]', header);
  const panel = select('[data-element="nav-panel"]', header);
  const body = document.body;
  const media = window.matchMedia(MATCH_QUERY);

  if (!toggle || !panel) return;

  const setState = (open) => {
    panel.dataset.state = open ? 'open' : 'closed';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.classList.toggle('is-nav-open', open);

  if (open) {
    const firstLink = panel.querySelector('.c-nav__link');
    firstLink?.focus();
  } else {
    toggle.focus();
  }
  };

  const closeMenu = () => setState(false);
  const toggleMenu = () => setState(panel.dataset.state !== 'open');

  header.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('[data-element="nav-toggle"]')) {
      toggleMenu();
      return;
    }

    if (target.closest('[data-nav-link]')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus(); // Escape sonrası odağı geri ver
    }
  });

  media.addEventListener('change', (event) => {
    if (event.matches) closeMenu(); 
  });

  document.addEventListener('click', (event) => {
      // Eğer tıklanan öğe panelin içinde değilse ve panel açıksa
    if (!header.contains(event.target) && panel.dataset.state === 'open') {
      closeMenu();
    }
  });

  setState(false);
}


