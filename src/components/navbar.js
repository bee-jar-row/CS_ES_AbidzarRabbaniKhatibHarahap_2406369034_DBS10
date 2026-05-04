import { getAuth, onAuthChange } from '../main.js';

export function renderNavbar() {
    const nav = document.getElementById('navbar');
    nav.className = 'navbar';
    update();
    onAuthChange(update);


    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    });

    function update() {
        const auth = getAuth();
        const hash = location.hash || '#/marketplace';

        const linkClass = (route) =>
            `navbar__link${hash === route ? ' active' : ''}`;

        let authLinks = '';
        if (auth) {
            authLinks = `
        <a href="#/profile" class="${linkClass('#/profile')}">Profile</a>
        <a href="#/transactions" class="${linkClass('#/transactions')}">History</a>
        <button class="navbar__auth-btn logout-btn" id="logout-btn">Logout</button>
      `;
        } else {
            authLinks = `
        <a href="#/login" class="navbar__auth-btn">Sign In</a>
      `;
        }

        nav.innerHTML = `
      <a href="#/marketplace" class="navbar__logo">
        <span class="navbar__logo-icon">🎮</span>
        <span>Gear<span class="navbar__logo-accent">Vault</span></span>
      </a>
      <div class="navbar__links">
        <a href="#/marketplace" class="${linkClass('#/marketplace')}">Marketplace</a>
        ${authLinks}
      </div>
    `;

        const logoutBtn = nav.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('gv_token');
                localStorage.removeItem('gv_user');
                window.dispatchEvent(new Event('authchange'));
                location.hash = '#/login';
            });
        }
    }
}
