const firstNameInput    = document.getElementById('first-name');
const lastNameInput     = document.getElementById('last-name');
const emailInput        = document.getElementById('email');
const universitySelect  = document.getElementById('university');
const passwordInput     = document.getElementById('password');
const confirmInput      = document.getElementById('confirm-password');
const signupBtn         = document.getElementById('signup-btn');
const strengthBar       = document.getElementById('strength-bar');
const strengthFill      = document.getElementById('strength-fill');
const strengthLabel     = document.getElementById('strength-label');

const EYE_OPEN   =
  `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;

const EYE_CLOSED =
  `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;

const anonCheck = document.getElementById('anon-check');

if (anonCheck) {
  anonCheck.addEventListener('change', () => {
    const isAnon = anonCheck.checked;

    [firstNameInput, lastNameInput].forEach(input => {
      if (!input) return;

      if (isAnon) {
        input.disabled = true;
        input.value = '';
        input.placeholder = 'Hidden (Anonymous mode)';
        input.closest('.field-group').classList.add('field-disabled');
        clearError(input);
      } else {
        input.disabled = false;
        input.placeholder = input.id === 'first-name' ? 'Thabo' : 'Mokoena';
        input.closest('.field-group').classList.remove('field-disabled');
      }
    });
  });
}

/* PASSWORD VISIBILITY TOGGLE */
document.querySelectorAll('.eye-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    const icon = btn.querySelector('.eye-icon');
    const isHidden = input.type === 'password';

    input.type = isHidden ? 'text' : 'password';
    icon.innerHTML = isHidden ? EYE_CLOSED : EYE_OPEN;
    btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });
});

/* PASSWORD STRENGTH */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

passwordInput.addEventListener('input', () => {
  const pw = passwordInput.value;
  clearError(passwordInput);

  if (!pw) {
    strengthBar.classList.remove('visible');
    strengthLabel.classList.remove('visible');
    return;
  }

  strengthBar.classList.add('visible');
  strengthLabel.classList.add('visible');

  const score = getStrength(pw);

  const levels = [
    { pct: '20%', color: '#e53935', text: 'Very weak', textColor: '#e53935' },
    { pct: '40%', color: '#f57c00', text: 'Weak', textColor: '#f57c00' },
    { pct: '60%', color: '#fdd835', text: 'Fair', textColor: '#b8a000' },
    { pct: '80%', color: '#66bb6a', text: 'Strong', textColor: '#388e3c' },
    { pct: '100%', color: '#2e7d32', text: 'Very strong', textColor: '#2e7d32' },
  ];

  const lvl = levels[Math.max(0, score - 1)] || levels[0];

  strengthFill.style.width = lvl.pct;
  strengthFill.style.background = lvl.color;
  strengthLabel.textContent = lvl.text;
  strengthLabel.style.color = lvl.textColor;
});

/* VALIDATION */
function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function setError(input, message) {
  clearError(input);
  input.classList.add('error');

  const msg = document.createElement('p');
  msg.className = 'error-msg';
  msg.textContent = message;

  const parent = input.closest('.input-wrapper') || input;
  parent.insertAdjacentElement('afterend', msg);
}

function clearError(input) {
  input.classList.remove('error');

  const parent = input.closest('.input-wrapper') || input;

  let next = parent.nextElementSibling;
  while (next && next.classList.contains('error-msg')) {
    const toRemove = next;
    next = next.nextElementSibling;
    toRemove.remove();
  }
}

[firstNameInput, lastNameInput, emailInput, confirmInput].forEach(el => {
  el.addEventListener('input', () => clearError(el));
});

universitySelect.addEventListener('change', () => clearError(universitySelect));
confirmInput.addEventListener('input', () => clearError(confirmInput));

signupBtn.addEventListener('click', () => {
  const firstName = firstNameInput.value.trim();
  const lastName  = lastNameInput.value.trim();
  const email     = emailInput.value.trim();
  const university = universitySelect.value;
  const password  = passwordInput.value;
  const confirm   = confirmInput.value;

  let valid = true;

  if (!anonCheck.checked) {
    if (!firstName) {
      setError(firstNameInput, 'First name is required.');
      valid = false;
    }
    if (!lastName) {
      setError(lastNameInput, 'Last name is required.');
      valid = false;
    }
  }

  if (!email) {
    setError(emailInput, 'Email address is required.');
    valid = false;
  } else if (!isValidEmail(email)) {
    setError(emailInput, 'Please enter a valid email address.');
    valid = false;
  }

  if (!university) {
    setError(universitySelect, 'Please select your university.');
    valid = false;
  }

  if (!password) {
    setError(passwordInput, 'Password is required.');
    valid = false;
  } else if (password.length < 8) {
    setError(passwordInput, 'Password must be at least 8 characters.');
    valid = false;
  }

  if (!confirm) {
    setError(confirmInput, 'Please confirm your password.');
    valid = false;
  } else if (password !== confirm) {
    setError(confirmInput, 'Passwords do not match.');
    valid = false;
  }

  if (!valid) return;

  signupBtn.disabled = true;
  signupBtn.textContent = 'CREATING ACCOUNT…';

  setTimeout(() => {
    signupBtn.disabled = false;
    signupBtn.textContent = 'CREATE MY ACCOUNT';
    alert('🎉 Account created! Welcome to MindCare Hub.');
    window.location.href = 'signin.html';
  }, 1800);
});

[firstNameInput, lastNameInput, emailInput, passwordInput, confirmInput].forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') signupBtn.click();
  });
});