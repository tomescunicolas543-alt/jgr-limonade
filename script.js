const products = [
  {
    id: 1,
    name: 'Limonada Verde',
    flavor: 'Lime',
    tag: 'Natural',
    description: 'Lămâie verde, mentă și ghimbir cu un final fresh și energetic.',
    price: 16,
    color: '#9fe7a8',
    type: 'natural',
    image:
      'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Citrus Sunset',
    flavor: 'Sun',
    tag: '18+',
    description: 'Versiune elegantă cu vodka, orange și o notă de sirop de soc.',
    price: 29,
    color: '#f6bf6b',
    type: 'alcoholic',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Berry Basil',
    flavor: 'Berry',
    tag: 'Natural',
    description: 'Fructe de pădure, busuioc și lime pentru un gust fin și vibrant.',
    price: 18,
    color: '#f3b9bf',
    type: 'natural',
    image:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Jaguar Punch',
    flavor: 'JGR',
    tag: '18+',
    description: 'Cocktail puternic cu mură, lime și un echilibru tropical seducător.',
    price: 35,
    color: '#dc6a5e',
    type: 'alcoholic',
    image:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Mango Mint',
    flavor: 'Mango',
    tag: 'Natural',
    description: 'Mango tropical, mentă proaspătă și aciditate crocantă din lime.',
    price: 20,
    color: '#ffc66b',
    type: 'natural',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Love Island',
    flavor: 'Love',
    tag: '18+',
    description: 'Limonadă simplă, sirop de soc și un cocktail ușor cu note citrus.',
    price: 30,
    color: '#f1d36d',
    type: 'alcoholic',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'Cocos Limonadă',
    flavor: 'Cocos',
    tag: 'Oferta de luni',
    description: 'Lămâie naturală, fără coloranți artificiali. Oferta specială este disponibilă doar luni.',
    price: 18,
    color: '#f5d84f',
    type: 'natural',
    image: 'assets/cocos-limonada.png',
    availableDay: 1,
  },
  {
    id: 8,
    name: 'Bambolina Lemonade',
    flavor: 'Berry',
    tag: '18+',
    description: 'Limonadă cu căpșuni, ghimbir și felii proaspete de căpșună.',
    price: 35,
    color: '#f3a6ad',
    type: 'alcoholic',
    image:
      'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80',
  },
];

const cartStorageKey = 'jgr-limonade-cart';

function loadCart() {
  const savedCart = sessionStorage.getItem(cartStorageKey);

  if (!savedCart) return [];

  try {
    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      throw new TypeError('Datele salvate pentru coș nu sunt o listă.');
    }

    return parsedCart;
  } catch (error) {
    console.error('Coșul salvat nu a putut fi citit.', error);
    return [];
  }
}

function saveCart() {
  try {
    sessionStorage.setItem(cartStorageKey, JSON.stringify(cart));
  } catch (error) {
    console.error('Coșul nu a putut fi păstrat între pagini.', error);
  }
}

const cart = loadCart();
let selectedDeliveryMethod = 'wolt';
let selectedCategory = 'all';

const productGrid = document.querySelector('#productGrid');
const cartList = document.querySelector('#cartList');
const cartCount = document.querySelector('#cartCount');
const cartBadge = document.querySelector('#cartBadge');
const subtotalEl = document.querySelector('#subtotal');
const shippingEl = document.querySelector('#shipping');
const totalEl = document.querySelector('#total');
const toast = document.querySelector('#toast');
const checkoutBtn = document.querySelector('#checkoutBtn');
const cartPanel = document.querySelector('.cart-panel');
const cartOverlay = document.querySelector('#cartOverlay');
const cartToggleButtons = document.querySelectorAll('[data-cart-toggle]');
const deliveryMethodButtons = document.querySelectorAll('[data-delivery-method]');
const deliveryAddressInput = document.querySelector('#deliveryAddress');
const customerPhoneInput = document.querySelector('#customerPhone');
const dwellingTypeSelect = document.querySelector('#dwellingType');
const deliveryDetails = document.querySelector('#deliveryDetails');
const apartmentDetails = document.querySelector('#apartmentDetails');
const houseDetails = document.querySelector('#houseDetails');
const catalogTitle = document.querySelector('#catalogTitle');
const categoryButtons = document.querySelectorAll('[data-category]');
const mondayOfferStatus = document.querySelector('#mondayOfferStatus');

