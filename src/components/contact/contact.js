import { selectAll } from '../../js/utils/dom.js';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function initContact(root = document) {
  enhanceForms({ root });
}

export function enhanceForms({ root = document } = {}) {
  const forms = root.querySelectorAll('[data-component="contact-form"]');
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
        phone: form.elements.phone,
        role: form.elements.role,
        website: form.elements.website,
        gdpr: form.elements.gdpr,
      };

      const errors = {
        name: form.querySelector('[data-error-for="name"]'),
        email: form.querySelector('[data-error-for="email"]'),
        phone: form.querySelector('[data-error-for="phone"]'),
      };

      // Hata mesajlarını temizle
      Object.values(errors).forEach((node) => {
        if (node) {
          node.textContent = '';
          node.classList.remove('active');
        }
      });

      const payload = {
        name: (fields.name?.value || '').trim(),
        email: (fields.email?.value || '').trim(),
        phone: (fields.phone?.value || '').trim(),
        role: fields.role?.value || '',
        website: (fields.website?.value || '').trim(),
        gdpr: Boolean(fields.gdpr?.checked),
      };

      let valid = true;

      // İsim kontrolü
      if (!payload.name && errors.name) {
        errors.name.textContent = 'İsim gerekli.';
        errors.name.classList.add('active');
        valid = false;
      }

      // E-posta kontrolü
      if ((!payload.email || !EMAIL_PATTERN.test(payload.email)) && errors.email) {
        errors.email.textContent = 'Geçerli e-posta girin.';
        errors.email.classList.add('active');
        valid = false;
      }

      // Telefon kontrolü (örnek: en az 10 haneli olmalı)
      const PHONE_PATTERN = /^[0-9]{10,}$/;
      if ((!payload.phone || !PHONE_PATTERN.test(payload.phone)) && errors.phone) {
        errors.phone.textContent = 'Geçerli telefon numarası girin.';
        errors.phone.classList.add('active');
        valid = false;
      }

      // GDPR kontrolü
      if (!payload.gdpr) {
        alert('Kişisel veri onayı gerekli.');
        valid = false;
      }

      // Honeypot kontrolü
      if (!valid || payload.website !== '') return;

      // ✅ Netlify Forms’a POST
      if (submitBtn) {
        submitBtn.disabled = true;
        const previousLabel = submitBtn.textContent;
        submitBtn.textContent = 'Gönderiliyor...';

        try {
          const formData = new FormData(form);
          await fetch("/", {
            method: "POST",
            body: formData,
          });

          const notice = document.createElement('div');
          notice.className = 'c-form__notice';
          notice.setAttribute('role', 'status');
          notice.setAttribute('aria-live', 'polite');
          notice.textContent = 'Teşekkürler! Kaydınız Netlify Forms’a iletildi.';
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
