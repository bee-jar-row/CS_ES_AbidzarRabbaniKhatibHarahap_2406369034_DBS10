import * as api from '../api.js';
import { showToast } from '../components/toast.js';

export function renderLogin() {
    const container = document.getElementById('page-content');
    container.innerHTML = `
    <div class="auth-page page-enter">
      <div class="auth-card">
        <h1 class="auth-card__title">Welcome back</h1>
        <p class="auth-card__subtitle">Sign in to continue trading gaming gear</p>
        <form id="login-form" autocomplete="off">
          <div class="form-group">
            <label for="login-email">Email Address</label>
            <input type="email" id="login-email" placeholder="you@example.com" required />
            <p class="error-text" id="email-error"></p>
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Enter your password" required />
            <p class="error-text" id="password-error"></p>
          </div>
          <button type="submit" class="btn-primary" id="login-btn">
            Sign In
          </button>
        </form>
        <p class="auth-card__footer">
          Don't have an account? <a href="#/register">Create one</a>
        </p>
      </div>
    </div>
  `;

    const form = document.getElementById('login-form');
    const btn = document.getElementById('login-btn');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        let valid = true;
        if (!email) {
            showFieldError('email', 'Email is required');
            valid = false;
        }
        if (!password) {
            showFieldError('password', 'Password is required');
            valid = false;
        }
        if (!valid) return;

        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span>';

        try {
            const res = await api.login(email, password);
            const { token, user } = res.payload;
            localStorage.setItem('gv_token', token);
            localStorage.setItem('gv_user', JSON.stringify(user));
            window.dispatchEvent(new Event('authchange'));
            showToast('Welcome back! 🎮', 'success');
            setTimeout(() => { location.hash = '#/marketplace'; }, 400);
        } catch (err) {
            showToast(err.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Sign In';
        }
    });

    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = 'var(--accent-primary)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label').style.color = '';
        });
    });
}

function showFieldError(field, message) {
    const input = document.getElementById(`login-${field}`);
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