const categoryTitles = {
  all: 'Naturală și cu alcool, pentru orice moment.',
  natural: 'Limonade naturale. Proaspete, energizante și pure.',
  alcoholic: 'Limonade 18+. Vibe tropicală, premium și cu personalitate.',
};

const slides = Array.from(document.querySelectorAll('.story-slide'));
const slideDots = Array.from(document.querySelectorAll('.slider-dot'));
const prevSlideBtn = document.querySelector('.slider-arrow.prev');
const nextSlideBtn = document.querySelector('.slider-arrow.next');
let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });

  slideDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });
}

if (slides.length) {
  prevSlideBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextSlideBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  slideDots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => showSlide(dotIndex));
  });

  window.setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4500);
}

function formatCurrency(value) {
  return `${value.toFixed(2)} RON`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

function toggleCart(forceOpen) {
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !cartPanel.classList.contains('is-open');
  cartPanel.classList.toggle('is-open', shouldOpen);
  cartOverlay.classList.toggle('is-visible', shouldOpen);
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countText = String(totalItems);
  cartCount.textContent = countText;
  cartBadge.textContent = countText;
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    showToast('Produsul selectat nu este disponibil');
    return;
  }

  if (product.availableDay !== undefined && new Date().getDay() !== product.availableDay) {
    showToast('Oferta Cocos este disponibilă doar luni');
    return;
  }

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast('Produs adăugat în coș');
  toggleCart(true);
}

function updateQuantity(productId, delta) {
  const item = cart.find((product) => product.id === productId);

  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    const index = cart.findIndex((product) => product.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
}

function getVisibleProducts() {
  if (selectedCategory === 'all') {
    return products;
  }

  return products.filter((product) => product.type === selectedCategory);
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  catalogTitle.textContent = categoryTitles[selectedCategory] || categoryTitles.all;

  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === selectedCategory;
    button.classList.toggle('active', isActive);
  });

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card product-card-${product.type}" data-type="${product.type}">
          ${product.availableDay !== undefined ? '<span class="offer-ribbon">Oferta de luni</span>' : ''}
          <div class="product-visual" style="background: linear-gradient(180deg, rgba(255, 214, 92, 0.32), rgba(25, 130, 139, 0.15));">
            <div class="product-bottle" style="background: linear-gradient(180deg, rgba(255,255,255,0.68), ${product.color});">
              <img class="bottle-image" src="${product.image}" alt="" />
            </div>
            <img class="product-photo" src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-content">
            <div class="product-header">
              <h3 class="product-title">${product.name}</h3>
              <span class="tag">${product.tag}</span>
            </div>
            <p class="product-text">${product.description}</p>
            <div class="product-meta">
              <span class="price">${formatCurrency(product.price)}</span>
              ${
                product.availableDay !== undefined && new Date().getDay() !== product.availableDay
                  ? '<button class="add-btn" type="button" disabled>Doar luni</button>'
                  : `<button class="add-btn" type="button" data-product-id="${product.id}">Adaugă</button>`
              }
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.productId));
    });
  });
}

function updateMondayOfferStatus() {
  if (!mondayOfferStatus) return;

  mondayOfferStatus.textContent = new Date().getDay() === 1
    ? 'Disponibilă astăzi'
    : 'Revine luni • oferta este momentan închisă';
}

