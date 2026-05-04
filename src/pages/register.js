import * as api from '../api.js';
import { showToast } from '../components/toast.js';

export function renderRegister() {
    const container = document.getElementById('page-content');
    container.innerHTML = `
    <div class="auth-page page-enter">
      <div class="auth-card">
        <h1 class="auth-card__title">Join GearVault</h1>
        <p class="auth-card__subtitle">Create your account and start trading</p>
        <form id="register-form" autocomplete="off">
          <div class="form-group">
            <label for="reg-name">Full Name</label>
            <input type="text" id="reg-name" placeholder="John Doe" required />
            <p class="error-text" id="name-error"></p>
          </div>
          <div class="form-group">
            <label for="reg-username">Username</label>
            <input type="text" id="reg-username" placeholder="johndoe" required />
            <p class="error-text" id="username-error"></p>
          </div>
          <div class="form-group">
            <label for="reg-email">Email Address</label>
            <input type="email" id="reg-email" placeholder="you@example.com" required />
            <p class="error-text" id="email-error"></p>
          </div>

          <div class="form-group">
            <label for="reg-password">Password</label>
            <input type="password" id="reg-password" placeholder="Min 8 characters" required />
            <p class="error-text" id="password-error"></p>
          </div>
          <div class="form-group">
            <label for="reg-confirm">Confirm Password</label>
            <input type="password" id="reg-confirm" placeholder="Re-enter password" required />
            <p class="error-text" id="confirm-error"></p>
          </div>
          <button type="submit" class="btn-primary" id="register-btn">
            Create Account
          </button>
        </form>
        <p class="auth-card__footer">
          Already have an account? <a href="#/login">Sign in</a>
        </p>
      </div>
    </div>
  `;

    const form = document.getElementById('register-form');
    const btn = document.getElementById('register-btn');

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = 'var(--accent-primary)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label').style.color = '';
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById('reg-name').value.trim();
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();

        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        let valid = true;
        if (!name) { showFieldError('name', 'Name is required'); valid = false; }
        if (!username) { showFieldError('username', 'Username is required'); valid = false; }
        if (!email) { showFieldError('email', 'Email is required'); valid = false; }
        if (password.length < 8) { showFieldError('password', 'Password must be at least 8 characters'); valid = false; }
        if (password !== confirm) { showFieldError('confirm', 'Passwords do not match'); valid = false; }
        if (!valid) return;

        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span>';

        try {
            await api.register(name, username, email, password);
            showToast('Account created! Please sign in 🎉', 'success');
            setTimeout(() => { location.hash = '#/login'; }, 1200);
        } catch (err) {
            showToast(err.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Create Account';
        }
    });
}

function showFieldError(field, message) {
    const input = document.getElementById(`reg-${field}`);
    const error = document.getElementById(`${field}-error`);
    if (input) input.classList.add('error');
    if (error) {
        error.textContent = message;
        error.classList.add('visible');
    }
}

function clearErrors() {
    document.querySelectorAll('.form-group input').forEach(i => i.classList.remove('error'));
    document.querySelectorAll('.error-text').forEach(e => {
        e.classList.remove('visible');
        e.textContent = '';
    });
}
