import * as api from '../api.js';
import { showToast } from '../components/toast.js';
import { getAuth } from '../main.js';

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);
}

export function renderProfile() {
    const auth = getAuth();
    const container = document.getElementById('page-content');

    if (!auth) {
        container.innerHTML = `
      <div class="profile-page page-enter">
        <div class="login-required">
          <div class="login-required__icon">🔒</div>
          <p class="login-required__text">Sign in to view your profile</p>
          <button class="btn-primary" onclick="location.hash='#/login'">Sign In</button>
        </div>
      </div>
    `;
        return;
    }

    const user = auth;
    const initials = (user.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    container.innerHTML = `
    <div class="profile-page page-enter">
      <div class="profile-header">
        <div class="profile-avatar">${initials}</div>
        <div class="profile-header__info">
          <h1>${user.name}</h1>
          <p>@${user.username} · ${user.email}</p>
        </div>
      </div>

      <div class="profile-stats" id="profile-stats">
        <div class="profile-stat-card">
          <div class="profile-stat-card__label">Balance</div>
          <div class="profile-stat-card__value balance" id="stat-balance">${formatPrice(user.balance || 0)}</div>
        </div>
        <div class="profile-stat-card">
          <div class="profile-stat-card__label">Total Spent</div>
          <div class="profile-stat-card__value spent" id="stat-spent">
            <div class="skeleton skeleton-line" style="width:100px;height:28px"></div>
          </div>
        </div>
        <div class="profile-stat-card">
          <div class="profile-stat-card__label">Member Since</div>
          <div class="profile-stat-card__value">${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
        </div>
      </div>

      <div class="profile-section">
        <h2 class="profile-section__title">Edit Profile</h2>
        <form class="profile-form" id="profile-form">
          <div class="form-group">
            <label for="edit-name">Full Name</label>
            <input type="text" id="edit-name" value="${user.name || ''}" />
          </div>
          <div class="form-group">
            <label for="edit-username">Username</label>
            <input type="text" id="edit-username" value="${user.username || ''}" />
          </div>
          <div class="form-group">
            <label for="edit-email">Email</label>
            <input type="email" id="edit-email" value="${user.email || ''}" />
          </div>

          <div class="form-group">
            <label for="edit-balance">Balance (IDR)</label>
            <input type="number" id="edit-balance" value="${user.balance || 0}" />
          </div>
          <div class="form-group full-width" style="display:flex;gap:12px;justify-content:flex-end;">
            <button type="submit" class="btn-primary" id="save-btn" style="width:auto;padding:12px 36px;">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;

    loadTotalSpent();

    document.getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('save-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span>';

        try {
            const data = {
                name: document.getElementById('edit-name').value.trim(),
                username: document.getElementById('edit-username').value.trim(),
                email: document.getElementById('edit-email').value.trim(),

                balance: parseInt(document.getElementById('edit-balance').value) || 0,
            };
            const res = await api.updateProfile(user.id, data);
            const updatedUser = { ...user, ...data };
            localStorage.setItem('gv_user', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('authchange'));
            showToast('Profile updated! ✅', 'success');
            btn.disabled = false;
            btn.textContent = 'Save Changes';
        } catch (err) {
            showToast(err.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Save Changes';
        }
    });

    document.querySelectorAll('.profile-form input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = 'var(--accent-primary)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label').style.color = '';
        });
    });
}

async function loadTotalSpent() {
    try {
        const res = await api.getTotalSpent();
        const el = document.getElementById('stat-spent');
        if (el) el.textContent = formatPrice(res.payload?.total_spent || 0);
    } catch {
        const el = document.getElementById('stat-spent');
        if (el) el.textContent = formatPrice(0);
    }
}
