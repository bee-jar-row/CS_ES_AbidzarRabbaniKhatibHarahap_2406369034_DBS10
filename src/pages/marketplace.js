import * as api from '../api.js';
import { showToast } from '../components/toast.js';

const CS10_ASSETS = {
    'asus rog swift 27 monitor': '/assets_cs10/ASUSROGSwift 27Monitor.webp',
    'benq zowie xl2546k monitor': '/assets_cs10/BenQZowieXL2546KMonitor.webp',
    'corsair k70 rgb keyboard': '/assets_cs10/CorsairK70RGBKeyboard.webp',
    'dualsense ps5 controller': '/assets_cs10/DualSensePS5Controller.webp',
    'elgato stream deck': '/assets_cs10/Elgato_Stream_Deck.webp',
    'fifa 24 ps5': '/assets_cs10/FIFA24_PS5.webp',
    'fifa 24': '/assets_cs10/FIFA24_PS5.webp',
    'ghost of tsushima ps4': '/assets_cs10/GhostofTsushima_PS4.webp',
    'ghost of tsushima': '/assets_cs10/GhostofTsushima_PS4.webp',
    'hogwarts legacy ps5': '/assets_cs10/HogwartsLegacyPS5.webp',
    'hogwarts legacy': '/assets_cs10/HogwartsLegacyPS5.webp',
    'hyperx alloy origins keyboard': '/assets_cs10/HyperXAlloyOriginsKeyboard.webp',
    'kingston fury 16gb ram': '/assets_cs10/KingstonFury16GBRAM.webp',
    'nvidia rtx 4060 gpu': '/assets_cs10/NVIDIARTX4060GPU.webp',
    'razer viper ultimate mouse': '/assets_cs10/Razer-Viper-Ultimate-Mouse-5.webp',
    'razer deathadder v3 mouse': '/assets_cs10/RazerDeathAdderV3Mouse.webp',
    'samsung 980 pro 1tb ssd': '/assets_cs10/Samsung980Pro1TBSSD.webp',
    'spider-man 2 ps5': '/assets_cs10/Spider-Man2PS5.webp',
    'spider-man 2': '/assets_cs10/Spider-Man2PS5.webp',
    'steelseries arctis nova pro headset': '/assets_cs10/SteelSeriesArctisNovaProHeadset.webp',
    'the last of us part ii ps4': '/assets_cs10/TheLastofUsPartIIPS4.webp',
    'the last of us part ii': '/assets_cs10/TheLastofUsPartIIPS4.webp',
    'xbox elite controller': '/assets_cs10/Xbox EliteController.webp',
    'zelda tears of the kingdom switch': '/assets_cs10/ZeldaTearsoftheKingdomSwitch.webp',
    'zelda tears': '/assets_cs10/ZeldaTearsoftheKingdomSwitch.webp',
    'red dead redemption 2 ps4': '/assets_cs10/reddeaddetemption2_ps4.webp',
    'red dead redemption 2': '/assets_cs10/reddeaddetemption2_ps4.webp',
    'secretlab': '/assets_cs10/secretlabchair1-2.webp',
    'laptop': '/assets_cs10/laptop.webp',
    'mouse': '/assets_cs10/mouse.webp',
    'keyboard': '/assets_cs10/keyboard.webp',
    'monitor': '/assets_cs10/monitor.webp',
    'headset': '/assets_cs10/logitech-g-pro-x-wireless-gaming-headset.webp'
};

const ITEM_EMOJIS = {
    laptop: '💻',
    mouse: '🖱️',
    keyboard: '⌨️',
    monitor: '🖥️',
    headset: '🎧',
    controller: '🎮',
    dualsense: '🎮',
    chair: '🪑',
    gpu: '🔥',
    rtx: '🔥',
    ram: '🧠',
    ssd: '💾',
    'stream deck': '🖲️',
    default: '🕹️',
};

const GAME_COVERS = {
    'god of war ragnarok': 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
    'elden ring': 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png',
    'the last of us part ii': 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/ae84720b553c4ce943e9c342621b60f10ca6b0c72f1f5467.png',
    'cyberpunk 2077': 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png',
    'fifa 24': 'https://image.api.playstation.com/vulcan/ap/rnd/202307/0710/35037678e29724a87d962bb3e5a0e36402e234e4e0e898a3.png',
    'spider-man 2': 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1301/c2eb7ecf34ead3e72840fa4c08978eb8d36b8092a498a498.png',
    'zelda tears': 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000053332/8a91571c2e1503b43495f45e8ff226e6c43efc7f1d2f5c5c91c0abe9a2133e60',
    'red dead redemption 2': 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB0hitbMct.png',
    'hogwarts legacy': 'https://image.api.playstation.com/vulcan/ap/rnd/202208/0921/dR9KPRINT1LoE0pZHDRGKKJy.png',
    'ghost of tsushima': 'https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/niMUubpU9y1PnFGKlSJNODIx.png',
};

