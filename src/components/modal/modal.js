import { select } from '../../js/utils/dom.js';
import { enhanceForms } from '../contact/contact.js';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function initModal(root = document) {
  const template = select('#modal-template', root);
  if (!template) return;

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-modal-trigger]');
    if (!trigger) return;
    event.preventDefault();
    openModal(template);
  });
}

function openModal(template) {
  if (document.body.classList.contains('is-modal-open')) return;

  const fragment = template.content.cloneNode(true);
  const backdrop = fragment.querySelector('[data-modal="backdrop"]');
  const dialog = fragment.querySelector('[data-modal="dialog"]');

  if (!backdrop || !dialog) return;

  document.body.appendChild(fragment);
  document.body.classList.add('is-modal-open');

  const focusables = Array.from(backdrop.querySelectorAll(FOCUSABLE));
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  const cleanup = () => {
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', handleKeydown);
    backdrop.remove();
    previousFocus?.focus();
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') cleanup();
    if (event.key === 'Tab') trapFocus(event, focusables);
  };

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop || event.target.closest('[data-modal-dismiss]')) {
      cleanup();
    }
  });

  document.addEventListener('keydown', handleKeydown);
  enhanceForms({ root: backdrop });
  dialog.focus();
}

function trapFocus(event, nodes) {
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  }
}


