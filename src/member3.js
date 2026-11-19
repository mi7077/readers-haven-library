(() => {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    const fields = {
        fullName: { input: document.querySelector('#full-name'), error: document.querySelector('#full-name-error'), message: 'Please enter your full name.' },
        email: { input: document.querySelector('#email'), error: document.querySelector('#email-error'), message: 'Please enter a valid email address.' },
        subject: { input: document.querySelector('#subject'), error: document.querySelector('#subject-error'), message: 'Please enter a subject.' },
        message: { input: document.querySelector('#message'), error: document.querySelector('#message-error'), message: 'Please write at least 10 characters.' }
    };
    const status = document.querySelector('#form-status');
    function validate() {
        let valid = true;
        Object.values(fields).forEach(({ input, error, message }) => {
            let errorMessage = '';
            if (!input.value.trim()) errorMessage = message;
            if (input === fields.email.input && input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) errorMessage = message;
            if (input === fields.message.input && input.value.trim() && (input.value.trim().length < 10 || input.value.trim().length > 1000)) errorMessage = 'Message must be between 10 and 1000 characters.';
            error.textContent = errorMessage;
            input.setAttribute('aria-invalid', String(Boolean(errorMessage)));
            if (errorMessage) valid = false;
        });
        return valid;
    }
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.textContent = '';
        status.className = 'form-status';
        if (!validate()) { status.textContent = 'Please review the highlighted fields.'; status.classList.add('error'); const firstError = Object.values(fields).find(({ input }) => input.getAttribute('aria-invalid') === 'true'); firstError?.input.focus(); return; }
        status.textContent = 'Thank you! Your message has been received for demonstration purposes.';
        status.classList.add('success');
        form.reset();
        Object.values(fields).forEach(({ input }) => input.removeAttribute('aria-invalid'));
    });
    Object.values(fields).forEach(({ input }) => input.addEventListener('blur', validate));
})();
