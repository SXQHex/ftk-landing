import '../scss/main.scss';
import { initButtons } from '../components/button/button.js';
import { initContentCards } from '../components/content-card/content-card.js';
import { initHeader } from '../components/header/header.js';
import { initHero } from '../components/hero/hero.js';
import { initProgram } from '../components/program/program.js';
import { initAtelier } from '../components/atelier/atelier.js';
import { initContact } from '../components/contact/contact.js';
import { initModal } from '../components/modal/modal.js';
import { initFooter } from '../components/footer/footer.js';

function init() {
  initButtons();
  initContentCards();
  initHeader();
  initHero();
  initProgram();
  initAtelier();
  initContact();
  initModal();
  initFooter();
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
