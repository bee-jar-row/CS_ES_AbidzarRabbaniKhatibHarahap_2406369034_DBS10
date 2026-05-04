import * as api from '../api.js';
import { showToast } from '../components/toast.js';
import { getAuth } from '../main.js';

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);
}

export function renderTransactions() {
    const auth = getAuth();
    const container = document.getElementById('page-content');

    if (!auth) {
        container.innerHTML = `
      <div class="transactions-page page-enter">
        <div class="login-required">
          <div class="login-required__icon">🔒</div>
          <p class="login-required__text">Sign in to view your transactions</p>
          <button class="btn-primary" onclick="location.hash='#/login'">Sign In</button>
        </div>
      </div>
    `;
        return;
    }

    container.innerHTML = `
    <div class="transactions-page page-enter">
      <div class="transactions-header">
        <h1>Transaction History</h1>
        <p>View and manage your past purchases</p>
      </div>
      <div class="transaction-list" id="transaction-list">
        ${skeletonTransactions(4)}
      </div>
    </div>
  `;

    loadTransactions();
}

async function loadTransactions() {
    const list = document.getElementById('transaction-list');
    if (!list) return;

    try {
        const res = await api.getTransactionHistory();
        const transactions = res.payload || [];

        if (transactions.length === 0) {
            list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">📦</div>
          <p class="empty-state__text">No transactions yet</p>
        </div>
      `;
            return;
        }

        list.innerHTML = transactions.map((tx, i) => `
      <div class="transaction-item reveal" style="animation-delay: ${i * 80}ms" data-id="${tx.id}">
        <div class="transaction-item__left">
          <span class="transaction-item__name">${tx.item_name || `Item #${tx.item_id}`}</span>
          ${tx.description ? `<span class="transaction-item__desc">"${tx.description}"</span>` : ''}
          <div class="transaction-item__meta">
            <span>Qty: ${tx.quantity}</span>
            <span>·</span>
            <span>${new Date(tx.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        <div class="transaction-item__right">
          <span class="transaction-item__total">${formatPrice(tx.total)}</span>
          <span class="status-badge ${tx.status}">${tx.status}</span>
          ${tx.status === 'pending' ? `<button class="btn-pay" data-txid="${tx.id}">Pay Now</button>` : ''}
        </div>
      </div>
    `).join('');

        requestAnimationFrame(() => {
            list.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        });

        list.querySelectorAll('.btn-pay').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const txId = btn.dataset.txid;
                btn.disabled = true;
                btn.textContent = '...';

                try {
                    await api.payTransaction(txId);
                    showToast('Payment successful! ✅', 'success');
                    loadTransactions();
                } catch (err) {
                    showToast(err.message, 'error');
                    btn.disabled = false;
                    btn.textContent = 'Pay Now';
                }
            });
        });
    } catch (err) {
        list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">😵</div>
        <p class="empty-state__text">Failed to load transactions</p>
      </div>
    `;
        showToast('Failed to load transactions', 'error');
    }
}

function skeletonTransactions(count) {
    return Array(count).fill(`
    <div class="skeleton" style="height:90px;border-radius:var(--radius-lg);margin-bottom:16px;"></div>
  `).join('');
}