function renderCart() {
  saveCart();
  updateCartBadge();

  if (!cart.length) {
    cartList.innerHTML = '<div class="empty-cart">Coșul este gol. Alege o limonadă proaspătă.</div>';
    subtotalEl.textContent = '0.00 RON';
    shippingEl.textContent = '0.00 RON';
    totalEl.textContent = '0.00 RON';
    return;
  }

  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = itemTotal > 0 ? 9 : 0;
  const total = itemTotal + shipping;

  cartList.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <div class="item-price">${formatCurrency(item.price)} / sticlă</div>
            ${item.details ? `<div class="item-price">${item.details}</div>` : ''}
            <div class="item-controls">
              <div class="qty-controls">
                <button class="qty-btn" type="button" data-action="decrease" data-product-id="${item.id}" aria-label="Scade cantitate">−</button>
                <span class="qty-label">${item.quantity}</span>
                <button class="qty-btn" type="button" data-action="increase" data-product-id="${item.id}" aria-label="Crește cantitate">+</button>
              </div>
            </div>
          </div>
          <strong>${formatCurrency(item.price * item.quantity)}</strong>
        </div>
      `
    )
    .join('');

  updateCartBadge();
  subtotalEl.textContent = formatCurrency(itemTotal);
  shippingEl.textContent = formatCurrency(shipping);
  totalEl.textContent = formatCurrency(total);

  document.querySelectorAll('.qty-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = Number.isNaN(Number(button.dataset.productId))
        ? button.dataset.productId
        : Number(button.dataset.productId);
      const action = button.dataset.action;
      updateQuantity(productId, action === 'increase' ? 1 : -1);
    });
  });
}

checkoutBtn.addEventListener('click', () => {
  if (!cart.length) {
    showToast('Nu există produse în coș');
    return;
  }

  if (cart.some((item) => item.availableDay !== undefined && new Date().getDay() !== item.availableDay)) {
    showToast('Oferta Cocos poate fi comandată doar luni');
    return;
  }

  const phoneDigits = customerPhoneInput.value.replace(/\D/g, '');
  if (phoneDigits.length < 9 || phoneDigits.length > 15) {
    showToast('Introdu un număr de telefon valid');
    customerPhoneInput.focus();
    return;
  }

  if (selectedDeliveryMethod !== 'pickup') {
    if (!deliveryAddressInput.value.trim()) {
      showToast('Introdu adresa de livrare');
      deliveryAddressInput.focus();
      return;
    }

    if (!dwellingTypeSelect.value) {
      showToast('Selectează bloc sau casă');
      dwellingTypeSelect.focus();
      return;
    }

    if (dwellingTypeSelect.value === 'apartment') {
      const buildingNumber = document.querySelector('#buildingNumber');
      const staircase = document.querySelector('#staircase');
      const floor = document.querySelector('#floor');
      const apartmentNumber = document.querySelector('#apartmentNumber');

      if (!buildingNumber.value.trim() || !staircase.value.trim() || !floor.value.trim() || !apartmentNumber.value.trim()) {
        showToast('Completează blocul, scara, etajul și apartamentul');
        [buildingNumber, staircase, floor, apartmentNumber].find((input) => !input.value.trim()).focus();
        return;
      }
    }
  }

  showToast(`Comandă plasată prin ${selectedDeliveryMethod.toUpperCase()}!`);
  cart.length = 0;
  customerPhoneInput.value = '';
  deliveryAddressInput.value = '';
  dwellingTypeSelect.value = '';
  document.querySelector('#buildingNumber').value = '';
  document.querySelector('#staircase').value = '';
  document.querySelector('#floor').value = '';
  document.querySelector('#apartmentNumber').value = '';
  document.querySelector('#houseDetailsInput').value = '';
  updateDeliveryFields();
  renderCart();
  toggleCart(false);
});

cartToggleButtons.forEach((button) => {
  button.addEventListener('click', () => toggleCart());
});

cartOverlay.addEventListener('click', () => toggleCart(false));

deliveryMethodButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedDeliveryMethod = button.dataset.deliveryMethod;
    deliveryMethodButtons.forEach((option) => {
      option.classList.toggle('active', option === button);
    });
    updateDeliveryFields();
  });
});

function updateDeliveryFields() {
  const needsAddress = selectedDeliveryMethod !== 'pickup';
  deliveryDetails.hidden = !needsAddress;
  apartmentDetails.hidden = !needsAddress || dwellingTypeSelect.value !== 'apartment';
  houseDetails.hidden = !needsAddress || dwellingTypeSelect.value !== 'house';
}

dwellingTypeSelect.addEventListener('change', updateDeliveryFields);

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;
    renderProducts();

    if (button.classList.contains('offer-cta')) {
      document.querySelector('#produse').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

renderProducts();
renderCart();
updateMondayOfferStatus();
updateDeliveryFields();

if (new URLSearchParams(window.location.search).get('cart') === 'open') {
  toggleCart(true);
}
