const customFlavorInputs = document.querySelectorAll('input[name="customFlavor"]');
const customAlcoholInputs = document.querySelectorAll('input[name="customAlcohol"]');
const customAlcoholDetails = document.querySelector('#customAlcoholDetails');
const customSpiritSelect = document.querySelector('#customSpirit');
const customAgeConfirm = document.querySelector('#customAgeConfirm');
const customSummaryTitle = document.querySelector('#customSummaryTitle');
const customSummaryDetails = document.querySelector('#customSummaryDetails');
const customPrice = document.querySelector('#customPrice');
const addCustomDrinkButton = document.querySelector('#addCustomDrink');
const customStatus = document.querySelector('#customStatus');
const cartStorageKey = 'jgr-limonade-cart';

function getCustomDrinkSelection() {
  const flavors = Array.from(customFlavorInputs)
    .filter((input) => input.checked)
    .map((input) => input.value);
  const hasAlcohol = document.querySelector('input[name="customAlcohol"]:checked').value === 'alcohol';
  const price = 16 + Math.max(0, flavors.length - 1) * 3 + (hasAlcohol ? 10 : 0);

  return { flavors, hasAlcohol, price };
}

function updateCustomDrinkPreview() {
  const { flavors, hasAlcohol, price } = getCustomDrinkSelection();

  customAlcoholDetails.hidden = !hasAlcohol;
  customSummaryTitle.textContent = flavors.length
    ? flavors.join(' + ')
    : 'Alege prima aromă';
  customSummaryDetails.textContent = hasAlcohol
    ? `${customSpiritSelect.value} · 18+`
    : 'Limonadă fără alcool';
  customPrice.textContent = `${price.toFixed(2)} RON`;
  addCustomDrinkButton.disabled = flavors.length === 0 || (hasAlcohol && !customAgeConfirm.checked);
  customStatus.textContent = 'Băuturile cu alcool sunt disponibile exclusiv persoanelor de peste 18 ani.';
}

function addCustomDrinkToCart() {
  const { flavors, hasAlcohol, price } = getCustomDrinkSelection();

  if (!flavors.length) {
    customStatus.textContent = 'Alege cel puțin o aromă pentru limonada ta.';
    return;
  }

  if (hasAlcohol && !customAgeConfirm.checked) {
    customStatus.textContent = 'Confirmă că ai cel puțin 18 ani pentru a continua.';
    customAgeConfirm.focus();
    return;
  }

  const spirit = hasAlcohol ? customSpiritSelect.value : '';
  const details = `${flavors.join(', ')}${hasAlcohol ? ` · ${spirit} · 18+` : ' · fără alcool'}`;
  let cart;

  try {
    const savedCart = sessionStorage.getItem(cartStorageKey);
    cart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(cart)) {
      throw new TypeError('Datele salvate pentru coș nu sunt o listă.');
    }

    cart.push({
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: 'Limonadă personalizată',
      details,
      price,
      quantity: 1,
    });
    sessionStorage.setItem(cartStorageKey, JSON.stringify(cart));
  } catch (error) {
    console.error('Mixul personalizat nu a putut fi adăugat în coș.', error);
    customStatus.textContent = 'Nu am putut salva mixul în coș. Încearcă din nou.';
    return;
  }

  window.location.href = 'index.html?cart=open#produse';
}

customFlavorInputs.forEach((input) => {
  input.addEventListener('change', updateCustomDrinkPreview);
});

customAlcoholInputs.forEach((input) => {
  input.addEventListener('change', updateCustomDrinkPreview);
});

customSpiritSelect.addEventListener('change', updateCustomDrinkPreview);
customAgeConfirm.addEventListener('change', updateCustomDrinkPreview);
addCustomDrinkButton.addEventListener('click', addCustomDrinkToCart);

updateCustomDrinkPreview();