function getItemDisplay(name) {
    const lower = name.toLowerCase();
    for (const [key, url] of Object.entries(CS10_ASSETS)) {
        if (lower.includes(key)) return { type: 'image', value: url };
    }
    for (const [key, url] of Object.entries(GAME_COVERS)) {
        if (lower.includes(key)) return { type: 'image', value: url };
    }
    for (const [key, emoji] of Object.entries(ITEM_EMOJIS)) {
        if (key !== 'default' && lower.includes(key)) return { type: 'emoji', value: emoji };
    }
    return { type: 'emoji', value: ITEM_EMOJIS.default };
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
}

export function renderMarketplace() {
    const container = document.getElementById('page-content');
    container.innerHTML = `
    <div class="marketplace-page page-enter">
      <div class="marketplace-header">
        <h1 class="marketplace-header__title">Find Your Next <span>Gear</span></h1>
        <p class="marketplace-header__subtitle">Browse premium second-hand gaming equipment from trusted sellers</p>
      </div>
      <div class="marketplace-controls">
        <div class="search-box">
          <span class="search-box__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input type="text" id="search-input" placeholder="Search gaming gear..." />
        </div>
        <select class="sort-select" id="sort-select">
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="stock-desc">Stock: Most</option>
        </select>
      </div>
      <div class="items-grid" id="items-grid">
        ${skeletonCards(8)}
      </div>
    </div>
  `;

    loadItems();

    document.getElementById('search-input').addEventListener('input', debounce(filterAndSort, 250));
    document.getElementById('sort-select').addEventListener('change', filterAndSort);
}

let allItems = [];

async function loadItems() {
    try {
        const res = await api.getAllItems();
        allItems = res.payload || [];
        filterAndSort();
        initScrollReveal();
    } catch (err) {
        showToast('Failed to load items', 'error');
        document.getElementById('items-grid').innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">😵</div>
        <p class="empty-state__text">Could not load items. Is the backend running?</p>
      </div>
    `;
    }
}

function filterAndSort() {
    const query = (document.getElementById('search-input')?.value || '').toLowerCase();
    const sort = document.getElementById('sort-select')?.value || 'name-asc';

    let items = allItems.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    items.sort((a, b) => {
        switch (sort) {
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'stock-desc': return b.stock - a.stock;
            default: return 0;
        }
    });

    renderItems(items);
}

function renderItems(items) {
    const grid = document.getElementById('items-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state__icon">🔍</div>
        <p class="empty-state__text">No items found</p>
      </div>
    `;
        return;
    }

    grid.innerHTML = items.map((item, i) => {
        const stockClass = item.stock === 0 ? 'out' : item.stock <= 5 ? 'low' : '';
        const stockText = item.stock === 0 ? 'Out of stock' : `${item.stock} in stock`;
        const display = getItemDisplay(item.name);
        const imageContent = display.type === 'image'
            ? `<img class="item-cover" src="${display.value}" alt="${item.name}" onerror="this.parentElement.innerHTML='<span class=\\'item-emoji\\'>🎮</span>'" />`
            : `<span class="item-emoji">${display.value}</span>`;
        return `
      <div class="item-card reveal" style="animation-delay: ${i * 60}ms" data-id="${item.id}">
        <div class="item-card__image${display.type === 'image' ? ' has-cover' : ''}">
          ${imageContent}
        </div>
        <div class="item-card__body">
          <h3 class="item-card__name">${item.name}</h3>
          <p class="item-card__stock ${stockClass}">${stockText}</p>
          <div class="item-card__footer">
            <span class="item-card__price">${formatPrice(item.price)}</span>
            <span class="item-card__action">${item.stock > 0 ? 'View →' : 'Sold Out'}</span>
          </div>
        </div>
      </div>
    `;
    }).join('');

    grid.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            location.hash = `#/item/${id}`;
        });
    });

    requestAnimationFrame(() => {
        grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function skeletonCards(count) {
    return Array(count).fill('<div class="skeleton skeleton-card"></div>').join('');
}

function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}
