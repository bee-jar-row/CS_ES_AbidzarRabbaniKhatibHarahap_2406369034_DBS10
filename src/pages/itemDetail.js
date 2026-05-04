import * as api from '../api.js';
import { showToast } from '../components/toast.js';
import { getAuth } from '../main.js';

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
    laptop: '💻', mouse: '🖱️', keyboard: '⌨️', monitor: '🖥️',
    headset: '🎧', controller: '🎮', dualsense: '🎮', chair: '🪑',
    gpu: '🔥', rtx: '🔥', ram: '🧠', ssd: '💾', 'stream deck': '🖲️',
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
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);
}

export function renderItemDetail(id) {
    const container = document.getElementById('page-content');
    container.innerHTML = `
    <div class="detail-page page-enter">
      <div class="detail-back" id="detail-back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Marketplace
      </div>
      <div class="detail-card">
        <div class="detail-card__image skeleton" style="height:300px" id="detail-img"></div>
        <div class="detail-card__body">
          <div class="skeleton skeleton-line" style="width:50%;height:28px;margin-bottom:8px"></div>
          <div class="skeleton skeleton-line short" style="height:14px;margin-bottom:24px"></div>
          <div class="skeleton skeleton-line medium" style="height:50px"></div>
        </div>
      </div>
    </div>
  `;

    document.getElementById('detail-back').addEventListener('click', () => {
        location.hash = '#/marketplace';
    });

    loadItem(id);
}

let currentQuantity = 1;

async function loadItem(id) {
    try {
        const res = await api.getItemById(id);
        const item = res.payload;
        currentQuantity = 1;
        renderDetail(item);
    } catch (err) {
        showToast('Item not found', 'error');
        location.hash = '#/marketplace';
    }
}

function renderDetail(item) {
    const card = document.querySelector('.detail-card');
    if (!card) return;

    const auth = getAuth();
    const stockClass = item.stock === 0 ? 'out' : item.stock <= 5 ? 'low' : '';
    const stockText = item.stock === 0 ? 'Out of stock' : `${item.stock} available`;
    const display = getItemDisplay(item.name);
    const imageContent = display.type === 'image'
        ? `<img class="detail-cover" src="${display.value}" alt="${item.name}" onerror="this.outerHTML='<span style=\\'font-size:6rem\\'>🎮</span>'" />`
        : `<span style="font-size:6rem;filter:drop-shadow(0 4px 20px rgba(0,0,0,0.4))">${display.value}</span>`;

    card.innerHTML = `
    <div class="detail-card__image${display.type === 'image' ? ' has-cover' : ''}">
      ${imageContent}
    </div>
    <div class="detail-card__body">
      <h1 class="detail-card__name">${item.name}</h1>
      <p class="detail-card__id">Item #${item.id} · Listed ${new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>

      <div class="detail-stats">
        <div class="detail-stat">
          <span class="detail-stat__label">Price</span>
          <span class="detail-stat__value price">${formatPrice(item.price)}</span>
        </div>
        <div class="detail-stat">
          <span class="detail-stat__label">Stock</span>
          <span class="detail-stat__value stock ${stockClass}">${stockText}</span>
        </div>
      </div>

      ${auth && item.stock > 0 ? `
        <div class="detail-description">
          <label for="purchase-desc">Note / Description</label>
          <textarea id="purchase-desc" placeholder="Add a note to your order (optional)"></textarea>
        </div>
        <div class="detail-purchase">
          <div class="quantity-control">
            <label>Quantity</label>
            <div class="quantity-control__input">
              <button class="quantity-control__btn" id="qty-minus">−</button>
              <span class="quantity-control__value" id="qty-value">1</span>
              <button class="quantity-control__btn" id="qty-plus">+</button>
            </div>
          </div>
          <div>
            <p class="detail-total">Total</p>
            <p class="detail-total__amount" id="total-amount">${formatPrice(item.price)}</p>
          </div>
          <button class="btn-buy" id="buy-btn">
            Buy Now
          </button>
        </div>
      ` : !auth ? `
        <div class="login-required" style="padding:32px 0">
          <p class="login-required__text">Sign in to purchase this item</p>
          <button class="btn-primary" onclick="location.hash='#/login'" style="max-width:200px">Sign In</button>
        </div>
      ` : `
        <div style="padding:24px 0; color:var(--color-error); font-weight:700;">This item is currently sold out</div>
      `}
    </div>
  `;

    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyValue = document.getElementById('qty-value');
    const totalAmount = document.getElementById('total-amount');
    const buyBtn = document.getElementById('buy-btn');

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                qtyValue.textContent = currentQuantity;
                totalAmount.textContent = formatPrice(item.price * currentQuantity);
            }
        });

        qtyPlus.addEventListener('click', () => {
            if (currentQuantity < item.stock) {
                currentQuantity++;
                qtyValue.textContent = currentQuantity;
                totalAmount.textContent = formatPrice(item.price * currentQuantity);
            }
        });

        buyBtn.addEventListener('click', async () => {
            buyBtn.disabled = true;
            buyBtn.innerHTML = '<span class="spinner"></span>';
            const desc = document.getElementById('purchase-desc')?.value || '';

            try {
                const user = JSON.parse(localStorage.getItem('gv_user'));
                const txRes = await api.createTransaction(user.id, item.id, currentQuantity, desc);
                const txId = txRes.payload.id;

                await api.payTransaction(txId);
                showToast(`Purchase successful! 🎉`, 'success');
                setTimeout(() => location.hash = '#/transactions', 800);
            } catch (err) {
                showToast(err.message, 'error');
                buyBtn.disabled = false;
                buyBtn.textContent = 'Buy Now';
            }
        });
    }
}
