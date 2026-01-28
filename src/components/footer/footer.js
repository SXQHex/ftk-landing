import { select } from '../../js/utils/dom.js';

export function initFooter(root = document) {
  const yearNode = select('[data-element="current-year"]', root);
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}


