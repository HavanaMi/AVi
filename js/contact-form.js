document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('avi-contact-form');
  const status = document.getElementById('avi-form-status');
  if (!form || !status) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending…';
    status.textContent = 'Sending your message…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      });
      const data = await response.json();
      if (response.ok && (data.success === true || data.success === 'true')) {
        status.textContent = 'Your message was accepted by the form service. Thank you!';
        form.reset();
      } else {
        const message = typeof data.message === 'string' ? data.message : '';
        status.textContent = /activat|confirm.*email/i.test(message)
          ? 'Email activation is required before this form can receive messages. Please email wriviewer@gmail.com directly.'
          : 'Your message could not be sent. Please email wriviewer@gmail.com directly.';
      }
    } catch {
      status.textContent = 'Your message could not be sent. Please email wriviewer@gmail.com directly.';
    } finally {
      button.disabled = false;
      button.textContent = 'Send message';
    }
  });
});
