import '../style.css';
import { renderNavbar } from './components/navbar.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderMarketplace } from './pages/marketplace.js';
import { renderItemDetail } from './pages/itemDetail.js';
import { renderProfile } from './pages/profile.js';
import { renderTransactions } from './pages/transactions.js';

export function getAuth() {
    try {
        const user = localStorage.getItem('gv_user');
        const token = localStorage.getItem('gv_token');
        if (user && token) return JSON.parse(user);
    } catch { }
    return null;
}

const authListeners = [];
export function onAuthChange(fn) {
    authListeners.push(fn);
}

window.addEventListener('authchange', () => {
    authListeners.forEach(fn => fn());
});

function route() {
    const hash = location.hash || '#/marketplace';
    const [path, param] = parseHash(hash);

    switch (path) {
        case '/login':
            renderLogin();
            break;
        case '/register':
            renderRegister();
            break;
        case '/marketplace':
            renderMarketplace();
            break;
        case '/item':
            renderItemDetail(param);
            break;
        case '/profile':
            renderProfile();
            break;
        case '/transactions':
            renderTransactions();
            break;
        default:
            location.hash = '#/marketplace';
            return;
    }

    window.dispatchEvent(new Event('authchange'));
}

function parseHash(hash) {
    const clean = hash.replace('#', '');
    const parts = clean.split('/').filter(Boolean);
    const path = '/' + (parts[0] || 'marketplace');
    const param = parts[1] || null;
    return [path, param];
}

window.addEventListener('hashchange', route);
window.addEventListener('load', () => {
    renderNavbar();
    if (!location.hash) location.hash = '#/marketplace';
    else route();
});
