// ===== COPY TO CLIPBOARD FUNCTIONS =====

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      html: `<div class="swal-custom-container">
               <div class="swal-text-box">
                 ${text}
               </div>
               <p class="swal-p-text">
                 ✅ Successfully copied to clipboard
               </p>
             </div>`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: 'rounded-popup'
      }
    });
  });
}

function copyLocation() {
  navigator.clipboard.writeText("Karachi, Pakistan").then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Address Copied!',
      text: 'Karachi, Pakistan saved to clipboard',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: '#fff',
      iconColor: '#0078ff',
      customClass: { popup: 'rounded-popup' }
    });
  });
}

// ===== FORM VALIDATION & SUBMISSION =====

document.addEventListener('DOMContentLoaded', function () {
  // Form elements
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitBtn');

  // Validation patterns
  const patterns = {
    name: /^[A-Za-z\s]{3,40}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[\+]?[0-9\s\-\(\)]{10,15}$/
  };

  // Form state tracking
  let formState = {
    name: { valid: false, touched: false },
    email: { valid: false, touched: false },
    phone: { valid: false, touched: false },
    message: { valid: false, touched: false }
  };

  // Validation functions
  function validateName() {
    const value = nameInput.value.trim();
    const isValid = patterns.name.test(value);
    updateFieldState('name', isValid);
    return isValid;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const isValid = patterns.email.test(value);
    updateFieldState('email', isValid);
    return isValid;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const isValid = patterns.phone.test(value);
    updateFieldState('phone', isValid);
    return isValid;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    const isValid = value.length >= 10 && value.length <= 500;
    updateFieldState('message', isValid);
    return isValid;
  }

  function updateFieldState(fieldName, isValid) {
    const field = document.getElementById(fieldName);
    const group = field.closest('.form-group');
    formState[fieldName].valid = isValid;

    group.classList.remove('valid', 'invalid');

    if (formState[fieldName].touched) {
      group.classList.add(isValid ? 'valid' : 'invalid');
    }

    updateFormStatus();
  }

  function updateCharCounter() {
    const length = messageInput.value.length;
    charCount.textContent = length;
    const counter = charCount.closest('.char-counter');

    counter.classList.remove('limit-warning', 'limit-exceeded');

    if (length > 450) counter.classList.add('limit-warning');
    if (length > 500) {
      counter.classList.add('limit-exceeded');
      validateMessage();
    }
  }

  function updateFormStatus() {
    const allValid = Object.values(formState).every(field => field.valid);
    const anyTouched = Object.values(formState).some(field => field.touched);

    form.classList.remove('form-valid', 'form-invalid');

    if (anyTouched) {
      form.classList.add(allValid ? 'form-valid' : 'form-invalid');
      submitBtn.disabled = !allValid;
    }
  }

  function resetForm() {
    form.reset();
    form.classList.remove('form-valid', 'form-invalid');

    // Reset form state
    Object.keys(formState).forEach(key => {
      formState[key] = { valid: false, touched: false };
    });

    // Reset UI
    submitBtn.innerHTML = 'Send Message';
    submitBtn.disabled = false;
    updateCharCounter();

    // Clear validation states
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('valid', 'invalid');
    });
  }

  // Event listeners for validation
  nameInput.addEventListener('input', () => {
    formState.name.touched = true;
    validateName();
  });

  emailInput.addEventListener('input', () => {
    formState.email.touched = true;
    validateEmail();
  });

  phoneInput.addEventListener('input', () => {
    formState.phone.touched = true;
    validatePhone();
  });

  messageInput.addEventListener('input', () => {
    formState.message.touched = true;
    updateCharCounter();
    validateMessage();
  });

  // Blur events
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  messageInput.addEventListener('blur', validateMessage);

  // Initialize
  updateCharCounter();

  // ===== FORM SUBMISSION HANDLER =====

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    formState.name.touched = true;
    formState.email.touched = true;
    formState.phone.touched = true;
    formState.message.touched = true;

    validateName();
    validateEmail();
    validatePhone();
    validateMessage();

    if (Object.values(formState).every(field => field.valid)) {
      const name = nameInput.value;
      const email = emailInput.value;

      // Show loading
      Swal.fire({
        title: '<i class="fa-solid fa-paper-plane fa-bounce"></i> Sending Message...',
        html: `
                    <div style="text-align: center; margin: 15px 0;">
                        <div class="swal2-loader"></div>
                        <p style="margin-top: 15px; color: #666;">Delivering your message</p>
                    </div>
                `,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading()
      });

      // Send via EmailJS
      emailjs.sendForm('service_t49722n', 'template_kwsjlnb', this)
        .then(() => {
          // Success
          Swal.fire({
            title: '<i class="fa-solid fa-circle-check" style="color: #2ecc71;"></i> Message Sent!',
            html: `
                            <div style="text-align: left; padding: 10px; background: #f8f9fa; border-radius: 10px; margin: 15px 0;">
                                <p style="margin: 8px 0;"><i class="fa-solid fa-user" style="color: #0078ff; width: 20px;"></i> <strong>From:</strong> ${name || 'You'}</p>
                                <p style="margin: 8px 0;"><i class="fa-solid fa-envelope" style="color: #0078ff; width: 20px;"></i> <strong>Email:</strong> ${email || 'Your email'}</p>
                                <p style="margin: 8px 0;"><i class="fa-solid fa-clock" style="color: #0078ff; width: 20px;"></i> <strong>Response:</strong> Within 24 hours</p>
                            </div>
                            <p style="color: #555; font-size: 15px;">I'll review your message and respond soon.</p>
                        `,
            icon: 'success',
            confirmButtonText: '<i class="fa-solid fa-thumbs-up"></i> Got it!',
            confirmButtonColor: '#0078ff',
            showCloseButton: true
          });

          // Reset form
          resetForm();
        }, (error) => {
          // Error handling
          Swal.fire({
            title: 'Oops!',
            text: 'Email not sent. Please try again.',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
          });
          console.error('EmailJS Error:', error);
        });
    }
  });

  // ===== FAQ TOGGLE FUNCTIONALITY =====

  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');

      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });

      // Toggle current FAQ
      item.classList.toggle('active', !isActive);
    });
  });

  // Open first FAQ by default
  if (faqQuestions.length > 0) {
    faqQuestions[0].parentElement.classList.add('active');
  }
});