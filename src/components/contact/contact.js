import { selectAll } from '../../js/utils/dom.js';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function initContact(root = document) {
  enhanceForms({ root });
}

export function enhanceForms({ root = document } = {}) {
  const forms = selectAll('[data-component="contact-form"]', root);
  if (!forms.length) return;

  forms.forEach((form) => {
    if (form.dataset.enhanced === 'true') return;
    form.dataset.enhanced = 'true';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const fields = {
        name: form.elements.name,
        email: form.elements.email,
        role: form.elements.role,
        website: form.elements.website,
        gdpr: form.elements.gdpr,
      };

      const errors = {
        name: form.querySelector('[data-error-for="name"]'),
        email: form.querySelector('[data-error-for="email"]'),
      };

      Object.values(errors).forEach((node) => {
        if (node) node.textContent = '';
      });

      const payload = {
        name: (fields.name?.value || '').trim(),
        email: (fields.email?.value || '').trim(),
        role: fields.role?.value || '',
        website: (fields.website?.value || '').trim(),
        gdpr: Boolean(fields.gdpr?.checked),
      };

      let valid = true;
      if (!payload.name && errors.name) {
        errors.name.textContent = 'İsim gerekli.';
        valid = false;
      }

      if ((!payload.email || !EMAIL_PATTERN.test(payload.email)) && errors.email) {
        errors.email.textContent = 'Geçerli e-posta girin.';
        valid = false;
      }

      if (!payload.gdpr) {
        alert('Kişisel veri onayı gerekli.');
        valid = false;
      }

      if (!valid || payload.website !== '') return;

      if (submitBtn) {
        submitBtn.disabled = true;
        const previousLabel = submitBtn.textContent;
        submitBtn.textContent = 'Gönderiliyor...';

        try {
          await new Promise((resolve) => setTimeout(resolve, 800));
          const notice = document.createElement('div');
          notice.className = 'c-form__notice';
          notice.setAttribute('role', 'status');
          notice.setAttribute('aria-live', 'polite');
          notice.textContent = 'Teşekkürler! Kaydınız alındı (simüle).';
          form.appendChild(notice);
          form.reset();
        } catch (error) {
          console.error('Form submit error', error);
          alert('Gönderim sırasında hata oluştu. Lütfen tekrar deneyin.');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = previousLabel || 'Gönder';
        }
      }
    });
  });
}

